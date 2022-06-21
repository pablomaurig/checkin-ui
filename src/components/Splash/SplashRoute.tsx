import { useContext } from 'react';
import { AuthContext } from '../../context/Auth.context';
import Splash from './Splash';

const SplashRoute = ({ children, url }: any) => {
  const { splash } = useContext(AuthContext);

  if (splash) {
    return <Splash url={url} />;
  }

  return children;
};

export default SplashRoute;
