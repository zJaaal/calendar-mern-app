import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { uid } = useSelector((state) => state.auth);

  return !uid ? children : <Navigate to="/" />;
};

export default PublicRoutes;
