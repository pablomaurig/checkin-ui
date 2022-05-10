import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { BookingState } from '../../types/booking.types';
import { useState } from 'react';

const RequestBookingSchema = Yup.object().shape({
  lastName: Yup.string().required('Este campo es requerido'),
  bookingNumber: Yup.number()
    .integer('Este campo debe ser un número entero')
    .typeError('Este campo debe ser un número')
    .required('Este campo es requerido'),
});

const Home = () => {
  const [bookingState, setBookingState] = useState(BookingState.Initial);

  return (
    <>
      {bookingState === BookingState.Initial && (
        <Flex
          direction={'column'}
          justifyContent={'space-between'}
          height={'100%'}
          flex={'1'}
        >
          <Text>Para comenzar debe cargar una reserva</Text>
          <Button
            onClick={() => {
              setBookingState(BookingState.Pending);
            }}
          >
            Cargar Reserva
          </Button>
        </Flex>
      )}
      {bookingState === BookingState.Pending && (
        <Flex direction={'column'}>
          <Text>
            A continuación ingrese el número de la reserva y el apellido de
            quien la solicitó
          </Text>
          <Box mt={'5'}>
            <Formik
              initialValues={{
                lastName: '',
                bookingNumber: '',
              }}
              validationSchema={RequestBookingSchema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  actions.setSubmitting(false);
                  setBookingState(BookingState.Created);
                }, 1000);
              }}
            >
              {props => (
                <Form>
                  <Field name='lastName'>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                        mb={'5'}
                      >
                        <FormLabel htmlFor='lastName'>Apellido:</FormLabel>
                        <Input {...field} id='lastName' />
                        <FormErrorMessage>
                          {form.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='bookingNumber'>
                    {({ field, form }: any) => (
                      <FormControl
                        isInvalid={
                          form.errors.bookingNumber &&
                          form.touched.bookingNumber
                        }
                        mb={'5'}
                      >
                        <FormLabel htmlFor='bookingNumber'>
                          Número de reserva:
                        </FormLabel>
                        <Input {...field} id='bookingNumber' />
                        <FormErrorMessage>
                          {form.errors.bookingNumber}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    isLoading={props.isSubmitting}
                    type='submit'
                    width={'100%'}
                  >
                    Cargar reserva
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      )}
      {bookingState === BookingState.Created && (
        <Flex
          direction={'column'}
          justifyContent={'space-between'}
          height={'100%'}
          flex={'1'}
        >
          <Box>
            <Text>La reserva fué creada con éxito.</Text>
            <Text>5 días previos a su estadía podrá cargar el checkin.</Text>
          </Box>
          <Button
            onClick={() => {
              setBookingState(BookingState.Approved);
            }}
          >
            Cargar Checkin
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Home;
