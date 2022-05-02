import { Container, useDisclosure } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';
import Nav from '../Nav';
import React from 'react';

const Layout = ({ children }: React.PropsWithChildren<React.ReactNode>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const PATHS_WITH_NO_LAYOUT = ['/login', '/registro', '/admin/login'];

  if (PATHS_WITH_NO_LAYOUT.includes(location.pathname)) {
    return <main>{children}</main>;
  }

  return (
    <div className='App'>
      <Header isOpen={isOpen} onOpen={onOpen} />
      <Nav isOpen={isOpen} onClose={onClose} />
      <main>
        <Container maxW='container.lg' pt={6}>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
