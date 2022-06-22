import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  Link,
  Icon,
  Image,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MdClose, MdMenu, MdOutlineLogout } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';
import logo from '../../assets/visitar-logo.png';

export default function Header({ onOpen, isOpen }: any) {
  const { logout, user } = useContext(AuthContext);

  const location = useLocation();
  if (location.pathname === '/admin') {
    onOpen();
  }

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'50px'}
          py={{ base: 1 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
        >
          <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }}>
            <IconButton
              className='menu'
              onClick={onOpen}
              disabled={user?.role === 'customer'}
              icon={
                isOpen ? (
                  <Icon as={MdClose} w={3} h={3} />
                ) : (
                  <Icon as={MdMenu} w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center' }}>
            <Link
              as={NavLink}
              to='/'
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Image src={logo} height='40px' />
            </Link>
          </Flex>

          <Stack
            flex={{ base: 1 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            {user && (
              <Button
                onClick={() => {
                  logout();
                }}
                variant={'link'}
              >
                <Icon as={MdOutlineLogout} />
              </Button>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
