import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Auth.context';
import { Navigate } from 'react-router-dom';
import { Box, Image } from '@chakra-ui/react';
import logo from '../../assets/logo.png';

const Splash = ({ url = '/' }: { url: string }) => {
  const { splash, updateSplash } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSplash();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!splash) {
    return <Navigate to={url} />;
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
      }}
    >
      <Image borderRadius='full' boxSize='100px' src={logo} alt='VisitAR' />
    </Box>
  );
};

export default Splash;
