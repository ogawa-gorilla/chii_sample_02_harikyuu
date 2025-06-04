import { User } from "./user";

export interface Reservation {
  id: number;
  staff: User;
  client: string,
  date: string,
  time: string,
  duration: 1, // 時間単位
  status: string
}