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
  useToast,
  Image,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';
// import { UserRole } from '../../types/user.types';
import * as Yup from 'yup';
import { loginUser, resetPassword } from '../../services/auth.service';
import { Permissions } from '../../types/user.types';
import logo from '../../assets/visitar-logo.png';
import bgImage from '../../assets/bg-image.jpg';

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
      backgroundImage={`url(${bgImage})`} backgroundSize={'cover'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'sm'} py={12} px={6} width={'lg'}>
        <Box
          backgroundColor= 'rgba(253, 254, 254, 0.9)'
          rounded={'lg'}
          boxShadow={'lg'}
          p={6}
        >
        <Stack align={'center'} mb={5}>
          <Link
            as={NavLink}
            to='/'
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            <Image src={logo} height='40px'/>
          </Link>
          <Heading fontSize={'20'}>
            {isLogin ? 'INICIAR SESIÓN' : 'RECUPERAR CONTRASEÑA'}
          </Heading>
        </Stack>
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
                        <FormLabel htmlFor='email'> </FormLabel>
                        <Input {...field} id='email' type='email' borderColor='purple.500' placeholder='Correo electrónico'/>
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
                        <FormLabel htmlFor='password'> </FormLabel>
                        <Input {...field} id='password' type='password' borderColor='purple.500' placeholder='Password'/>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'center'}
                      justify={'space-between'}
                    >
                      <Button
                        variant={'link'}
                        onClick={handleToggleLogin}
                        color='purple.500'
                        fontSize={'13'}
                        fontWeight={'300'}
                      >
                        OLVIDÓ SU CONTRASEÑA?
                      </Button>
                      <Text fontSize={'13'} fontWeight={'300'}>
                        <Link as={NavLink} to={'/registro'} color='purple.500'>
                          CREAR USUARIO
                        </Link>
                      </Text>
                    </Stack>
                    <Button
                      isLoading={props.isSubmitting}
                      type='submit'
                      bg='purple.200' color= 'purple.700' border='1px' borderColor = 'purple.500'
                      _hover={{
                        bg: 'purple.400',
                      }}
                    >
                      INICIAR SESIÓN
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
                        <FormLabel htmlFor='email'> </FormLabel>
                        <Input {...field} id='email' type='email' borderColor='purple.500' placeholder='Correo electrónico'/>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'center'}
                      justify={'center'}
                    >
                      <Button
                        variant={'link'}
                        onClick={handleToggleLogin}
                        color='purple.500'
                        fontSize={'sm'}
                        fontWeight={'300'}
                      >
                        INICIAR SESIÓN
                      </Button>
                    </Stack>
                    <Button
                      isLoading={props.isSubmitting}
                      type='submit'
                      bg='purple.200' color= 'purple.700' border='1px' borderColor = 'purple.500'
                      _hover={{
                        bg: 'purple.400',
                      }}
                    >
                      RECUPERAR CONTRASEÑA
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
