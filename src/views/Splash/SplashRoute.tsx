import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';

const SplashRoute = ({ children, url }: any) => {
  const { splash } = useContext(AuthContext);

  if (splash) {
    return <Navigate to={'/splash'} state={{ from: url }} replace />;
  }

  return children;
};

export default SplashRoute;
