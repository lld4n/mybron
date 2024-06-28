import {
  AvailableAmenityDto,
  AvailableMealDto,
  BedDto,
  HotelOfferCancellationPolicyDto,
} from "../../utils";

export type RenderRoom = {
  id: number;
  images: string[];
  name: string;
  beds: BedDto[];
  amenities: AvailableAmenityDto[];
  rooms: RenderRoomItem[];
};

export type RenderRoomItem = {
  price: number;
  currency: string;
  meals: AvailableMealDto[];
  payment: string;
  cancel: HotelOfferCancellationPolicyDto[];
};
