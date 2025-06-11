import { Button, Modal } from 'react-bootstrap'

interface DeleteConfirmModalProps {
    show: boolean
    onHide: () => void
    onConfirm: () => void
}

export default function DeleteConfirmModal({
    show,
    onHide,
    onConfirm,
}: DeleteConfirmModalProps) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>シフトを削除しますか？</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>シフトを削除しますか？</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHide()}>
                    キャンセル
                </Button>
                <Button variant="danger" onClick={() => onConfirm()}>
                    削除
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
