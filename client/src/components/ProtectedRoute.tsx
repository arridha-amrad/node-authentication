import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../pages";
import { RootState } from "../store";

const ProtectedRoute = () => {
   const { isAuthenticated, isLoadingAuth } = useSelector((state: RootState) => state.auth)
   return !isLoadingAuth && isAuthenticated ? <Outlet /> : <Login />
}

export default ProtectedRoute;