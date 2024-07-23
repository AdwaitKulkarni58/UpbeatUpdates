import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} variant="contained">
      Logout
    </Button>
  );
};

export default Logout;
