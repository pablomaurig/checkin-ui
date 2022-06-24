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
  Image,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createAccount } from '../../services/auth.service';
import logo from '../../assets/visitar-logo.png';
import bgImage from '../../assets/bg-image.jpg';

const CreateAccountSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('Este campo es requerido'),
  password: Yup.string()
    .min(6, 'Debe tener un mínimo de 6 caracteres')
    .max(100, 'Puede tener un máximo de 100 caracteres')
    .required('Este campo es requerido'),
});

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleCreateAccount = async (
    email: string,
    password: string,
    actions: any
  ) => {
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
      actions.setSubmitting(false);
    } catch (error) {
      console.error(error);
    }
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
          rounded={'lg'}
          backgroundColor= 'rgba(253, 254, 254, 0.9)'
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
          <Heading fontSize={20}> ALTA NUEVO USUARIO </Heading>
        </Stack>
          <Stack spacing={4}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={CreateAccountSchema}
              onSubmit={(values, actions) => {
                const { email, password } = values;
                handleCreateAccount(email, password, actions);
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
                      justify={'center'}
                    >
                      <Text fontSize={'sm'} fontWeight={'300'}>
                        <Link as={NavLink} to={'/login'} color='purple.500'>
                          INICIAR SESIÓN
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
                      CREAR CUENTA
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
