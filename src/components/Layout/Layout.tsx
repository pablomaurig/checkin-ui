import { Box, Container, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Nav from '../Nav';

const Layout = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const PATHS_WITH_NO_LAYOUT = ['/login', '/registro', '/admin/login'];

  if (PATHS_WITH_NO_LAYOUT.includes(location.pathname)) {
    return <main>{children}</main>;
  }

  return (
    <Box
      className='App'
      minH={'100vh'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Header isOpen={isOpen} onOpen={onOpen} />
      <Nav isOpen={isOpen} onClose={onClose} />
      <Container
        as={'main'}
        maxW='container.xl'
        py={6}
        flex={'1'}
        display={'flex'}
        flexDirection={'column'}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
