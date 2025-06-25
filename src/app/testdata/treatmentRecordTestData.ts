import { TreatmentRecord } from '../types/treatmentRecord'
import { image01, image02 } from './initialImages'
import { RESERVATION_TESTDATA } from './reservationTestData'

export const TREATMENT_RECORD_TESTDATA: TreatmentRecord[] = [
    {
        id: '1',
        client: '田中 太郎',
        staffId: '1',
        date: '2025-06-01',
        content: '肩こりの鍼治療。肩甲骨まわりに反応点多数あり。',
        attached_images: [],
        for_reservation: RESERVATION_TESTDATA.find((r) => r.id === 'tr-1'),
    },
    {
        id: '2',
        client: '鈴木 花子',
        staffId: '2',
        date: '2025-06-04',
        content: '腰痛への施術。仙腸関節周辺に重点的にアプローチ。',
        attached_images: [image01],
        for_reservation: RESERVATION_TESTDATA.find((r) => r.id === 'tr-2'),
    },
    {
        id: '3',
        client: '佐藤 健',
        staffId: '1',
        date: '2025-06-04',
        content: '首のこり。後頚部に硬結があり。',
        attached_images: [],
        for_reservation: RESERVATION_TESTDATA.find((r) => r.id === 'tr-3'),
    },
    {
        id: '4',
        client: '山田 真一',
        staffId: '2',
        date: '2025-05-30',
        content: '背中の張り。脊柱起立筋にアプローチ。',
        attached_images: [image02],
        for_reservation: RESERVATION_TESTDATA.find((r) => r.id === 'tr-4'),
    },
    {
        id: '5',
        client: '井上 美咲',
        staffId: '1',
        date: '2025-05-29',
        content: '冷え性への対応。足首周辺に施術。',
        attached_images: [],
        for_reservation: RESERVATION_TESTDATA.find((r) => r.id === 'tr-5'),
    },
    {
        id: '6',
        client: '中村 海斗',
        staffId: '3',
        date: '2025-05-29',
        content: 'ストレスによる不眠。頭部と耳周辺の施術。',
        attached_images: [],
        for_reservation: RESERVATION_TESTDATA.find((r) => r.id === 'tr-6'),
    },
    {
        id: '7',
        client: '高橋 優',
        staffId: '2',
        date: '2025-06-01',
        content: '肩関節の可動域改善。',
        attached_images: [],
        for_reservation: RESERVATION_TESTDATA.find((r) => r.id === 'tr-7'),
    },
]
