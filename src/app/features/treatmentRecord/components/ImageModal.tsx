import { Image, Modal } from 'react-bootstrap'

interface ImageModalProps {
    show: boolean
    onHide: () => void
    imageUrl: string | null
}

const ImageModal = ({ show, onHide, imageUrl }: ImageModalProps) => {
    return (
        <>
            {imageUrl && (
                <Modal show={show} onHide={onHide} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>画像詳細</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <Image src={imageUrl} fluid />
                    </Modal.Body>
                </Modal>
            )}
        </>
    )
}

export default ImageModal
