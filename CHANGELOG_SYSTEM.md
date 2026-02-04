# CHANGELOG System Documentation

## Overview

This project uses a comprehensive CHANGELOG system to track every file modification like a diary. Each file has an associated CHANGELOG entry that records all changes chronologically.

## Structure

### Global Changelog

- **Location**: `/CHANGELOG.md`
- **Purpose**: High-level project changes, releases, major milestones
- **Format**: Keep-a-Changelog format with semantic versioning

### File-Specific Changelogs

- **Location**: `/changelogs/<path-to-file>.md`
- **Purpose**: Detailed change history for individual files
- **Format**: Chronological diary-style entries

## File Changelog Format

Each file changelog follows this structure:

```markdown
# Changelog: <file-path>

## [Date] - [Time] - [Author]
**Action**: [Created|Modified|Deleted|Renamed]
**Commit**: <commit-hash-if-applicable>
**Description**: Brief description of the change

### Changes:
- Detailed change 1
- Detailed change 2
- ...

### Reason:
Why this change was made

### Impact:
What this affects

---
```

## Example

```markdown
# Changelog: apps/api/src/main.ts

## 2026-02-04 - 14:00 - Antigravity
**Action**: Created
**Commit**: N/A (initial creation)
**Description**: Created NestJS application entry point

### Changes:
- Added main.ts with bootstrap function
- Configured global validation pipes
- Set up CORS with whitelist
- Added Helmet for security headers
- Configured Swagger documentation
- Added compression middleware

### Reason:
Initial setup of NestJS backend application

### Impact:
Establishes the foundation for the entire backend API

---

## 2026-02-04 - 15:30 - Antigravity
**Action**: Modified
**Commit**: abc123
**Description**: Added rate limiting middleware

### Changes:
- Imported @nestjs/throttler
- Configured ThrottlerModule with 100 req/min limit
- Added ThrottlerGuard globally

### Reason:
Protect API from abuse and DDoS attacks

### Impact:
All endpoints now have rate limiting (except those with @SkipThrottle)

---
```

## Automation

### Auto-generation Script

A script will be provided to automatically generate changelog entries when files are modified:

```bash
npm run changelog:add <file-path> "<description>"
```

### Git Hooks

Pre-commit hooks can prompt for changelog entries when files are modified.

## Best Practices

1. **Always update changelogs** when modifying files
2. **Be descriptive** - explain what AND why
3. **Include impact** - what does this affect?
4. **Chronological order** - newest entries at the top
5. **Link to commits** - reference git commits when applicable
6. **Cross-reference** - mention related file changes

## Directory Structure

```
reservation-system-v2/
├── CHANGELOG.md                          # Global changelog
├── changelogs/                           # File-specific changelogs
│   ├── apps/
│   │   ├── api/
│   │   │   ├── src/
│   │   │   │   ├── main.ts.md
│   │   │   │   ├── app.module.ts.md
│   │   │   │   └── ...
│   │   └── web/
│   │       └── src/
│   │           ├── main.ts.md
│   │           └── ...
│   ├── packages/
│   └── infrastructure/
└── scripts/
    └── changelog-generator.js            # Automation script
```

## Integration with Development Workflow

1. **Before coding**: Check existing changelog to understand file history
2. **During coding**: Keep notes of changes
3. **After coding**: Update changelog before committing
4. **Code review**: Reviewers check changelog accuracy
5. **CI/CD**: Automated checks ensure changelogs are updated

## Tools

### Changelog Generator Script

```bash
# Add new changelog entry
npm run changelog:add apps/api/src/main.ts "Added rate limiting"

# View changelog for a file
npm run changelog:view apps/api/src/main.ts

# Generate summary of recent changes
npm run changelog:summary --since="2026-02-01"
```

This system ensures complete traceability and makes it easy to understand the evolution of every file in the project.
