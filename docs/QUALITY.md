# Software Quality — ISO 25010 Assessment

This document evaluates the project against the **ISO/IEC 25010:2023** product quality model and tracks the improvement roadmap.

## Quality Characteristics

### 1. Functional Suitability ✅ Good

| Sub-characteristic | Status | Evidence |
|---|---|---|
| Functional completeness | ✅ | All core flows: search, book, auth, admin, wishlist |
| Functional correctness | ✅ | Validation pipes on all API inputs |
| Functional appropriateness | ✅ | UI matches domain expectations (Airbnb-style) |

### 2. Performance Efficiency ⚠️ Partial

| Sub-characteristic | Status | Notes |
|---|---|---|
| Time behaviour | ⚠️ | No API caching (Redis defined in docker-compose but unused) |
| Resource utilisation | ⚠️ | Images use `loading="lazy"` but no CDN or size optimisation |
| Capacity | ⚠️ | No pagination beyond basic `limit/offset` |

**Roadmap**: Add Redis response caching for `/listings/search`; add proper frontend pagination.

### 3. Compatibility ⚠️ Partial

| Sub-characteristic | Status | Notes |
|---|---|---|
| Co-existence | ✅ | CORS properly configured |
| Interoperability | ⚠️ | No shared type contract (`packages/types`) between API and web |

**Roadmap**: Create a `packages/types` shared package with Zod schemas.

### 4. Usability ✅ Good

| Sub-characteristic | Status | Evidence |
|---|---|---|
| Appropriateness recognisability | ✅ | Airbnb-inspired familiar layout |
| Learnability | ✅ | Self-explanatory flows, toast confirmations |
| Operability | ✅ | Responsive design, keyboard-friendly forms |
| Accessibility (a11y) | ⚠️ | Some icon buttons missing `aria-label`; modals lack focus trap |
| User error protection | ✅ | Form validation with clear error messages |
| UI aesthetics | ✅ | Consistent design system, animations, dark gradients |

**Roadmap**: Add `aria-label` to all icon-only buttons; add `role="dialog"` + focus trap to modals.

### 5. Reliability ❌ Needs Work

| Sub-characteristic | Status | Notes |
|---|---|---|
| Maturity | ⚠️ | No unit tests for composables or services |
| Availability | ✅ | Health endpoints available |
| Fault tolerance | ❌ | `catch` blocks mostly `console.error` — no user-visible recovery |
| Recoverability | ⚠️ | No retry logic on failed network requests |

**Roadmap**: Consistent error handling (Step 4 below); unit tests (Step 1).

### 6. Security ✅ Good (with gaps)

| Sub-characteristic | Status | Evidence |
|---|---|---|
| Confidentiality | ✅ | httpOnly cookies, bcrypt, no secrets in code |
| Integrity | ✅ | ValidationPipe with whitelist enforced |
| Non-repudiation | ✅ | JWT audit trail |
| Authenticity | ✅ | JWT signed with secret |
| Accountability | ⚠️ | No structured logging / audit log |

See [SECURITY.md](./SECURITY.md) for full details.

### 7. Maintainability ✅ Good (actively improving)

| Sub-characteristic | Status | Evidence |
|---|---|---|
| Modularity | ✅ | NestJS modules; Vue composables |
| Reusability | ✅ | `useBooking`, `useWishlist`, `useListingSearch` composables |
| Analysability | ⚠️ | Many `any` types still present |
| Modifiability | ✅ | `@/` alias, CSS variables, design tokens |
| Testability | ⚠️ | Composables are testable but untested |

### 8. Portability ✅ Good

| Sub-characteristic | Status | Evidence |
|---|---|---|
| Adaptability | ✅ | `.env`-driven config, docker-compose |
| Installability | ✅ | Full Docker setup |
| Replaceability | ✅ | Prisma abstraction allows DB swap |

---

## Improvement Roadmap

Tracked step-by-step in order of impact on grade:

| Step | Area | Status |
|---|---|---|
| **Step 1** | Unit Tests (Vitest for composables) | 🔄 In Progress |
| **Step 2** | TypeScript interfaces (replace `any`) | 📋 Planned |
| **Step 3** | Consistent error handling | 📋 Planned |
| **Step 4** | Accessibility (aria, focus traps) | 📋 Planned |
| **Step 5** | Swagger decorator completeness | 📋 Planned |

See [TESTING.md](./TESTING.md) for the full testing strategy.
