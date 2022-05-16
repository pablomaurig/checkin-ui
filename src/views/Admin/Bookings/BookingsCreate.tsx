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

const CreateBookingSchema = Yup.object().shape({
  bookingNumber: Yup.number().required('Este campo es requerido'),
  surname: Yup.string().required('Este campo es requerido'),
  startDate: Yup.date().required('Este campo es requerido'),
  endDate: Yup.date().required('Este campo es requerido'),
  amountGuests: Yup.number().required('Este campo es requerido'),
});

const BookingsCreate = () => {
  return (
    <Formik
      initialValues={{
        bookingNumber: '',
        surname: '',
        startDate: '',
        endDate: '',
        amountGuests: '',
      }}
      validationSchema={CreateBookingSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {props => (
        <Form>
          <PageTitle label='Crear reserva' />
          <Field name='bookingNumber'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.bookingNumber && form.touched.bookingNumber}
                mb={'5'}
              >
                <FormLabel htmlFor='bookingNumber'> Código de reserva</FormLabel>
                <Input {...field} id='bookingNumber' />
                <FormErrorMessage>{form.errors.bookingNumber}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='surname'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.surname && form.touched.surname}
                mb={'5'}
              >
                <FormLabel htmlFor='surname'> Apellido </FormLabel>
                <Input {...field} id='surname' />
                <FormErrorMessage>{form.errors.surname}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='startDate'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.startDate && form.touched.startDate}
                mb={'5'}
              >
                <FormLabel htmlFor='startDate'> Fecha Ingreso </FormLabel>
                <Input {...field} id='startDate' />
                <FormErrorMessage>{form.errors.startDate}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='endDate'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.endDate && form.touched.endDate}
                mb={'5'}
              >
                <FormLabel htmlFor='endDate'> Fecha Salida  </FormLabel>
                <Input {...field} id='endDate' />
                <FormErrorMessage>{form.errors.endDate}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='amountGuests'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.amountGuests && form.touched.amountGuests}
                mb={'5'}
              >
                <FormLabel htmlFor='amountGuests'> Cantidad de huéspedes </FormLabel>
                <Input {...field} id='amountGuests' />
                <FormErrorMessage>{form.errors.amountGuests}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <ButtonGroup mt={4} alignItems={'center'}>
            <Button isLoading={props.isSubmitting} type='submit'>
              Submit
            </Button>
            <Link as={NavLink} to={'../reservas'}>
              Cancelar
            </Link>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default BookingsCreate;
