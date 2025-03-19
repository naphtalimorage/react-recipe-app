import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();
    const logout = async () => {
        localStorage.removeItem("userData");
        navigate("/login");
    }
    return logout;
}

export default useLogout;


