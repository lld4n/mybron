import { api, RoomDto } from "../../utils";

export async function fetchRooms(id: string) {
  const data: {
    hotels: {
      rooms: {
        rooms: RoomDto[];
      };
    }[];
  } = await api.get("hotel?hotelIds=" + id).json();
  if (data.hotels.length === 0) return [];
  if (data.hotels[0].rooms.rooms.length === 0) return [];
  return data.hotels[0].rooms.rooms;
}
