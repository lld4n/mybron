import {
  AvailableMealDto,
  HotelOfferCancellationPolicyDto,
  RoomDto,
} from "../../utils";

export type RenderRoom = {
  id: number;
  room: RoomDto;
  rooms: RenderRoomItem[];
};

export type RenderRoomItem = {
  code: string;
  price: number;
  currency: string;
  meals: AvailableMealDto[];
  payment: string;
  cancel: HotelOfferCancellationPolicyDto[];
  guaranteeType: string;
};
