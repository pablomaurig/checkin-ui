import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Auth.context';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Image } from '@chakra-ui/react';

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
      <Image
        borderRadius='full'
        boxSize='150px'
        src='logo.png'
        alt='Logo app'
      />
    </Box>
  );
};

export default Splash;
