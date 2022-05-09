import { Formik, Form, Field } from 'formik';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import PageTitle from '../../../components/PageTitle';
import { NavLink } from 'react-router-dom';

const CreateEmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required('Este campo es requerido'),
  lastName: Yup.string().required('Este campo es requerido'),
  email: Yup.string().required('Este campo es requerido'),
  password: Yup.string().required('Este campo es requerido'),
  repeatPassword: Yup.string().required('Este campo es requerido').oneOf([Yup.ref('password'), null], 'Las password no coinciden'),
});


const EmployeesCreate = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
      validationSchema={CreateEmployeeSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
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
                <Input {...field} id='password' type="password" />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='repeatPassword'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.repeatPassword && form.touched.repeatPassword}
                mb={'5'}
              >
                <FormLabel htmlFor='repeatPassword'>Password</FormLabel>
                <Input {...field} id='repeatPassword' type="password" />
                <FormErrorMessage>{form.errors.repeatPassword}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
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

export default EmployeesCreate;