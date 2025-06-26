import { useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { NavDropdown } from 'react-bootstrap'

export default function UserDropdown() {
    const loginUser = useAppSelector((state) => state.login.user)
    const { handleLogout } = useLogin()
    return (
        <NavDropdown
            title={'ユーザー: ' + loginUser!.name}
            id="user-dropdown"
            align="end"
        >
            <NavDropdown.Item href="#">プロフィール</NavDropdown.Item>
            <NavDropdown.Item href="#">設定</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#" onClick={handleLogout}>
                ログアウト
            </NavDropdown.Item>
        </NavDropdown>
    )
}
