import { Button, Modal } from 'react-bootstrap'

interface SimpleConfirmModalProps {
    show: boolean
    onConfirm: () => void
    onCancel: () => void
}

export default function SimpleConfirmModal({
    show,
    onConfirm,
    onCancel,
}: SimpleConfirmModalProps) {
    return (
        <Modal show={show} closeButton onHide={onCancel}>
            <Modal.Header>
                <Modal.Title>確認</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>本当に削除しますか？この操作は元に戻せません。</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    キャンセル
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    削除
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
