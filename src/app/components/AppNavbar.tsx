import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAppSelector } from '../hooks';
import { isLoggedin } from '../store/loginSlice';

export default function AppNavbar() {

  const loggedin = useAppSelector(isLoggedin);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      
        {
          loggedin ? (
            <Container>
              <Navbar.Brand href="#">針灸院</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-main" />
        <Navbar.Collapse id="navbar-main">
          <Nav className="me-auto">
            <Nav.Link href="#">予約管理</Nav.Link>
            <Nav.Link href="#">カレンダー</Nav.Link>
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