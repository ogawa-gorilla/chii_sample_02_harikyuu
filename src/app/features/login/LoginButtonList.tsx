import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setUser } from '@/app/store/loginSlice'
import { setCurrentPage } from '@/app/store/navigationSlice'
import { Page } from '@/app/types/Page'
import { User } from '@/app/types/user'
import { Button, Card, Row } from 'react-bootstrap'

export default function LoginButtonList() {
    const dispatch = useAppDispatch()
    const users = useAppSelector((state) => state.user.users)

    const handleLogin = (user: User) => {
        dispatch(setUser(user))
        dispatch(setCurrentPage(Page.DASHBOARD))
    }

    return (
        <Card
            style={{ width: '100%', maxWidth: '400px' }}
            className="p-4 shadow-sm"
        >
            <div className="text-center">
                <p>サンプルサイト用ログインボタン:</p>
                {users.map((user) => (
                    <Row className="mb-2" key={user.id}>
                        <Button
                            variant="success"
                            onClick={() => handleLogin(user)}
                        >
                            {user.name}({user.role})としてログイン
                        </Button>
                    </Row>
                ))}
            </div>
        </Card>
    )
}
