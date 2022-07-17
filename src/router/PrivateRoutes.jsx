import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { uid } = useSelector((state) => state.auth);

  return uid ? children : <Navigate to="login" />;
};

export default PrivateRoutes;
