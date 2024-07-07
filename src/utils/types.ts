export type AccommodationDto = {
  offerCode: string;
  guests: GuestDto[];
};

export type CardDetailsDto = {
  number: number;
  cardHolder: string;
  expirationMonth: number;
  expirationYear: number;
  cvv: number;
  cardHolderEmail: string;
  cardHolderPhoto: string;
};

export type CreateOrderRequest = {
  accommodations: AccommodationDto[];
  currency: string;
  language: string;
  cardDetails: CardDetailsDto;
};

export type GuestDto = {
  firstName: string;
  lastName: string;
};

export type CreateOrderResponse = {
  orderId: number;
};

export type FiltersDto = {
  numberOfGuests?: number;
  hotelCategories?: number[];
  paymentRecipients?: string[];
  minDailyPrice?: number;
  maxDailyPrice?: number;
  breakfastIncluded?: boolean;
  guaranteeTypeCardIncluded?: boolean;
};

export type SearchHotelByHotelRequest = {
  checkInDate: string;
  checkOutDate: string;
  hotelId?: number;
  currency?: string;
  language?: string;
  filters: FiltersDto;
};

export type AvailableAmenitiesDto = {
  availableAmenities: AvailableAmenityDto[];
};

export type AvailableAmenityDto = {
  id: number;
  name: string;
  groupName: string;
  price: number;
  currency: string;
  included: boolean;
};

export type AvailableMealDto = {
  id: number;
  name: string;
  included: boolean;
  priceDetails: ClientPriceDetailsDto;
  vatPercent: number;
};

export type AvailableMealsDto = {
  meals: AvailableMealDto[];
};
export type BedDto = {
  type: string;
  amount: number;
};

export type BedSetDto = {
  beds: BedDto[];
};
export type BedSetsDto = {
  bedSets: BedSetDto[];
};

export type ChildAccommodationDto = {
  age: number;
  count: number;
  included: boolean;
  accommodation: string;
};

export type ChildrenAccommodationDto = {
  child: ChildAccommodationDto[];
};

export type ClientPriceDetailsDto = {
  vatIncluded: boolean;
  clientCurrency: CurrencyPriceDetailsDto;
  hotelCurrency: CurrencyPriceDetailsDto;
};

export type CoordinatesDto = {
  latitude: number;
  longitude: number;
};

export type CurrencyPriceDetailsDto = {
  commission: DetailedPriceDto;
  gross: DetailedPriceDto;
  net: DetailedPriceDto;
  extra: NamedDetailedPriceDto[];
};

export type DetailedPriceDto = {
  price: number;
  vatAmount: number;
  currency: string;
};

export type HotelGeoDto = {
  cityId: number;
  cityName: string;
  address: string;
  distanceToCenter: number;
  coordinates: CoordinatesDto;
};

export type HotelInfoDto = {
  paymentTerms: string;
  description: string;
  name: string;
  category: number;
  type: string;
  photo: ImageDto;
  deepLink: string;
  taxes: TaxesDto;
};
export type HotelOfferCancellationPolicyDto = {
  penaltyDateTime: string;
  penaltyPriceDetails: ClientPriceDetailsDto;
};

export type HotelPriceDetailsDto = {
  vatIncluded: boolean;
};
export type HotelVatInfoDto = {
  applicable: boolean;
  included: boolean;
  percent: number;
};

export type HotelWithCheapestOfferDto = {
  id: number;
  minimalPriceDetails: PriceDetailsDto;
  geo: HotelGeoDto;
  info: HotelInfoDto;
  vat: HotelVatInfoDto;
  amenities: AvailableAmenitiesDto;
  offer: SearchAvailabilityHotelOfferDto;
};

export type ImageDto = {
  guid: string;
  url: string;
};

export type NamedDetailedPriceDto = {
  name: string;
  price: number;
  vatAmount: number;
  currency: string;
};

export type PriceDetailsDto = {
  vatApplicable: boolean;
  hotel: HotelPriceDetailsDto;
  client: ClientPriceDetailsDto;
};

export type RateTypeDto = {
  rateName: string;
  rateDescription: string;
};

