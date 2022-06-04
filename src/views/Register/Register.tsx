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
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createAccount } from '../../services/auth.service';

const CreateAccountSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('Este campo es requerido'),
  password: Yup.string().required('Este campo es requerido'),
});

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleCreateAccount = async (email: string, password: string) => {
    try {
      const response = await createAccount(email, password);

      if (response.status === 200) {
        navigate('/login');
        toast({
          title: 'Cuenta creada con éxito.',
          description: 'Inicie sesión para iniciar',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error al crear la cuenta.',
          description: 'El usuario ya existe',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
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
          <Heading fontSize={'2xl'}>Crear nuevo usuario</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={6}
        >
          <Stack spacing={4}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={CreateAccountSchema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  const { email, password } = values;
                  handleCreateAccount(email, password);
                  actions.setSubmitting(false);
                }, 1000);
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
                      <Text fontSize={'sm'}>
                        <Link as={NavLink} to={'/login'} color={'blue.400'}>
                          Iniciar sesión
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
                      Crear cuenta
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
