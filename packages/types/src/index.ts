export type Role = 'USER' | 'ADMIN';
export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type PropertyType =
  | 'APARTMENT'
  | 'HOUSE'
  | 'VILLA'
  | 'CABIN'
  | 'UNIQUE_SPACE'
  | 'TROPICAL'
  | 'DESERT'
  | 'ARCTIC'
  | 'CAVE'
  | 'CASTLE'
  | 'ISLAND'
  | 'BEACH'
  | 'WINDMILL'
  | 'HOUSEBOAT'
  | 'COUNTRYSIDE'
  | 'LUXE';

export const PropertyType = {
  APARTMENT: 'APARTMENT',
  HOUSE: 'HOUSE',
  VILLA: 'VILLA',
  CABIN: 'CABIN',
  UNIQUE_SPACE: 'UNIQUE_SPACE',
  TROPICAL: 'TROPICAL',
  DESERT: 'DESERT',
  ARCTIC: 'ARCTIC',
  CAVE: 'CAVE',
  CASTLE: 'CASTLE',
  ISLAND: 'ISLAND',
  BEACH: 'BEACH',
  WINDMILL: 'WINDMILL',
  HOUSEBOAT: 'HOUSEBOAT',
  COUNTRYSIDE: 'COUNTRYSIDE',
  LUXE: 'LUXE',
} as const;

export type ListingStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export const ListingStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
export const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
}

export interface ListingAmenity {
  amenityId: string;
  listingId: string;
  amenity: Amenity;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  pricePerNight: number;
  address: string;
  city: string;
  country: string;
  zipCode?: string;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  cleaningFee?: number;
  serviceFee?: number;
  images: string[];
  coverImage?: string;
  status: ListingStatus;
  publishedAt?: string;
  instantBook: boolean;
  minNights: number;
  maxNights?: number;
  hostId: string;
  host: Partial<User>;
  amenities: ListingAmenity[];
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  listingId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  totalPrice: number;
  status: BookingStatus;
  specialRequests?: string;
  listing?: Partial<Listing>;
  guest?: Partial<User>;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  listingId: string;
  authorId: string;
  rating: number;
  content: string;
  author: Partial<User>;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  listings: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface CreateListingPayload {
  title: string;
  description: string;
  propertyType: PropertyType;
  country: string;
  city: string;
  state?: string;
  address: string;
  zipCode?: string;
  latitude: number;
  longitude: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  pricePerNight: number;
  cleaningFee?: number;
  serviceFee?: number;
  instantBook?: boolean;
  minNights?: number;
  maxNights?: number;
  images: string[];
  coverImage?: string;
  amenityIds?: string[];
}

export interface UpdateListingPayload extends Partial<CreateListingPayload> {
  status?: ListingStatus;
}

export interface CreateBookingPayload {
  listingId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  infants?: number;
  specialRequests?: string;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  bio?: string;
  dateOfBirth?: string;
  language?: string;
  currency?: string;
  timezone?: string;
}

export interface UpdateAvatarPayload {
  avatar: string;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}
