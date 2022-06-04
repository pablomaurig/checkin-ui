export interface Room {
  id?: number;
  bookingId?: number;
  name: string;
  description: string;
  floor: number | string;
  singleBeds: number | string;
  doubleBeds: number | string;
}
