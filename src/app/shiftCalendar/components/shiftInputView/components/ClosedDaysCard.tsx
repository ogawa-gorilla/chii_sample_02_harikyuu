interface ClosedDaysCardProps {
    reason: string
}

export default function ClosedDaysCard({ reason }: ClosedDaysCardProps) {
    return (
        <div
            className="d-flex align-items-center justify-content-center p-2"
            style={{ minHeight: '120px', backgroundColor: '#f8f9fa' }}
        >
            <div className="text-center">
                <div>{reason}</div>
                <div className="mt-1">🔒</div>
            </div>
        </div>
    )
}
