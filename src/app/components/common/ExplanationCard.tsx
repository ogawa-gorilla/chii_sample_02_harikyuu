import { Card } from 'react-bootstrap'

interface ExplanationCardProps {
    title: string
    text: string
}

export default function ExplanationCard({ title, text }: ExplanationCardProps) {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title className="h6 text-muted mb-2">{title}</Card.Title>
                <div className="text-muted small">
                    {text.split('\n').map((line, index) => (
                        <p key={index} className="mb-1">
                            {line}
                        </p>
                    ))}
                </div>
            </Card.Body>
        </Card>
    )
}
