import { HOURS } from '@/app/constants/hours';
import { VIRUTAL_TODAY } from '@/app/constants/virtualToday';
import dayjs from 'dayjs';
import { useState } from 'react';

export function useCalendar() {
  const [startOfWeek, setStartOfWeek] = useState(
    dayjs(VIRUTAL_TODAY).startOf('week').add(1, 'day')
  );

  // 7日間の日付配列を生成
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  
  // 営業時間の配列を生成（9:00〜18:00）
  const hours = Array.from({ length: HOURS }, (_, i) => i + 9);

  // 週移動の処理
  const handlePrevWeek = () => {
    setStartOfWeek(prev => prev.subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setStartOfWeek(prev => prev.add(1, 'week'));
  };

  const handleToday = () => {
    setStartOfWeek(dayjs(VIRUTAL_TODAY).startOf('week').add(1, 'day'));
  };

  // 特定の週にジャンプ
  const jumpToWeek = (date: dayjs.Dayjs) => {
    setStartOfWeek(date.startOf('week').add(1, 'day'));
  };

  return {
    // 状態
    startOfWeek,
    days,
    hours,
    // アクション
    handlePrevWeek,
    handleNextWeek,
    handleToday,
    jumpToWeek,
  };
} 