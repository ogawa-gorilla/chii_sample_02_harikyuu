import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks';
import { isLoggedin } from '../store/loginSlice';
import { setCurrentPage } from '../store/navigationSlice';
import { Page } from '../types/Page';

export default function AppNavbar() {

  const dispatch = useAppDispatch();
  const loggedin = useAppSelector(isLoggedin);
  const [expanded, setExpanded] = useState(false);

  const handleNavLinkClick = (page: Page) => {
    dispatch(setCurrentPage(page));
    setExpanded(false); // ナビゲーションリンククリック時にナビバーを閉じる
  };

  return (
    <Navbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      
        {
          loggedin ? (
            <Container>
              <Navbar.Brand href="#">針灸院</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-main" />
        <Navbar.Collapse id="navbar-main">
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={() => handleNavLinkClick(Page.RESERVATION_CREATE_CALENDAR)}>新規予約</Nav.Link>
            <Nav.Link href="#" onClick={() => handleNavLinkClick(Page.RESERVATION_CALENDAR)}>予約カレンダー</Nav.Link>
            <Nav.Link href="#">施術記録</Nav.Link>
            <Nav.Link href="#">シフト管理</Nav.Link>
            <Nav.Link href="#">ダッシュボード</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="ユーザー: " id="user-dropdown" align="end">
              <NavDropdown.Item href="#">プロフィール</NavDropdown.Item>
              <NavDropdown.Item href="#">設定</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">ログアウト</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
        ) : (
          <Container>
            <Navbar.Brand href="#">針灸院</Navbar.Brand>
          </Container>
        )
        }
        
    </Navbar>
  );
}