import { useAppDispatch, useAppSelector } from '../hooks'
import { logout } from '../store/loginSlice'
import { setCurrentPage } from '../store/navigationSlice'
import { Page } from '../types/Page'
import { Role } from '../types/role'

export const useLogin = () => {
    const dispatch = useAppDispatch()
    const loginUser = useAppSelector((state) => state.login.user)

    const handleLogout = () => {
        dispatch(logout())
        dispatch(setCurrentPage(Page.HOME))
    }

    const isManager = loginUser && loginUser.role === Role.MANAGER
    const isOffice = loginUser && loginUser.role === Role.OFFICE

    const isStaff =
        loginUser &&
        (loginUser.role === Role.STAFF || loginUser.role === Role.MANAGER)

    return { loginUser, handleLogout, isManager, isOffice, isStaff }
}
