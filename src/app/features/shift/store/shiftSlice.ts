import { Shift } from "@/app/types/shift";
import { createSlice } from "@reduxjs/toolkit";

interface ShiftState {
  shifts: Shift[];
}

const initialState: ShiftState = {
  shifts: [
    // 鈴木(id='1') - 基本的に毎日勤務（2025-06-10は全休）
    { id: 's1-20250528', staffId: '1', date: '2025-05-28', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250529', staffId: '1', date: '2025-05-29', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250530', staffId: '1', date: '2025-05-30', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250531', staffId: '1', date: '2025-05-31', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250601', staffId: '1', date: '2025-06-01', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250602', staffId: '1', date: '2025-06-02', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250603', staffId: '1', date: '2025-06-03', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250604', staffId: '1', date: '2025-06-04', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250605', staffId: '1', date: '2025-06-05', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250606', staffId: '1', date: '2025-06-06', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250607', staffId: '1', date: '2025-06-07', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250608', staffId: '1', date: '2025-06-08', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250609', staffId: '1', date: '2025-06-09', startTime: '09:00', endTime: '18:00' },
    // 2025-06-10は鈴木の全休日
    { id: 's1-20250611', staffId: '1', date: '2025-06-11', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250612', staffId: '1', date: '2025-06-12', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250613', staffId: '1', date: '2025-06-13', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250614', staffId: '1', date: '2025-06-14', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250615', staffId: '1', date: '2025-06-15', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250616', staffId: '1', date: '2025-06-16', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250617', staffId: '1', date: '2025-06-17', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250618', staffId: '1', date: '2025-06-18', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250619', staffId: '1', date: '2025-06-19', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250620', staffId: '1', date: '2025-06-20', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250621', staffId: '1', date: '2025-06-21', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250622', staffId: '1', date: '2025-06-22', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250623', staffId: '1', date: '2025-06-23', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250624', staffId: '1', date: '2025-06-24', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250625', staffId: '1', date: '2025-06-25', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250626', staffId: '1', date: '2025-06-26', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250627', staffId: '1', date: '2025-06-27', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250628', staffId: '1', date: '2025-06-28', startTime: '09:00', endTime: '18:00' },
    { id: 's1-20250629', staffId: '1', date: '2025-06-29', startTime: '09:00', endTime: '18:00' },

    // 佐藤(id='2') - 水・金はお休み（水曜日: 2025-05-28, 06-04, 06-11, 06-18, 06-25、金曜日: 2025-05-30, 06-06, 06-13, 06-20, 06-27は勤務なし）
    { id: 's2-20250529', staffId: '2', date: '2025-05-29', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250531', staffId: '2', date: '2025-05-31', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250601', staffId: '2', date: '2025-06-01', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250602', staffId: '2', date: '2025-06-02', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250603', staffId: '2', date: '2025-06-03', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250605', staffId: '2', date: '2025-06-05', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250607', staffId: '2', date: '2025-06-07', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250608', staffId: '2', date: '2025-06-08', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250609', staffId: '2', date: '2025-06-09', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250610', staffId: '2', date: '2025-06-10', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250612', staffId: '2', date: '2025-06-12', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250614', staffId: '2', date: '2025-06-14', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250615', staffId: '2', date: '2025-06-15', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250616', staffId: '2', date: '2025-06-16', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250617', staffId: '2', date: '2025-06-17', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250619', staffId: '2', date: '2025-06-19', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250621', staffId: '2', date: '2025-06-21', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250622', staffId: '2', date: '2025-06-22', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250623', staffId: '2', date: '2025-06-23', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250624', staffId: '2', date: '2025-06-24', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250626', staffId: '2', date: '2025-06-26', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250628', staffId: '2', date: '2025-06-28', startTime: '09:00', endTime: '18:00' },
    { id: 's2-20250629', staffId: '2', date: '2025-06-29', startTime: '09:00', endTime: '18:00' },

    // 山田(id='3') - 木曜日はお休み、2025-06-03と2025-06-17は午前半休（午後のみ勤務）
    // 木曜日は 2025-05-29, 06-05, 06-12, 06-19, 06-26 なので、これらの日は勤務なし
    { id: 's3-20250528', staffId: '3', date: '2025-05-28', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250530', staffId: '3', date: '2025-05-30', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250531', staffId: '3', date: '2025-05-31', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250601', staffId: '3', date: '2025-06-01', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250602', staffId: '3', date: '2025-06-02', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250603', staffId: '3', date: '2025-06-03', startTime: '13:00', endTime: '18:00' }, // 午前半休
    { id: 's3-20250604', staffId: '3', date: '2025-06-04', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250606', staffId: '3', date: '2025-06-06', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250607', staffId: '3', date: '2025-06-07', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250608', staffId: '3', date: '2025-06-08', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250609', staffId: '3', date: '2025-06-09', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250610', staffId: '3', date: '2025-06-10', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250611', staffId: '3', date: '2025-06-11', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250613', staffId: '3', date: '2025-06-13', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250614', staffId: '3', date: '2025-06-14', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250615', staffId: '3', date: '2025-06-15', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250616', staffId: '3', date: '2025-06-16', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250617', staffId: '3', date: '2025-06-17', startTime: '13:00', endTime: '18:00' }, // 午前半休
    { id: 's3-20250618', staffId: '3', date: '2025-06-18', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250620', staffId: '3', date: '2025-06-20', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250621', staffId: '3', date: '2025-06-21', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250622', staffId: '3', date: '2025-06-22', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250623', staffId: '3', date: '2025-06-23', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250624', staffId: '3', date: '2025-06-24', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250625', staffId: '3', date: '2025-06-25', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250627', staffId: '3', date: '2025-06-27', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250628', staffId: '3', date: '2025-06-28', startTime: '09:00', endTime: '18:00' },
    { id: 's3-20250629', staffId: '3', date: '2025-06-29', startTime: '09:00', endTime: '18:00' },
  ]
}

const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {}
})

export const {  } = shiftSlice.actions;

export default shiftSlice.reducer;