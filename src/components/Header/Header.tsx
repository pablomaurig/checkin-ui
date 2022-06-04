import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Link,
  Icon,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MdClose, MdMenu, MdOutlineLogout } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';

export default function Header({ onOpen, isOpen }: any) {
  const { logout, user } = useContext(AuthContext);

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
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            // display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onOpen}
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
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
            >
              <Link
                as={NavLink}
                to='/'
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                Checkin app
              </Link>
            </Text>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
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
