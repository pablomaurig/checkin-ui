import { Formik, Form, Field } from 'formik';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  // Icon,
  Input,
  // InputGroup,
  // InputRightElement,
  Link,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import PageTitle from '../../../components/PageTitle';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
// import React, { useContext } from 'react';
// import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { Employee } from '../../../types/employees.types';
import { updateEmployee } from '../../../services/employees.service';
import { AuthContext } from '../../../context/Auth.context';

const EmployeeEditSchema = Yup.object().shape({
  firstName: Yup.string().required('Este campo es requerido'),
  lastName: Yup.string().required('Este campo es requerido'),
});

type EmployeeState = {
  employee: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
};

const EmployeeEdit = () => {
  const location = useLocation();
  // const [show, setShow] = React.useState(false);
  const { user } = useContext(AuthContext);
  const { employee } = location.state as EmployeeState;
  const toast = useToast();
  const navigate = useNavigate();
  // const handleClick = () => setShow(!show);

  const handleEditEmployee = async (
    employeeValue: Partial<Employee>,
    actions: any
  ) => {
    if (user) {
      try {
        const response = await updateEmployee(
          employee.id,
          employeeValue,
          user.token
        );

        if (response.status === 200) {
          navigate(-1);
          toast({
            title: 'Empleado editado con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Hubo un problema al editar el empleado',
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
        firstName: employee.firstName,
        lastName: employee.lastName,
        // email: employee.email,
        // password: '',
      }}
      validationSchema={EmployeeEditSchema}
      onSubmit={(values, actions) => {
        handleEditEmployee(values, actions);
      }}
    >
      {props => (
        <Form>
          <PageTitle label='Información del empleado' />
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
          {/* <Field name='email'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.email && form.touched.email}
                mb={'5'}
              >
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input {...field} id='email' placeholder='email' disabled={true} />
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
                        <Icon as={FaRegEyeSlash} />
                      ) : (
                        <Icon as={FaRegEye} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field> */}
          <ButtonGroup mt={4} alignItems={'center'}>
            <Button isLoading={props.isSubmitting} type='submit'>
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

export default EmployeeEdit;
