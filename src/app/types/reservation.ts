import { User } from "./user";

export interface Reservation {
  id: number;
  staff: User;
  client: string,
  date: string,
  time: string,
  duration: 1, // 時間単位
  status: string
  notes: string;
}

// 作成・編集画面に渡すプロパティ
export interface ReservationDraft {
  date: string;
  time: string;
  staff: User;
  availableStaffs: User[];
}
