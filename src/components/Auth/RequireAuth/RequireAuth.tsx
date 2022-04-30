import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth.context';

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <Navigate to={'/login'} />;
  }

  return children;
};

export default RequireAuth;
