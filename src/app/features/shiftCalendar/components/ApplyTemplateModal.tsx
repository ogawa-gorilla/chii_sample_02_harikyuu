import { Button, Modal } from 'react-bootstrap'

interface ApplyTemplateModalProps {
    show: boolean
    onHide: () => void
    onApplyConfirm: () => void
}

export default function ApplyTemplateModal({
    show,
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
                    全体にテンプレートを適用しますか？
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