export type SearchAvailabilityHotelOfferDto = {
  name: string;
  roomId: number;
  cancellationPolicies: HotelOfferCancellationPolicyDto[];
  meals: AvailableMealsDto;
  freeRooms: number;
  photo: ImageDto;
  amenities: AvailableAmenitiesDto;
  paymentRecipient: "AGENCY" | "HOTEL";
  guaranteeType: string;
  roomType: string;
  isSharedRoom: boolean;
  isBlockRoom: boolean;
  nonRefundable: boolean;
  rateType: RateTypeDto;
  availableBedSets: BedSetsDto;
  childrenAccommodation: ChildrenAccommodationDto;
};

export type SearchHotelResponse = {
  hotels: HotelWithCheapestOfferDto[];
};

export type TaxDto = {
  type: string;
  amount: number;
  currency: string;
  included: boolean;
  comment: string;
};

export type TaxesDto = {
  taxes: TaxDto[];
};

export type GeolocationDto = {
  latitude: number;
  longitude: number;
  radius: number;
};

export type SearchHotelByGeolocationRequest = {
  checkInDate: string;
  checkOutDate: string;
  geolocation: GeolocationDto;
  currency?: string;
  language?: string;
  filters: FiltersDto;
};

export type SearchHotelByCityRequest = {
  checkInDate: string;
  checkOutDate: string;
  cityId?: number;
  currency?: string;
  language?: string;
  filters: FiltersDto;
};

export type CityDto = {
  name: string;
  latitude: number;
  longitude: number;
  regionId: number;
  regionName: string;
  countryId: number;
  countryName: string;
};

export type GetOrderDto = {
  hotel: HotelDto;
  checkInDate: string;
  checkOutDate: string;
  status: string;
};

export type GetOrdersResponse = {
  pagesTotal: number;
  itemsTotal: number;
  currentPage: number;
  orders: GetOrderDto[];
};

export type HotelDto = {
  name: string;
  address: string;
  city: CityDto;
};

export type GetOrderResponse = {
  order: GetOrderDto;
};

export type LiveSearchResponse = {
  liveSearchResults: LiveSearchResultDto[];
};

export type LiveSearchResultDto = {
  type: "CITY" | "HOTEL";
  name: string;
  id: number;
  country: string;
};

export type HotelReviewDto = {
  bronevikHotelId: number;
  rating: number;
  ratingImageUrl: string;
  publishedDate: string;
  text: string;
  title: string;
  user: {
    username: string;
    avatar: {
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      original: string;
    };
  };
};

export type HotelReviewsResponse = {
  reviews: HotelReviewDto[];
};

export type AdditionalInfoDto = {
  infos: InfoDto[];
};
export type DailyPriceDto = {
  date: string;
  rate: ClientPriceDetailsDto;
  bookingFee: ClientPriceDetailsDto;
  earlyArrival: ClientPriceDetailsDto;
  lateDeparture: ClientPriceDetailsDto;
  meals: DailyPriceMealsDto;
};

export type DailyPriceMealsDto = {
  meals: MealPriceDetailsDto[];
};

export type DailyPricesDto = {
  dailyPrices: DailyPriceDto[];
};

export type DescriptionDetailsDto = {
  countryId: number;
  countryName: string;
  distanceToCenter: number;
  latitude: number;
  longitude: number;
  zipCode: string;
  description: string;
  photos: PhotosDto;
  availableAmenities: AvailableAmenitiesDto;
};

export type GuestNotificationDto = {
  type: string;
  value: string;
};

export type HotelOfferDto = {
  name: string;
  roomId: number;
  cancellationPolicies: HotelOfferCancellationPolicyDto[];
  meals: AvailableMealsDto;
  freeRooms: number;
  paymentRecipient: "AGENCY" | "HOTEL";
  roomType: string;
  isSharedRoom: boolean;
  isBlockRoom: boolean;
  nonRefundable: boolean;
  rateType: RateTypeDto;
  guaranteeType: string;
  availableBedSets: BedSetDto;
  childrenAccommodation: ChildrenAccommodationDto;
  code: string;
  priceDetails: PriceDetailsDto;
  taxes: TaxesDto;
  immediateConfirmation: boolean;
  dailyPrices: DailyPricesDto;
  offerPolicies: OfferPoliciesDto;
  deepLink: string;
  roomWithWindow: boolean;
};

export type HotelOffersDto = {
  offers: HotelOfferDto[];
};

