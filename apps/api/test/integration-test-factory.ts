import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import cookieParser from 'cookie-parser';

export class IntegrationTestFactory {
  private pgContainer: StartedPostgreSqlContainer;
  private app: INestApplication;
  private module: TestingModule;

  async init() {
    // 1. Start Containers (Only PostgreSQL needed for core logic now)
    this.pgContainer = await new PostgreSqlContainer('postgres:16-alpine')
      .withDatabase('test_db')
      .withUsername('test_user')
      .withPassword('test_pass')
      .start();

    // 2. Set Env Vars for the app
    process.env.DATABASE_URL = this.pgContainer.getConnectionUri();
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';

    // 3. Create Nest Application
    // We override the cache store to a dummy object to avoid flaky Redis connection issues in tests
    this.module = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(CACHE_MANAGER)
    .useValue({
      get: () => null,
      set: () => null,
      del: () => null,
      reset: () => null,
    })
    .compile();

    this.app = this.module.createNestApplication();
    
    // Match main.ts configuration
    this.app.use(cookieParser());
    this.app.setGlobalPrefix('api/v1');
    this.app.useGlobalPipes(new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }));
    this.app.useGlobalInterceptors(new TransformInterceptor());
    
    await this.app.init();
    
    // 4. Run migrations to initialize schema in transient DB
    try {
      const path = require('path');
      const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
      console.log(`🚀 Initializing database schema with DATABASE_URL: ${process.env.DATABASE_URL} and schema: ${schemaPath}`);
      const { execSync } = require('child_process');
      const output = execSync(`npx prisma db push --accept-data-loss --schema ${schemaPath} --url "${process.env.DATABASE_URL}"`, {
        env: { ...process.env },
        encoding: 'utf-8',
      });
      console.log('✅ Database schema initialized successfully:', output);
    } catch (error: any) {
      console.error('❌ Failed to initialize database schema:');
      console.error('STDOUT:', error.stdout);
      console.error('STDERR:', error.stderr);
      throw error;
    }
  }

  getApp() {
    return this.app;
  }

  getPrisma() {
    return this.app.get(PrismaService);
  }

  async cleanup() {
    const prisma = this.getPrisma();
    if (prisma) {
      await prisma.$disconnect();
    }
    if (this.app) {
      await this.app.close();
    }
    if (this.pgContainer) {
      await this.pgContainer.stop();
    }
  }

  async clearDatabase() {
    const prisma = this.getPrisma();
    await prisma.cleanDatabase();
  }
}
