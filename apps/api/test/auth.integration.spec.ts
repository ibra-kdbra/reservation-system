import { IntegrationTestFactory } from './integration-test-factory';
import request from 'supertest';

describe('Authentication (Integration)', () => {
  const factory = new IntegrationTestFactory();

  beforeAll(async () => {
    await factory.init();
  }, 60000); // Higher timeout for container start

  afterAll(async () => {
    await factory.cleanup();
  });

  beforeEach(async () => {
    await factory.clearDatabase();
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const payload = {
        email: 'test@example.com',
        password: 'StrongPassword123!',
        firstName: 'Test',
        lastName: 'User',
      };

      const response = await request(factory.getApp().getHttpServer())
        .post('/api/v1/auth/register')
        .send(payload)
        .expect(201);

      expect(response.body.data.user.email).toBe(payload.email);
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();

      // Verify user in DB
      const user = await factory.getPrisma().user.findUnique({
        where: { email: payload.email },
      });
      expect(user).toBeDefined();
      expect(user?.firstName).toBe(payload.firstName);
    });

    it('should fail registration with invalid email', async () => {
      const payload = {
        email: 'invalid-email',
        password: 'StrongPassword123!',
      };

      await request(factory.getApp().getHttpServer())
        .post('/api/v1/auth/register')
        .send(payload)
        .expect(400);
    });

    it('should fail registration with weak password', async () => {
      const payload = {
        email: 'test@example.com',
        password: 'weak',
      };

      await request(factory.getApp().getHttpServer())
        .post('/api/v1/auth/register')
        .send(payload)
        .expect(400);
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Seed a user
      await request(factory.getApp().getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'StrongPassword123!',
          firstName: 'Test',
        });
    });

    it('should login successfully', async () => {
      const response = await request(factory.getApp().getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'StrongPassword123!',
        })
        .expect(200);

      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.user.email).toBe('test@example.com');
    });

    it('should fail login with wrong password', async () => {
      await request(factory.getApp().getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword123!',
        })
        .expect(401);
    });
  });
});