export type HotelWithOffersDto = {
  id: number;
  cityId: number;
  cityName: string;
  name: string;
  address: string;
  checkInTime: string; // LocalTime
  checkOutTime: string; // LocalTime
  descriptionDetails: DescriptionDetailsDto;
  vatApplicable: boolean;
  hasTaxes: boolean;
  category: number;
  type: string;
  informationForGuest: InformationForGuestDto;
  additionalInfo: AdditionalInfoDto;
  paymentTerms: string;
  allowableCheckInTime: TimeRangeDto;
  allowableCheckOutTime: TimeRangeDto;
  taxes: TaxesDto;
  isHotelOnline: boolean;
  vatIncluded: boolean;
  vatPercent: number;
  offers: HotelOffersDto;
};

export type InfoDto = {
  name: string;
  value: string;
};

export type InformationForGuestDto = {
  notifications: GuestNotificationDto[];
};

export type LocalTime = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
};

export type MealPriceDetailsDto = {
  id: number;
  name: string;
  included: boolean;
  vatIncluded: boolean;
  clientCurrency: CurrencyPriceDetailsDto;
  hotelCurrency: CurrencyPriceDetailsDto;
};

export type OfferPoliciesDto = {
  policies: OfferPolicyDto[];
};
export type OfferPolicyDto = {
  type: string;
  value: string;
};
export type PhotosDto = {
  photos: ImageDto[];
};

export type SearchHotelAccommodationsResponse = {
  offers: HotelWithOffersDto[];
};
export type TimeRangeDto = {
  timeFrom: string;
  timeTo: string;
};

export type ChildDto = {
  age: number;
  count: number;
};

export type ContractDto = {
  id: number;
  number: string;
  beginsAt: string;
  legalEntity: string;
};

export type GuestsDto = {
  guests: GuestDto[];
  childrens: ChildDto[];
};

export type OrderServiceAccommodationDto = {
  id: number;
  date: string;
  referenceId: string;
  cityId: number;
  cityName: string;
  countryId: number;
  countryName: string;
  priceDetails: PriceDetailsDto;
  cancellationPolicies: HotelOfferCancellationPolicyDto[];
  statusId: number;
  statusName: string;
  contract: ContractDto;
  offerCode: string;
  offerName: string;
  hotelId: number;
  hotelName: string;
  roomId: number;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: GuestsDto;
  children: ChildrenAccommodationDto;
  comment: string;
  nonRefundable: boolean;
  meals: AvailableMealsDto;
  isBlockRoom: boolean;
  isSharedRoom: boolean;
  paymentRecipient: "AGENCY" | "HOTEL";
  extraFields: ServiceExtraFieldDto[];
  offerPolicies: OfferPoliciesDto;
  dailyPrices: DailyPricesDto;
  vatPercent: number;
  rateType: RateTypeDto;
  guaranteeType: string;
  paymentTerms: string;
  preferredBedSet: BedSetDto;
};

export type SearchHotelAccommodationResponse = {
  services: OrderServiceAccommodationDto[];
};

export type ServiceExtraFieldDto = {
  name: string;
  value: string;
};

export type HotelRatingsResponse = {
  ratings: HotelRatingsDto;
};

export type HotelRatingsDto = {
  ranking: RankingDto;
  rating: number;
  ratingImageUrl: string;
  reviewsTotal: number;
  reviewsByRating: ReviewCountDto[];
  subratings: SubratingDto[];
  priceLevel: string;
  tripadvisorUrl: string;
  amenities: string[];
  styles: string[];
  tripTypes: TripTypeDto[];
};

export type RankingDto = {
  description: string;
  location: string;
  total: number;
  rank: number;
};

export type ReviewCountDto = {
  rating: number;
  count: number;
};

export type SubratingDto = {
  type: string;
  name: string;
  ratingImageUrl: string;
  rating: number;
};

export type TripTypeDto = {
  type: string;
  name: string;
  count: number;
};

export type RoomDto = {
  id: number;
  name: string;
  availableAmenities: {
    availableAmenities: {
      id: number;
      name: string;
      groupName: string;
      price: number;
      currency: string;
      included: boolean;
    }[];
  };
  description: string;
  photos: {
    photos: {
      guid: string;
      url: string;
    }[];
  };
  roomCapacity: number;
  size: number;
  availableBedSets: {
    bedSets: {
      beds: {
        type: string;
        amount: number;
      }[];
    }[];
  };
  buildingPart: string;
  bedroomAmount: number;
  withWindow: boolean;
  windowViews: {
    names: string[];
  };
};
