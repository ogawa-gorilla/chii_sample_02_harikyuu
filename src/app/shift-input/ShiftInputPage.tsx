'use client';

import { Shift } from '@/app/types/shift';
import React, { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';

interface Staff {
  id: string;
  name: string;
}

const staffList: Staff[] = [
  { id: '1', name: '鈴木' },
  { id: '2', name: '佐藤' },
  { id: '3', name: '山田' },
];

const ShiftInputPage: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  // 基本シフト設定用の状態（月・火以外の曜日）
  const [basicShifts, setBasicShifts] = useState<{[key: string]: {startTime: string, endTime: string}}>({
    'wed': { startTime: '09:00', endTime: '18:00' },
    'thu': { startTime: '09:00', endTime: '18:00' },
    'fri': { startTime: '09:00', endTime: '18:00' },
    'sat': { startTime: '09:00', endTime: '18:00' },
    'sun': { startTime: '09:00', endTime: '18:00' },
  });

  const generateShiftId = (staffId: string, date: string): string => {
    return `s${staffId}-${date.replace(/-/g, '')}`;
  };

  const handleAddShift = () => {
    if (!selectedStaff || !selectedDate) {
      alert('スタッフと日付を選択してください');
      return;
    }

    if (startTime >= endTime) {
      alert('終了時間は開始時間より後にしてください');
      return;
    }

    // 既存のシフトがないかチェック
    const existingShift = shifts.find(
      shift => shift.staffId === selectedStaff && shift.date === selectedDate
    );

    if (existingShift) {
      alert('この日程は既にシフトが登録されています');
      return;
    }

    const newShift: Shift = {
      id: generateShiftId(selectedStaff, selectedDate),
      staffId: selectedStaff,
      date: selectedDate,
      startTime,
      endTime
    };

    setShifts([...shifts, newShift]);
    setShowSuccess(true);
    
    // 3秒後に成功メッセージを非表示
    setTimeout(() => setShowSuccess(false), 3000);
    
    // フォームをリセット
    setSelectedDate('');
    setStartTime('09:00');
    setEndTime('18:00');
  };

  const handleDeleteShift = (shiftId: string) => {
    setShifts(shifts.filter(shift => shift.id !== shiftId));
  };

  const getStaffName = (staffId: string): string => {
    const staff = staffList.find(s => s.id === staffId);
    return staff ? staff.name : `スタッフ${staffId}`;
  };

  const formatTime = (time: string): string => {
    return time.substring(0, 5); // HH:MM形式にする
  };

  const formatDate = (date: string): string => {
    const dateObj = new Date(date);
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const weekday = weekdays[dateObj.getDay()];
    return `${month}/${day}(${weekday})`;
  };

  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // 基本シフト設定用のヘルパー関数
  const weekdayNames = {
    'wed': '水曜日',
    'thu': '木曜日', 
    'fri': '金曜日',
    'sat': '土曜日',
    'sun': '日曜日'
  };

  const updateBasicShift = (dayKey: string, field: 'startTime' | 'endTime', value: string) => {
    setBasicShifts(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [field]: value
      }
    }));
  };

  const setPresetTime = (dayKey: string, preset: 'morning' | 'afternoon' | 'allday') => {
    const presets = {
      morning: { startTime: '09:00', endTime: '13:00' },
      afternoon: { startTime: '13:00', endTime: '18:00' },
      allday: { startTime: '09:00', endTime: '18:00' }
    };
    
    setBasicShifts(prev => ({
      ...prev,
      [dayKey]: presets[preset]
    }));
  };

  return (
    <Container className="py-4" style={{ maxWidth: '480px' }}>
      {/* タイトル */}
      <div className="text-center mb-4">
        <h2 className="h4 mb-0 text-primary fw-bold">シフト入力</h2>
      </div>

      {/* 成功メッセージ */}
      {showSuccess && (
        <Alert variant="success" className="text-center mb-3">
          シフトを追加しました！
        </Alert>
      )}

      {/* ユーザセレクタ */}
      <Card className="mb-4 shadow-sm">
        <Card.Body className="p-3">
          <Form.Group>
            <Form.Label className="fw-semibold text-secondary small">
              <i className="bi bi-person-fill me-2"></i>スタッフ選択
            </Form.Label>
            <Form.Select 
              value={selectedStaff} 
              onChange={(e) => setSelectedStaff(e.target.value)}
              size="lg"
            >
              <option value="">スタッフを選択してください</option>
              {staffList.map(staff => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* シフト入力フォーム */}
      {selectedStaff && (
        <Card className="mb-4 shadow-sm">
          <Card.Header className="bg-light">
            <h5 className="mb-0 text-dark">
              <i className="bi bi-calendar-plus me-2"></i>
              {getStaffName(selectedStaff)}さんのシフト入力
            </h5>
          </Card.Header>
          <Card.Body className="p-3">
            <Form>
              {/* 日付選択 */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-secondary small">
                  <i className="bi bi-calendar3 me-2"></i>日付
                </Form.Label>
                <Form.Control
                  type="date"
                  value={selectedDate}
                  min={getMinDate()}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  size="lg"
                />
              </Form.Group>

              {/* 時間選択 */}
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-secondary small">
                      <i className="bi bi-clock me-2"></i>開始時間
                    </Form.Label>
                    <Form.Control
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      size="lg"
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-secondary small">
                      <i className="bi bi-clock-fill me-2"></i>終了時間
                    </Form.Label>
                    <Form.Control
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      size="lg"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* 追加ボタン */}
              <div className="d-grid">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleAddShift}
                  disabled={!selectedDate}
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  シフトを追加
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {selectedStaff && (
        <Card className="mb-4 shadow-sm">
          <Card.Header className="bg-light">
            <h5 className="mb-0 text-dark">
              <i className="bi bi-calendar-plus me-2"></i>
              基本シフト設定
            </h5>
          </Card.Header>
          <Card.Body className="p-3">
            <div className="text-muted small mb-3">
              <i className="bi bi-info-circle me-1"></i>
              月・火以外の曜日の基本シフト時間を設定できます
            </div>
            
            {Object.entries(weekdayNames).map(([dayKey, dayName]) => (
              <Card key={dayKey} className="mb-3 border-0 bg-light">
                <Card.Body className="p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="mb-0 text-primary fw-semibold">
                      <i className="bi bi-calendar2-week me-2"></i>
                      {dayName}
                    </h6>
                    <div className="btn-group btn-group-sm" role="group">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setPresetTime(dayKey, 'morning')}
                      >
                        午前
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setPresetTime(dayKey, 'afternoon')}
                      >
                        午後
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setPresetTime(dayKey, 'allday')}
                      >
                        全日
                      </Button>
                    </div>
                  </div>
                  
                  <Row>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold text-secondary small">
                          <i className="bi bi-clock me-1"></i>開始時間
                        </Form.Label>
                        <Form.Control
                          type="time"
                          value={basicShifts[dayKey].startTime}
                          onChange={(e) => updateBasicShift(dayKey, 'startTime', e.target.value)}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label className="fw-semibold text-secondary small">
                          <i className="bi bi-clock-fill me-1"></i>終了時間
                        </Form.Label>
                        <Form.Control
                          type="time"
                          value={basicShifts[dayKey].endTime}
                          onChange={(e) => updateBasicShift(dayKey, 'endTime', e.target.value)}
                          size="sm"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
            
            <div className="d-grid mt-3">
              <Button variant="success" size="sm">
                <i className="bi bi-check-circle me-2"></i>
                基本シフト設定を保存
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* 登録済みシフト一覧 */}
      {shifts.length > 0 && (
        <Card className="shadow-sm">
          <Card.Header className="bg-light">
            <h5 className="mb-0 text-dark">
              <i className="bi bi-list-ul me-2"></i>
              登録済みシフト
              <Badge bg="primary" className="ms-2">{shifts.length}</Badge>
            </h5>
          </Card.Header>
          <Card.Body className="p-0">
            <ListGroup variant="flush">
              {shifts
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map(shift => (
                <ListGroup.Item key={shift.id} className="p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold text-dark">
                        {getStaffName(shift.staffId)}
                      </div>
                      <div className="text-muted small">
                        <i className="bi bi-calendar3 me-1"></i>
                        {formatDate(shift.date)}
                      </div>
                      <div className="text-primary small">
                        <i className="bi bi-clock me-1"></i>
                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                      </div>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteShift(shift.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      )}

      {/* 空状態メッセージ */}
      {shifts.length === 0 && selectedStaff && (
        <div className="text-center py-5 text-muted">
          <i className="bi bi-calendar-x display-4 d-block mb-3"></i>
          <p>まだシフトが登録されていません</p>
        </div>
      )}
    </Container>
  );
};

export default ShiftInputPage; 