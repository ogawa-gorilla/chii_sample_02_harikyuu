import { Button, Card } from 'react-bootstrap'

export default function DailyShiftList() {
    return (
        <div>
            <Card>
                <Card.Header className="p-0">
                    <div className="d-flex align-items-stretch">
                        <div className="flex-grow-1 d-flex align-items-center justify-content-center p-3">
                            <span className="text-xl">09:00 - 18:00</span>
                        </div>
                        <Button variant="primary" className="rounded-0 px-4">
                            編集
                        </Button>
                    </div>
                </Card.Header>
            </Card>
            <Card>
                <Card.Body className="text-center bg-success text-white cursor-pointer">
                    追加する
                </Card.Body>
            </Card>
        </div>
    )
}
