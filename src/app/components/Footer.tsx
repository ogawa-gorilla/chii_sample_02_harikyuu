import { Container } from 'react-bootstrap';
import { useAppDispatch } from '../hooks';
import { logout } from '../store/loginSlice';
import { setCurrentPage } from '../store/navigationSlice';
import { Page } from '../types/Page';

export default function Footer() {

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setCurrentPage(Page.HOME));
    dispatch(logout());
  }

  return (
    <footer className="bg-light text-center text-muted py-3 border-top mt-auto">
      <style>
        {`
          .logout-link {
            cursor: pointer;
            color: blue;
          }
        `}
      </style>
      <Container>
        <small>&copy; 2025 針灸院予約管理システム | <span className="logout-link" onClick={handleLogout}>ログアウト</span></small>
      </Container>
    </footer>
  );
}