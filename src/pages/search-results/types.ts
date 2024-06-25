export type BodyType = {
  checkInDate: string;
  checkOutDate: string;
  cityId?: number;
  hotelId?: number;
  filters: {
    numbersOfGuests?: number;
    hotelCategories?: number[];
    paymentRecipients?: string[];
    minDailyPrice?: number;
    maxDailyPrice?: number;
    breakfastIncluded?: boolean;
    guaranteeTypeCardIncluded?: boolean;
  };
};

export type DetailedPriceDTO = {
  price: number;
  vatAmount: number;
  currency: string;
};
export type CurrencyPriceDetailsDTO = {
  commission: DetailedPriceDTO;
  gross: DetailedPriceDTO;
  net: DetailedPriceDTO;
  extra: NamedDetailedPriceDto[] | null;
};

export type NamedDetailedPriceDto = {
  name: string;
  price: number;
  vatAmount: number;
  currency: string;
};
export type TaxDTO = {
  type: string;
  amount: number;
  currency: string;
  included: boolean;
  comment: string;
};

export type AvailableAmenityDTO = {
  id: number;
  name: string;
  groupName: string;
  price: number;
  currency: string;
  included: boolean;
};

export type HotelInfoDTO = {
  id: number;
  minimalPriceDetails: {
    vatApplicable: boolean;
    hotel: {
      vatIncluded: boolean;
    };
    client: {
      vatIncluded: boolean;
      clientCurrency: CurrencyPriceDetailsDTO;
      hotelCurrency: CurrencyPriceDetailsDTO;
    };
  };
  geo: {
    cityId: number;
    cityName: string;
    address: string;
    distanceToCenter: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  info: {
    paymentTerms: string;
    description: string;
    name: string;
    category: number;
    type: string;
    photo: {
      guid: string;
      url: string;
    };
    deepLink: string;
    taxes: {
      taxes: TaxDTO[];
    };
  };
  vat: {
    applicable: boolean;
    included: boolean;
    percent: number;
  };
  amenities: {
    availableAmenities: AvailableAmenityDTO[];
  };
};

// offer: {
//   name: "Номер делюкс (с завтраком)";
//   roomId: 501;
//   cancellationPolicies: [
//     {
//       penaltyDateTime: "2024-06-25T21:23:03+03:00";
//       penaltyPriceDetails: {
//         vatIncluded: false;
//         clientCurrency: {
//           commission: {
//             price: 305;
//             vatAmount: 0;
//             currency: "RUB";
//           };
//           gross: {
//             price: 6100;
//             vatAmount: 0;
//             currency: "RUB";
//           };
//           net: {
//             price: 5795;
//             vatAmount: 0;
//             currency: "RUB";
//           };
//           extra: null;
//         };
//         hotelCurrency: {
//           commission: {
//             price: 305;
//             vatAmount: 0;
//             currency: "RUB";
//           };
//           gross: {
//             price: 6100;
//             vatAmount: 0;
//             currency: "RUB";
//           };
//           net: {
//             price: 5795;
//             vatAmount: 0;
//             currency: "RUB";
//           };
//           extra: null;
//         };
//       };
//     },
//   ];
//   meals: {
//     meals: [
//       {
//         id: 34;
//         name: "Завтрак шведский стол";
//         included: true;
//         priceDetails: {
//           vatIncluded: true;
//           clientCurrency: {
//             commission: {
//               price: 0;
//               vatAmount: 0;
//               currency: "RUB";
//             };
//             gross: {
//               price: 0;
//               vatAmount: 0;
//               currency: "RUB";
//             };
//             net: {
//               price: 0;
//               vatAmount: 0;
//               currency: "RUB";
//             };
//             extra: null;
//           };
//           hotelCurrency: {
//             commission: {
//               price: 0;
//               vatAmount: 0;
//               currency: "RUB";
//             };
//             gross: {
//               price: 0;
//               vatAmount: 0;
//               currency: "RUB";
//             };
//             net: {
//               price: 0;
//               vatAmount: 0;
//               currency: "RUB";
//             };
//             extra: null;
//           };
//         };
//         vatPercent: 20;
//       },
//     ];
//   };
//   freeRooms: 0;
//   photo: {
//     guid: "924dc5279ffe0cfe47c2bafabf017e11";
//     url: "https://dev.bronevik.tech/static/photo/g/250x250a/924dc5279ffe0cfe47c2bafabf017e11";
//   };
//   amenities: null;
//   paymentRecipient: "HOTEL";
//   guaranteeType: "contract";
//   roomType: "single";
//   isSharedRoom: false;
//   isBlockRoom: false;
//   nonRefundable: true;
//   rateType: {
//     rateName: "NonrefundableRate";
//     rateDescription: "Невозвратный тариф";
//   };
//   availableBedSets: null;
//   childrenAccommodation: null;
// };
