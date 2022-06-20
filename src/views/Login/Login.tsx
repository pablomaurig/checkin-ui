import { Formik, Form, Field } from 'formik';
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
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';
// import { UserRole } from '../../types/user.types';
import * as Yup from 'yup';
import { loginUser, resetPassword } from '../../services/auth.service';
import { Permissions } from '../../types/user.types';

// interface CustomizedState {
//   from: {
//     pathname: string;
//   };
// }

const LoginUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('Este campo es requerido'),
  password: Yup.string()
    .min(6, 'Debe tener un mínimo de 6 caracteres')
    .max(100, 'Puede tener un máximo de 100 caracteres')
    .required('Este campo es requerido'),
});

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('Este campo es requerido'),
});

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  // const location = useLocation();
  // const state = location.state as CustomizedState;
  // const from = state?.from?.pathname || '/';

  const toast = useToast();

  const handleLoginUser = async (
    email: string,
    password: string,
    actions: any
  ) => {
    try {
      const response = await loginUser(email, password);
      const body = await response.json();

      if (response.status === 200) {
        const { user, token } = body;
        const userWithToken = { ...user, token };
        login(userWithToken);
        if (user.role === Permissions.customer) {
          navigate('/');
        } else {
          navigate('/admin');
        }
      } else {
        toast({
          title: 'Error al loguear.',
          description: 'Usuario o contraseña incorrectos',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
      actions.setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async (email: string, actions: any) => {
    try {
      const response = await resetPassword(email);

      if (response.status === 200) {
        toast({
          title: 'Mail de recuperación enviado con éxito',
          description: 'Revise su bandeja de entrada',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error al recuperar contraseña',
          description: 'El correo electrónico no es válido',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
      actions.setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleLogin = () => {
    setIsLogin(prevState => !prevState);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
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
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginUserSchema}
              onSubmit={(values, actions) => {
                const { email, password } = values;
                handleLoginUser(email, password, actions);
              }}
            >
              {props => (
                <Form>
                  <Field name='email'>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        mb={'5'}
                      >
                        <FormLabel htmlFor='email'>
                          Correo electrónico
                        </FormLabel>
                        <Input {...field} id='email' type='email' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='password'>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                        mb={'5'}
                      >
                        <FormLabel htmlFor='password'>Contraseña</FormLabel>
                        <Input {...field} id='password' type='password' />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
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
                      isLoading={props.isSubmitting}
                      type='submit'
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Iniciar sesión
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={ResetPasswordSchema}
              onSubmit={(values, actions) => {
                const { email } = values;
                handleResetPassword(email, actions);
              }}
            >
              {props => (
                <Form>
                  <Field name='email'>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        mb={'5'}
                      >
                        <FormLabel htmlFor='email'>
                          Correo electrónico
                        </FormLabel>
                        <Input {...field} id='email' type='email' />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
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
                      isLoading={props.isSubmitting}
                      type='submit'
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Recuperar contraseña
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
