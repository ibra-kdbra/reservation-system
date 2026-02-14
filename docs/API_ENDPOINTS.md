# Phase 2 Backend - API Endpoints Reference

## Base URL

`http://localhost:3000/api/v1`

## Authentication Endpoints

### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "user": { ... },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

### Get Current User

```http
GET /auth/me
Authorization: Bearer <accessToken>
```

### Change Password

```http
POST /auth/change-password
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

### Logout

```http
POST /auth/logout
Authorization: Bearer <accessToken>
```

## User Endpoints

### Get Current User Profile

```http
GET /users/me
Authorization: Bearer <accessToken>
```

### Get User Statistics

```http
GET /users/me/stats
Authorization: Bearer <accessToken>
```

### Get User by ID

```http
GET /users/:id
Authorization: Bearer <accessToken>
```

### Update Profile

```http
PUT /users/me
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "bio": "Travel enthusiast",
  "language": "en",
  "currency": "USD"
}
```

### Delete Account

```http
DELETE /users/me
Authorization: Bearer <accessToken>
```

## Listing Endpoints

### Create Listing

```http
POST /listings
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Beautiful Apartment in Paris",
  "description": "Spacious 2-bedroom apartment...",
  "propertyType": "APARTMENT",
  "country": "France",
  "city": "Paris",
  "address": "123 Rue de Rivoli",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "maxGuests": 4,
  "bedrooms": 2,
  "beds": 2,
  "bathrooms": 1,
  "pricePerNight": 120,
  "cleaningFee": 30,
  "images": ["url1", "url2"],
  "coverImage": "url1"
}
```

### Search Listings

```http
GET /listings/search?city=Paris&guests=2&minPrice=50&maxPrice=200&propertyType=APARTMENT&checkIn=2026-03-01&checkOut=2026-03-05&limit=20&offset=0
```

### Get My Listings

```http
GET /listings/my-listings
Authorization: Bearer <accessToken>
```

### Get Listing by ID

```http
GET /listings/:id
```

### Update Listing

```http
PUT /listings/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Updated Title",
  "pricePerNight": 150
}
```

### Publish Listing

```http
POST /listings/:id/publish
Authorization: Bearer <accessToken>
```

### Delete Listing

```http
DELETE /listings/:id
Authorization: Bearer <accessToken>
```

## Booking Endpoints

### Create Booking

```http
POST /bookings
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "listingId": "listing-uuid",
  "checkIn": "2026-03-01",
  "checkOut": "2026-03-05",
  "adults": 2,
  "children": 1,
  "specialRequests": "Late check-in please"
}
```

### Get My Bookings (as Guest)

```http
GET /bookings/my-bookings
Authorization: Bearer <accessToken>
```

### Get Host Bookings

```http
GET /bookings/host-bookings
Authorization: Bearer <accessToken>
```

### Get Booking by ID

```http
GET /bookings/:id
Authorization: Bearer <accessToken>
```

### Cancel Booking

```http
PUT /bookings/:id/cancel
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "cancellationReason": "Change of plans"
}
```

### Confirm Booking (Host Only)

```http
PUT /bookings/:id/confirm
Authorization: Bearer <accessToken>
```

## Favorites Endpoints

### Get My Favorites

```http
GET /favorites
Authorization: Bearer <accessToken>
```

### Add Favorite

```http
POST /favorites
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "listingId": "listing-uuid"
}
```

### Remove Favorite

```http
DELETE /favorites/:id
Authorization: Bearer <accessToken>
```

### Check if Listing is Favorited

```http
GET /favorites/check/:listingId
Authorization: Bearer <accessToken>
```

## Review Endpoints

### Get Listing Reviews

```http
GET /listings/:id/reviews
```

### Create Review

```http
POST /reviews
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "bookingId": "booking-uuid",
  "rating": 5,
  "comment": "Amazing stay, highly recommend!"
}
```

## Response Formats

### Success Response

```json
{
  "id": "uuid",
  "...": "data"
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error
