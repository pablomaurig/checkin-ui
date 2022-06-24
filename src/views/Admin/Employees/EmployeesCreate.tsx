import { Formik, Form, Field } from 'formik';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import PageTitle from '../../../components/PageTitle';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/Auth.context';
import { CreateEmployee, Employee } from '../../../types/employees.types';
import { createEmployee } from '../../../services/employees.service';

const CreateEmployeeSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Sólo puede ingresar caracteres alfabéticos')
    .max(100, 'Supera el máximo de 100 caracteres').required('Este campo es requerido'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Sólo puede ingresar caracteres alfabéticos')
    .max(100, 'Supera el máximo de 100 caracteres').required('Este campo es requerido'),
  email: Yup.string().email('Debe ser un correo electrónico válido').required('Este campo es requerido'),
  password: Yup.string()
    .min(6, 'Debe tener un mínimo de 6 caracteres')
    .max(100, 'Puede tener un máximo de 100 caracteres')
    .required('Este campo es requerido'),
  repeatPassword: Yup.string()
    .min(6, 'Debe tener un mínimo de 6 caracteres')
    .required('Este campo es requerido')
    .oneOf([Yup.ref('password'), null], 'Las password no coinciden'),
});

const EmployeesCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleCreateEmployee = async (employee: Employee, actions: any) => {
    if (user) {
      try {
        const response = await createEmployee(employee, user.token);

        if (response.status === 200) {
          navigate(-1);
          toast({
            title: 'Empleado creado con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Hubo un problema al crear el empleado',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
      }}
      validationSchema={CreateEmployeeSchema}
      onSubmit={(values: CreateEmployee, actions) => {
        delete values.repeatPassword;
        handleCreateEmployee(values, actions);
      }}
    >
      {props => (
        <Form>
          <PageTitle label='Alta de empleado' />
          <Field name='firstName'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.firstName && form.touched.firstName}
                mb={'5'}
              >
                <FormLabel htmlFor='firstName'>Nombre</FormLabel>
                <Input {...field} id='firstName' />
                <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='lastName'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.lastName && form.touched.lastName}
                mb={'5'}
              >
                <FormLabel htmlFor='lastName'>Apellido</FormLabel>
                <Input {...field} id='lastName' />
                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='email'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.email && form.touched.email}
                mb={'5'}
              >
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input {...field} id='email' placeholder='email' />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='password'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
                mb={'5'}
              >
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    {...field}
                    id='password'
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? (
                        <Icon as={FaRegEye} />
                      ) : (
                        <Icon as={FaRegEyeSlash} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='repeatPassword'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={
                  form.errors.repeatPassword && form.touched.repeatPassword
                }
                mb={'5'}
              >
                <FormLabel htmlFor='repeatPassword'>Repite Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    {...field}
                    id='repeatPassword'
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Repeat password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? (
                        <Icon as={FaRegEye} />
                      ) : (
                        <Icon as={FaRegEyeSlash} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {form.errors.repeatPassword}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <ButtonGroup mt={4} alignItems={'center'}>
            <Button isLoading={props.isSubmitting} type='submit' bg='purpleC.300' color= 'purpleC.700' border='1px' borderColor = 'purpleC.600'
              _hover={{
                bg: 'purpleC.400',
              }}>
              Submit
            </Button>
            <Link as={NavLink} to={'../empleados'}>
              Cancelar
            </Link>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeesCreate;
