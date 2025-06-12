import { Button } from 'react-bootstrap'

interface AddButtonProps {
    onClick: () => void
}

export default function AddButton({ onClick }: AddButtonProps) {
    return (
        <Button variant="outline-primary" size="sm" onClick={onClick}>
            シフト追加
        </Button>
    )
}
