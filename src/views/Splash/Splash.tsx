import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Auth.context';
import { Navigate, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

interface CustomizedState {
  from: {
    pathname: string;
  };
}

const Splash = () => {
  const { splash, updateSplash } = useContext(AuthContext);
  const location = useLocation();
  const state = location.state as CustomizedState;
  const from = state?.from?.pathname || '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSplash();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!splash) {
    return <Navigate to={from} />;
  }

  return (
    <Box
      h='100vh'
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <div>splash</div>
    </Box>
  );
};

export default Splash;
