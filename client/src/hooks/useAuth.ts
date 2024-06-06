import { useNavigate } from "react-router";
import { useLazyGetMeQuery } from "../api/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUserInfo } from "../redux/slices/authSlice";

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.auth.user)

    const [triggerGetMe] = useLazyGetMeQuery();

    const token = sessionStorage.getItem("token");
    const isAuthenticated = !!token;

    const authenticate = (token: string) => sessionStorage.setItem("token", `Bearer ${token}`);

    const logOut = () => {
        sessionStorage.removeItem("token");
        dispatch(setUserInfo(null));
        navigate("/auth/sign-in");
    }
    
    const setAuthData = () => {
        triggerGetMe()
            .unwrap()
            .then((data) => dispatch(setUserInfo(data)))
            .catch(() => alert("Oops... something went wrong"));
    }

    return { 
        token, 
        isAuthenticated, 
        user, 
        authenticate, 
        logOut, 
        setAuthData 
    }
}