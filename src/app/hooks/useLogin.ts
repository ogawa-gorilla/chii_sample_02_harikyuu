import { useAppDispatch, useAppSelector } from '../hooks'
import { logout } from '../store/loginSlice'
import { setCurrentPage } from '../store/navigationSlice'
import { Page } from '../types/Page'

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const loginUser = useAppSelector((state) => state.login.user)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(setCurrentPage(Page.HOME))
    }

    return { loginUser, handleLogout }
}
