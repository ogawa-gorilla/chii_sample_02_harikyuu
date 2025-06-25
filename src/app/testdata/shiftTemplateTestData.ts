import { ShiftTemplate } from '@/app/types/shift'

export const SHIFT_TEMPLATE_TESTDATA: ShiftTemplate[] = [
    // 店長は全部出勤
    {
        id: '1',
        userId: '1',
        shiftDrafts: [
            {
                date: {
                    value: '0',
                    displayValue: '日',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '1',
            },
            {
                date: {
                    value: '3',
                    displayValue: '水',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '2',
            },
            {
                date: {
                    value: '4',
                    displayValue: '木',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '3',
            },
            {
                date: {
                    value: '5',
                    displayValue: '金',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '4',
            },
            {
                date: {
                    value: '6',
                    displayValue: '土',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '5',
            },
        ],
    },
    // 佐藤：水金休み
    {
        id: '2',
        userId: '2',
        shiftDrafts: [
            {
                date: {
                    value: '0',
                    displayValue: '日',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '1',
            },
            {
                date: {
                    value: '4',
                    displayValue: '木',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '3',
            },
        ],
    },
    // 山田：木休み、日午前のみ
    {
        id: '3',
        userId: '3',
        shiftDrafts: [
            {
                date: {
                    value: '0',
                    displayValue: '日',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '12:00',
                id: '1',
            },
            {
                date: {
                    value: '3',
                    displayValue: '水',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '2',
            },
            {
                date: {
                    value: '5',
                    displayValue: '金',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '4',
            },
            {
                date: {
                    value: '6',
                    displayValue: '土',
                    type: 'dayOfWeek',
                },
                startTime: '09:00',
                endTime: '18:00',
                id: '5',
            },
        ],
    },
]
