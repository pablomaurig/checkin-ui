import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth.context';

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user !== null) {
    return <Navigate to={'/'} state={{ from: location }} replace />;
  }

  return children;
};

export default GuestRoute;
