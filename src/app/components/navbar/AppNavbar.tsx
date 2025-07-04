import { useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { isLoggedin } from '../../store/loginSlice'
import { setCurrentPage } from '../../store/navigationSlice'
import { Page } from '../../types/Page'
import UserDropdown from './components/UserDropdown'

export default function AppNavbar() {
    const dispatch = useAppDispatch()
    const loggedin = useAppSelector(isLoggedin)
    const [expanded, setExpanded] = useState(false)

    const handleNavLinkClick = (page: Page) => {
        dispatch(setCurrentPage(page))
        setExpanded(false) // ナビゲーションリンククリック時にナビバーを閉じる
    }

    return (
        <Navbar
            bg="primary"
            variant="dark"
            expand="lg"
            fixed="top"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
        >
            {loggedin ? (
                <Container>
                    <Navbar.Brand href="#">
                        鈴木針灸院 予約管理システム
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-main" />
                    <Navbar.Collapse id="navbar-main">
                        <Nav className="me-auto">
                            <Nav.Link
                                href="#"
                                onClick={() =>
                                    handleNavLinkClick(Page.DASHBOARD)
                                }
                            >
                                ホーム
                            </Nav.Link>
                            <Nav.Link
                                href="#"
                                onClick={() =>
                                    handleNavLinkClick(
                                        Page.RESERVATION_CREATE_CALENDAR
                                    )
                                }
                            >
                                新規予約
                            </Nav.Link>
                            <Nav.Link
                                href="#"
                                onClick={() =>
                                    handleNavLinkClick(
                                        Page.RESERVATION_CALENDAR
                                    )
                                }
                            >
                                予約カレンダー
                            </Nav.Link>
                            <Nav.Link
                                href="#"
                                onClick={() =>
                                    handleNavLinkClick(Page.RESERVATION_TABLE)
                                }
                            >
                                予約台帳
                            </Nav.Link>
                            <Nav.Link
                                href="#"
                                onClick={() =>
                                    handleNavLinkClick(
                                        Page.TREATMENT_RECORD_LIST
                                    )
                                }
                            >
                                施術記録
                            </Nav.Link>
                            <Nav.Link
                                href="#"
                                onClick={() => handleNavLinkClick(Page.SHIFT)}
                            >
                                シフト管理
                            </Nav.Link>
                            <Nav.Link
                                href="#"
                                onClick={() =>
                                    handleNavLinkClick(Page.EDIT_LOG)
                                }
                            >
                                編集履歴
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <UserDropdown />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            ) : (
                <Container>
                    <Navbar.Brand href="#">
                        鈴木針灸院 予約管理システム
                    </Navbar.Brand>
                </Container>
            )}
        </Navbar>
    )
}
