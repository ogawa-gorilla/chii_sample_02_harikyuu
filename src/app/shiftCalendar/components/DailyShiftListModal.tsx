import { useAppSelector } from '@/app/hooks'
import dayjs from 'dayjs'
import { Modal } from 'react-bootstrap'
import DailyShiftList from './DailyShiftList'

interface DailyShiftListModalProps {
    show: boolean
    date: string
    staffId: string
    onHide: () => void
}

const formatDate = (date: string): string => {
    return dayjs(date).format('YYYY年MM月DD日')
}

export default function DailyShiftListModal({
    show,
    date,
    staffId,
    onHide,
}: DailyShiftListModalProps) {
    const staff = useAppSelector((state) => state.user.users).find(
        (staff) => staff.id === staffId
    )

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{formatDate(date)}: 鈴木</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DailyShiftList />
            </Modal.Body>
        </Modal>
    )
}
