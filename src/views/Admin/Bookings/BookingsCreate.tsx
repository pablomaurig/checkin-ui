import { Formik, Form, Field } from 'formik';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import PageTitle from '../../../components/PageTitle';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/Auth.context';
import { CreateBooking } from '../../../types/booking.types';
import { createBooking } from '../../../services/bookings.service';

const CreateBookingSchema = Yup.object().shape({
  bookingNumber: Yup.string().required('Este campo es requerido'),
  surname: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Sólo puede ingresar caracteres alfabéticos')
    .max(100, 'Supera el máximo de 100 caracteres')
    .required('Este campo es requerido'),
  startDate: Yup.string().required('Este campo es requerido'),
  endDate: Yup.string().required('Este campo es requerido'),
  amountGuests: Yup.number().required('Este campo es requerido'),
});

const BookingsCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCreateBookin = async (booking: CreateBooking, actions: any) => {
    if (user) {
      try {
        const response = await createBooking(booking, user.token);

        if (response.status === 200) {
          navigate(-1);
          toast({
            title: 'Reserva creada con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Hubo un problema al crear la reserva',
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
        bookingNumber: '',
        surname: '',
        startDate: '',
        endDate: '',
        amountGuests: '',
      }}
      validationSchema={CreateBookingSchema}
      onSubmit={(values, actions) => {
        const startDate = new Date(values.startDate);
        const endDate = new Date(values.endDate);
        const booking = {
          bookingNumber: values.bookingNumber,
          surname: values.surname,
          startDate: startDate.toLocaleString('af-ZA', {
            hour12: false,
          }),
          endDate: endDate.toLocaleString('af-ZA', {
            hour12: false,
          }),
          amountGuests: Number(values.amountGuests),
        };

        handleCreateBookin(booking, actions);
      }}
    >
      {props => (
        <Form>
          <PageTitle label='Crear reserva' />
          <Field name='bookingNumber'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={
                  form.errors.bookingNumber && form.touched.bookingNumber
                }
                mb={'5'}
              >
                <FormLabel htmlFor='bookingNumber'>
                  {' '}
                  Código de reserva
                </FormLabel>
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
                <Input
                  {...field}
                  id='startDate'
                  placeholder='dd/mm/aaaa'
                  type={'date'}
                />
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
                <FormLabel htmlFor='endDate'> Fecha Salida </FormLabel>
                <Input
                  {...field}
                  id='endDate'
                  placeholder='dd/mm/aaaa'
                  type={'date'}
                />
                <FormErrorMessage>{form.errors.endDate}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='amountGuests'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={
                  form.errors.amountGuests && form.touched.amountGuests
                }
                mb={'5'}
              >
                <FormLabel htmlFor='amountGuests'>
                  {' '}
                  Cantidad de huéspedes{' '}
                </FormLabel>
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
