import { useAppSelector } from '@/app/hooks'
import { useLogin } from '@/app/hooks/useLogin'
import { NavDropdown } from 'react-bootstrap'

export default function UserDropdown() {
    const loginUser = useAppSelector((state) => state.login.user)
    const { handleLogout } = useLogin()
    return (
        <NavDropdown
            title={
                'ユーザー: ' + loginUser!.name + ' (' + loginUser!.role + ')'
            }
            id="user-dropdown"
            align="end"
        >
            <NavDropdown.Item href="#" onClick={handleLogout}>
                ログアウト
            </NavDropdown.Item>
        </NavDropdown>
    )
}
