import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';
import { UserRole } from '../../types/user.types';

// interface CustomizedState {
//   from: {
//     pathname: string;
//   };
// }

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, SetLoading] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  // const location = useLocation();
  // const state = location.state as CustomizedState;
  // const from = state?.from?.pathname || '/';

  const handleToggleLogin = () => {
    setIsLogin(prevState => !prevState);
  };

  const handleLogin = (email: string) => {
    let role: UserRole = 'customer';

    if (email.includes('admin')) {
      role = 'admin';
    }
    login({ email, role });

    navigate(role === 'customer' ? '/' : '/admin');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    if (email === '') {
      setError(true);
      return;
    }

    SetLoading(true);
    setTimeout(() => {
      handleLogin(email);
      SetLoading(false);
    }, 700);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={8} mx={'auto'} maxW={'sm'} py={12} px={6} width={'lg'}>
          <Stack align={'center'}>
            <Heading fontSize={'2xl'}>
              {isLogin ? 'Iniciar sesión' : 'Recuperar contraseña'}
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={6}
          >
            {isLogin ? (
              <Stack spacing={4}>
                <FormControl id='email'>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input name='email' type='email' isInvalid={error} />
                </FormControl>
                <FormControl id='password'>
                  <FormLabel>Contraseña</FormLabel>
                  <Input type='password' isInvalid={error} />
                </FormControl>
                {error && (
                  <Text color={'red.400'}>Usuario o contraseña incorrecto</Text>
                )}
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Button
                      variant={'link'}
                      onClick={handleToggleLogin}
                      color={'blue.400'}
                      fontSize={'sm'}
                      fontWeight={'normal'}
                    >
                      Olvidó su contraseña?
                    </Button>
                    <Text fontSize={'sm'}>
                      <Link as={NavLink} to={'/registro'} color={'blue.400'}>
                        Crear nuevo usuario
                      </Link>
                    </Text>
                  </Stack>
                  <Button
                    type='submit'
                    isLoading={loading}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Iniciar sesión
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={4}>
                <FormControl id='email'>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input type='email' />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Button
                      variant={'link'}
                      onClick={handleToggleLogin}
                      color={'blue.400'}
                      fontSize={'sm'}
                      fontWeight={'normal'}
                    >
                      Iniciar sesión
                    </Button>
                  </Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Recuperar contraseña
                  </Button>
                </Stack>
              </Stack>
            )}
          </Box>
        </Stack>
      </form>
    </Flex>
  );
};

export default Login;
