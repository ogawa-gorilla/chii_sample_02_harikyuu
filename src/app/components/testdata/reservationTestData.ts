import { Reservation } from "@/app/types/reservation";
import { Role } from "@/app/types/role";

export const RESERVATION_TESTDATA: Reservation[] = [
  {
    id: '1',
    date: '2025-06-02',
    client: '大野 次郎',
    time: '11:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '3',
      name: '山田',
      email: 'yamada@example.com',
      role: Role.STAFF,
      password: 'password',
      themeColor: '#4B000F',
    },
    notes: ''
  },
  {
    id: '2',
    date: '2025-06-01',
    client: '赤井 一郎',
    time: '15:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '1',
      name: '鈴木',
      email: 'manager@example.com',
      role: Role.MANAGER,
      password: 'suzuki',
      themeColor: '#0A192F',
    },
    notes: ''
  },
  {
    id: '3',
    date: '2025-05-31',
    client: '田中 花子',
    time: '10:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '2',
      name: '佐藤',
      email: 'sato@example.com',
      role: Role.STAFF,
      password: 'sato',
      themeColor: '#2D0B5A',
    },
    notes: ''
  },
  {
    id: '4',
    date: '2025-06-07',
    client: '松本 健太',
    time: '14:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '3',
      name: '山田',
      email: 'yamada@example.com',
      role: Role.STAFF,
      password: 'yamada',
      themeColor: '#4B000F',
    },
    notes: ''
  },
  {
    id: '5',
    date: '2025-06-08',
    client: '中村 美咲',
    time: '16:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '2',
      name: '佐藤',
      email: 'sato@example.com',
      role: Role.STAFF,
      password: 'sato',
      themeColor: '#2D0B5A',
    },
    notes: ''
  },
  {
    id: '6',
    date: '2025-06-14',
    client: '佐々木 正人',
    time: '09:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '1',
      name: '鈴木',
      email: 'manager@example.com',
      role: Role.MANAGER,
      password: 'suzuki',
      themeColor: '#0A192F',
    },
    notes: '紹介 高橋さん'
  },
  {
    id: '7',
    date: '2025-06-16',
    client: '吉田 雅子',
    time: '13:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '3',
      name: '山田',
      email: 'yamada@example.com',
      role: Role.STAFF,
      password: 'yamada',
      themeColor: '#4B000F',
    },
    notes: ''
  },
  {
    id: '8',
    date: '2025-06-15',
    client: '高橋 昭彦',
    time: '15:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '2',
      name: '佐藤',
      email: 'sato@example.com',
      role: Role.STAFF,
      password: 'sato',
      themeColor: '#2D0B5A',
    },
    notes: '針灸は初めてとのこと'
  },
  {
    id: '9',
    date: '2025-06-22',
    client: '小林 千代',
    time: '11:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '1',
      name: '鈴木',
      email: 'manager@example.com',
      role: Role.MANAGER,
      password: 'suzuki',
      themeColor: '#0A192F',
    },
    notes: ''
  },
  {
    id: '10',
    date: '2025-06-18',
    client: '伊藤 慎一',
    time: '17:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '3',
      name: '山田',
      email: 'yamada@example.com',
      role: Role.STAFF,
      password: 'yamada',
      themeColor: '#4B000F',
    },
    notes: ''
  },
  {
    id: '11',
    date: '2025-06-18',
    client: '佐竹 一郎',
    time: '17:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '1',
      name: '鈴木',
      email: 'suzuki@example.com',
      role: Role.MANAGER,
      password: 'suzuki',
      themeColor: '#0A192F',
    },
    notes: ''
  },
  {
    id: '12',
    date: '2025-06-11',
    client: '堂本 紘一',
    time: '14:00',
    duration: 1,
    status: '予約済',
    staff: {
      id: '3',
      name: '山田',
      email: 'yamada@example.com',
      role: Role.STAFF,
      password: 'yamada',
      themeColor: '#4B000F',
    },
    notes: '紹介 高橋さん'
  }
]