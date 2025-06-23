import { Button, Modal } from 'react-bootstrap'

interface ApplyTemplateModalProps {
    show: boolean
    month: number
    onHide: () => void
    onApplyConfirm: () => void
}

export default function ApplyTemplateModal({
    show,
    month,
    onHide,
    onApplyConfirm,
}: ApplyTemplateModalProps) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>確認</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {month + 1}月のシフトにテンプレートを適用しますか？
                    <br />
                    今までに入力した内容は上書きされます。
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    キャンセル
                </Button>
                <Button variant="danger" onClick={onApplyConfirm}>
                    適用
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
