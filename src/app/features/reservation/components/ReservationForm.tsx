import { useAppSelector } from '@/app/hooks';
import { isReservedAt } from '@/app/utils/reservationUtils';
import { isAvailableAt } from '@/app/utils/shiftUtils';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { User } from '../../../types/user';
import DatePickerModal from './DatePickerModal';
import StaffSelector from './StaffSelector';

interface ReservationFormData {
  staffId: string;
  clientName: string;
  notes: string;
  date: string;
  hour: string;
}

interface ReservationFormProps {
  scheduledDate: string; // 予約日時（編集不能）
  scheduledTime: string;// 予約時間(編集不能)
  clientName: string;
  notes: string;
  staff: User;
  availableStaffs: User[]; // 選択可能なスタッフリスト
  reservationId: string | null;
  onSubmit: (formData: ReservationFormData) => void; // 決定ボタン押下時のイベント
  onCancel?: () => void; // キャンセル時のイベント（オプション）
}

export default function ReservationForm({ 
  scheduledDate,
  scheduledTime, 
  clientName,
  notes,
  staff,
  availableStaffs, 
  reservationId,
  onSubmit, 
  onCancel 
}: ReservationFormProps) {
  const [formData, setFormData] = useState<ReservationFormData>({
    staffId: staff.id,
    clientName: clientName,
    notes: notes,
    date: scheduledDate,
    hour: scheduledTime
  });

  const [errors, setErrors] = useState<Partial<ReservationFormData>>({});
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);

  const targetStaff = useAppSelector((state) => state.user.users).find((user) => user.id === formData.staffId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション
    const newErrors: Partial<ReservationFormData> = {};
    if (!formData.staffId) {
      newErrors.staffId = '担当スタッフを選択してください';
    }
    if (!formData.clientName.trim()) {
      newErrors.clientName = '顧客名を入力してください';
    }

    setErrors(newErrors);

    // エラーがなければ送信
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ReservationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDateEdit = () => {
    setShowDatePickerModal(true);
  }

  const handleDateSelected = (date: string, hour: number) => {
    setFormData(prev => ({ ...prev, date, hour: hour.toString().padStart(2, '0') + ':00' }));
  }

  const hasDuplicatedReservation = useAppSelector((state) => state.reservation.reservations).some(reservation => isReservedAt(reservation, formData.date, parseInt(formData.hour.split(':')[0])) && reservation.staff.id === formData.staffId && reservation.id !== reservationId);

  const isNotOnAShift = !useAppSelector((state) => state.shift.shifts).some(shift => isAvailableAt(shift, formData.date, parseInt(formData.hour.split(':')[0])) && shift.staffId === formData.staffId);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <DatePickerModal show={showDatePickerModal} onHide={() => setShowDatePickerModal(false)} staff={targetStaff!} currentSelection={{ day: dayjs(formData.date), hour: parseInt(formData.hour.split(':')[0]) }} reservationId={reservationId ? reservationId : ''} onDateSelected={handleDateSelected} />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">

        {/* フォーム */}
        <Form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* 予約日時（編集不能） */}
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
              予約日時
            </label>
          <InputGroup>
            <Form.Control 
              disabled 
              className={`px-4 py-3 ${
                hasDuplicatedReservation || isNotOnAShift ? 'bg-danger' : 'bg-gray-100 border-gray-300'
              }`} 
              value={`${formData.date} ${formData.hour}`} 
            />
            <Button variant="secondary" onClick={handleDateEdit}>編集</Button>
          </InputGroup>
          {hasDuplicatedReservation && (
            <p className="mt-1 text-sm text-red-500">警告：その時間には別の予約があります</p>
          )}
          {isNotOnAShift && (
            <p className="mt-1 text-sm text-red-500">警告：出勤時間外です</p>
          )}
          </div>

          {/* 担当スタッフ */}
          <StaffSelector availableStaffs={availableStaffs} value={formData.staffId} errors={errors} onChange={(value) => handleInputChange('staffId', value)} />

          {/* 顧客名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              顧客名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              placeholder="顧客名を入力してください"
              className={`w-full border rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.clientName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.clientName && (
              <p className="mt-1 text-sm text-red-500">{errors.clientName}</p>
            )}
          </div>

          {/* 特記事項 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              特記事項
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="特記事項があれば入力してください"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-3 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                キャンセル
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              決定
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}