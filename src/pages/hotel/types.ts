export type TaxDto = {
  type: string;
  amount: number;
  currency: string;
  included: boolean;
  comment: string;
};
export type HotelInfo = {
  id: number;
  cityId: number;
  cityName: string;
  name: string;
  address: string;
  checkInTime: string;
  checkOutTime: string;
  descriptionDetails: {
    countryId: number;
    countryName: string;
    distanceToCenter: number;
    latitude: number;
    longitude: number;
    zipCode: string;
    description: string;
    photos: {
      photos: {
        guid: string;
        url: string;
      }[];
    };
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
  };
  vatApplicable: boolean;
  hasTaxes: boolean;
  category: number;
  type: string;
  informationForGuest: {
    notifications: {
      type: string;
      value: string;
    }[];
  };
  additionalInfo: {
    infos: {
      name: string;
      value: string;
    }[];
  };
  paymentTerms: string;
  allowableCheckInTime: {
    timeFrom: string;
    timeTo: string;
  };
  allowableCheckOutTime: {
    timeFrom: string;
    timeTo: string;
  };
  taxes: {
    taxes: TaxDto[];
  };
  isHotelOnline: boolean;
  vatIncluded: boolean;
  vatPercent: number;
  offers: {
    offers: {
      name: string;
      roomId: number;
      cancellationPolicies: [
        {
          penaltyDateTime: "2024-06-25T13:30:00+03:00";
          penaltyPriceDetails: {
            vatIncluded: false;
            clientCurrency: {
              commission: {
                price: 454;
                vatAmount: 0;
                currency: "RUB";
              };
              gross: {
                price: 5340;
                vatAmount: 0;
                currency: "RUB";
              };
              net: {
                price: 4886;
                vatAmount: 0;
                currency: "RUB";
              };
              extra: null;
            };
            hotelCurrency: null;
          };
        },
      ];
      meals: {
        meals: {
          id: number;
          name: string;
          included: boolean;
          priceDetails: {
            vatIncluded: true;
            clientCurrency: {
              commission: {
                price: 0;
                vatAmount: 0;
                currency: "RUB";
              };
              gross: {
                price: 780;
                vatAmount: 130;
                currency: "RUB";
              };
              net: {
                price: 780;
                vatAmount: 130;
                currency: "RUB";
              };
              extra: null;
            };
            hotelCurrency: null;
          };
          vatPercent: number;
        }[];
      };
      freeRooms: number;
      paymentRecipient: string;
      roomType: string;
      isSharedRoom: boolean;
      isBlockRoom: boolean;
      nonRefundable: boolean;
      rateType: {
        rateName: string;
        rateDescription: string;
      };
      guaranteeType: string;
      availableBedSets: {
        bedSets: {
          beds: {
            type: string;
            amount: number;
          }[];
        };
      };
      childrenAccommodation: {
        child: {
          age: number;
          count: number;
          included: boolean;
          accommodation: string;
        }[];
      };
      code: string;
      priceDetails: {
        vatApplicable: true;
        hotel: {
          vatIncluded: true;
        };
        client: {
          vatIncluded: true;
          clientCurrency: {
            commission: {
              price: 454;
              vatAmount: 75.66999816894531;
              currency: "RUB";
            };
            gross: {
              price: 5340;
              vatAmount: 890;
              currency: "RUB";
            };
            net: {
              price: 4886;
              vatAmount: 814.3300170898438;
              currency: "RUB";
            };
            extra: null;
          };
          hotelCurrency: null;
        };
      };
      taxes: {
        taxes: TaxDto[];
      };
      immediateConfirmation: boolean;
      dailyPrices: {
        dailyPrices: [
          {
            date: "2024-06-26";
            rate: {
              vatIncluded: true;
              clientCurrency: {
                commission: {
                  price: 454;
                  vatAmount: 75.66999816894531;
                  currency: "RUB";
                };
                gross: {
                  price: 5340;
                  vatAmount: 890;
                  currency: "RUB";
                };
                net: {
                  price: 4886;
                  vatAmount: 814.3300170898438;
                  currency: "RUB";
                };
                extra: null;
              };
              hotelCurrency: null;
            };
            bookingFee: null;
            earlyArrival: null;
            lateDeparture: null;
            meals: null;
          },
        ];
      };
      offerPolicies: {
        policies: { type: string; value: string }[];
      };
      deepLink: string;
      roomWithWindow: boolean;
    }[];
  };
};
