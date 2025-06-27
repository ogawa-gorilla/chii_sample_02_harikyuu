import EditLogTypeSelector from '@/app/features/editLog/components/EditLogTypeSelector'
import { useAppSelector } from '@/app/hooks'
import { EditLogSearchConditions } from '@/app/types/EditLog'
import { useEffect, useState } from 'react'
import { Button, Col, Collapse, Container, Form, Row } from 'react-bootstrap'

interface SearchSectionProps {
    conditions: EditLogSearchConditions
    onConditionsChange: (conditions: EditLogSearchConditions) => void
    onToggle?: (isOpen: boolean) => void
}

export default function SearchSection({
    conditions,
    onConditionsChange,
    onToggle,
}: SearchSectionProps) {
    const users = useAppSelector((state) => state.user.users)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        onToggle?.(isOpen)
    }, [isOpen, onToggle])

    const handleClearDates = () => {
        onConditionsChange({
            ...conditions,
            startDate: '',
            endDate: '',
        })
    }

    return (
        <div
            className="position-fixed top-12 start-0 w-100 bg-light border-bottom shadow-sm"
            style={{ zIndex: 1000, padding: '1rem 0' }}
        >
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">条件で絞り込み</h6>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-controls="search-section-collapse"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? '折りたたむ' : '展開する'}
                    </Button>
                </div>

                <Collapse in={isOpen}>
                    <div id="search-section-collapse">
                        <Form.Text>スタッフで絞り込み</Form.Text>
                        <Form.Select
                            value={conditions.staffId}
                            onChange={(e) =>
                                onConditionsChange({
                                    ...conditions,
                                    staffId: e.target.value,
                                })
                            }
                            required={true}
                        >
                            <option value="all">すべて</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form className="mb-0 mt-3">
                            <Form.Text>種類で絞り込み</Form.Text>
                            <EditLogTypeSelector
                                selectedType={conditions.target}
                                onTypeChange={(type) =>
                                    onConditionsChange({
                                        ...conditions,
                                        target: type,
                                    })
                                }
                            />
                        </Form>
                        <Form className="mb-0 mt-3">
                            <Form.Text>日付で絞り込み</Form.Text>
                            <Row className="align-items-center">
                                <Col xs={4}>
                                    <Form.Control
                                        type="date"
                                        value={conditions.startDate || ''}
                                        onChange={(e) =>
                                            onConditionsChange({
                                                ...conditions,
                                                startDate: e.target.value,
                                            })
                                        }
                                        placeholder="YYYY-MM-DD"
                                        size="sm"
                                    />
                                </Col>
                                <Col xs={1} className="text-center">
                                    <span className="text-muted">～</span>
                                </Col>
                                <Col xs={4}>
                                    <Form.Control
                                        type="date"
                                        value={conditions.endDate || ''}
                                        onChange={(e) =>
                                            onConditionsChange({
                                                ...conditions,
                                                endDate: e.target.value,
                                            })
                                        }
                                        placeholder="YYYY-MM-DD"
                                        size="sm"
                                    />
                                </Col>
                                <Col xs={3}>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={handleClearDates}
                                        className="w-100"
                                    >
                                        クリア
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Collapse>
            </Container>
        </div>
    )
}
