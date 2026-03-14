# API Reference

> **Live interactive docs**: `http://localhost:3000/api/docs` (Swagger UI)
>
> All endpoints are prefixed with `/api/v1`. Authentication uses **httpOnly cookies** — the browser sends the `access_token` cookie automatically.

---

## Authentication

### POST `/auth/register`

Register a new user.

**Body**

```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "Ada",
  "lastName": "Lovelace"
}
```

### POST `/auth/login`

Log in and receive an `access_token` httpOnly cookie.

**Body**

```json
{ "email": "user@example.com", "password": "..." }
```

### POST `/auth/logout`

Clear the session cookie.

### GET `/auth/me`

Get the currently authenticated user (requires cookie).

---

## Users

| Method | Path | Description |
|---|---|---|
| GET | `/users/me` | Get own profile |
| PUT | `/users/me` | Update own profile |
| GET | `/users/me/stats` | Get own stats (bookings, listings) |

---

## Listings

| Method | Path | Description |
|---|---|---|
| GET | `/listings/search` | Search & filter listings |
| GET | `/listings/:id` | Get listing by ID |
| POST | `/listings` | Create a listing (auth required) |
| PUT | `/listings/:id` | Update listing (owner only) |
| DELETE | `/listings/:id` | Delete listing (owner only) |
| GET | `/listings/my-listings` | Current user's listings |
| POST | `/listings/:id/publish` | Publish a draft listing |

### Search Query Parameters

| Param | Type | Description |
|---|---|---|
| `city` | string | Filter by city |
| `checkIn` | ISO date | Availability start |
| `checkOut` | ISO date | Availability end |
| `guests` | number | Minimum capacity |
| `propertyType` | string | `apartment`, `villa`, etc. |
| `minPrice` | number | Min price per night (USD) |
| `maxPrice` | number | Max price per night (USD) |
| `amenities` | string[] | Required amenities |
| `limit` | number | Page size (default 20) |
| `offset` | number | Page offset (default 0) |

---

## Bookings

| Method | Path | Description |
|---|---|---|
| POST | `/bookings` | Create a booking |
| GET | `/bookings/my-bookings` | Guest: my bookings |
| GET | `/bookings/host-bookings` | Host: bookings for my listings |
| GET | `/bookings/:id` | Get booking by ID |
| PUT | `/bookings/:id/cancel` | Cancel a booking |
| PUT | `/bookings/:id/confirm` | Confirm a booking (host) |

### Create Booking Body

```json
{
  "listingId": "uuid",
  "checkIn": "2026-04-01",
  "checkOut": "2026-04-07",
  "adults": 2,
  "children": 0,
  "specialRequests": "Ground floor preferred"
}
```

---

## Favorites / Wishlist

| Method | Path | Description |
|---|---|---|
| GET | `/favorites` | Get all favorites |
| POST | `/favorites` | Add to favorites (`{ listingId }`) |
| DELETE | `/favorites/:id` | Remove from favorites |
| GET | `/favorites/check/:listingId` | Check if listing is favorited |

---

## Admin (Admin role only)

| Method | Path | Description |
|---|---|---|
| GET | `/admin/stats` | Platform stats |
| GET | `/admin/users` | All users |
| GET | `/admin/listings` | All listings |
| PATCH | `/admin/users/:id/ban` | Ban a user |
| PATCH | `/admin/users/:id/activate` | Reactivate a user |
| PATCH | `/admin/listings/:id/approve` | Approve a listing |
| PATCH | `/admin/listings/:id/reject` | Reject a listing |

---

## Error Format

All errors follow this shape:

```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```
