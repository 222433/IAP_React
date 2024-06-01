import { Outlet, Navigate } from 'react-router-dom'
import { getEmail } from './userService'
import { useAsync, useFetch } from 'react-async'
import { API_ORIGIN } from './app-constants'

const PrivateRoutes = () => {
    const { data, error } = useAsync(getEmail)
    const auth = { token: true }
    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}
export default PrivateRoutes