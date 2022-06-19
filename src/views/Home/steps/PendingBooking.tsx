import {
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { GetBooking } from '../../../types/booking.types';

const RequestBookingSchema = Yup.object().shape({
  lastName: Yup.string().required('Este campo es requerido'),
  bookingNumber: Yup.string().required('Este campo es requerido'),
});

interface PendingBookingProps {
  getBooking: (checkinParams: GetBooking, actions: any) => {};
}

export const PendingBooking = ({ getBooking }: PendingBookingProps) => {
  return (
    <Flex direction={'column'}>
      <Text>
        A continuación ingrese el número de la reserva y el apellido de quien la
        solicitó
      </Text>
      <Box mt={'5'}>
        <Formik
          initialValues={{
            lastName: '',
            bookingNumber: '',
          }}
          validationSchema={RequestBookingSchema}
          onSubmit={(values, actions) => {
            getBooking(values, actions);
          }}
        >
          {props => (
            <Form>
              <Field name='lastName'>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.lastName && form.touched.lastName}
                    mb={'5'}
                  >
                    <FormLabel htmlFor='lastName'>Apellido:</FormLabel>
                    <Input {...field} id='lastName' />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='bookingNumber'>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.bookingNumber && form.touched.bookingNumber
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
                Buscar reserva
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
