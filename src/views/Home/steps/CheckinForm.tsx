/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Text,
  Image,
  Select,
  useToast,
} from '@chakra-ui/react';
import { Field, FieldArray, Form, Formik, getIn } from 'formik';
import { useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import * as Yup from 'yup';
import { Booking, CheckinBody, Guest } from '../../../types/booking.types';
import { User } from '../../../types/user.types';
import { checkin } from '../../../services/bookings.service';

interface BookingProps {
  booking: Booking;
  user: User;
  updateUser: Function;
}

export const CheckinForm = ({ booking, user, updateUser }: BookingProps) => {
  const toast = useToast();
  const { id: bookingId, amountGuests, startDate, endDate, surname } = booking;
  const formatedStartDate = new Date(startDate).toLocaleDateString('es');
  const formatedEndDate = new Date(endDate).toLocaleDateString('es');

  const checkinSchema = Yup.object().shape({
    guests: Yup.array()
      .of(
        Yup.object().shape({
          firstName: Yup.string()
            .matches(/^[a-zA-Z]+$/, 'Sólo puede ingresar caracteres alfabéticos')
            .max(100, 'Supera el máximo de 100 caracteres').required('Este campo es requerido'),
          lastName: Yup.string()
            .matches(/^[a-zA-Z]+$/, 'Sólo puede ingresar caracteres alfabéticos')
            .max(100, 'Supera el máximo de 100 caracteres').required('Este campo es requerido'),
          gender: Yup.string().required('Este campo es requerido'),
          dateOfBirth: Yup.string()
            .matches(
              /^\d{2}\/\d{2}\/\d{4}$/,
              'Debe ingresar fecha con formato dd/mm/aaaa'
            )
            .required('Este campo es requerido'),
          telephoneNumber: Yup.string()
            .max(100, 'Supera el máximo de 100 caracteres')
            .required('Este campo es requerido'),
          country: Yup.string()
            .matches(/^[a-zA-Z]+$/, 'Sólo puede ingresar caracteres alfabéticos')
            .max(100, 'Supera el máximo de 100 caracteres').required('Este campo es requerido'),
          idCardFront: Yup.string()
            .required('Este campo es requerido')
            .nullable(),
          idCardBack: Yup.string()
            .required('Este campo es requerido')
            .nullable(),
        })
      )
      .min(amountGuests, `Debe ingresar ${amountGuests} huespedes`)
      .max(amountGuests, `Debe ingresar ${amountGuests} huespedes`),
  });

  const FieldWidthErrorMessage = ({ name, label }: any) => (
    <Field name={name}>
      {({ field, form }: any) => {
        const error = getIn(form.errors, name);
        const touched = getIn(form.touched, name);

        return (
          <FormControl isInvalid={error && touched} mb={'5'}>
            <FormLabel htmlFor={name}>{label}:</FormLabel>
            <Input {...field} id={name} />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );

  const GenderWidthErrorMessage = ({ name, label, options }: any) => (
    <Field name={name}>
      {({ field, form }: any) => {
        const error = getIn(form.errors, name);
        const touched = getIn(form.touched, name);

        return (
          <FormControl isInvalid={error && touched} mb={'5'}>
            <FormLabel htmlFor={name}>{label}:</FormLabel>
            <Select placeholder='Seleccionar' {...field} id={name}>
              {options.map((item: string) => (
                <option key={item}>{item}</option>
              ))}
            </Select>
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );

  const PreviewImage = ({ file }: any) => {
    const [preview, setPreview] = useState<ArrayBuffer | string>('');
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setPreview(reader.result);
      }
    };

    return (
      <Box>
        <Image src={preview.toString()} />
      </Box>
    );
  };

  const UploadFile = ({ field, form, name }: any) => {
    const fileFrontRef = useRef<HTMLInputElement>();

    return (
      <>
        <input
          ref={fileFrontRef}
          {...field}
          type={'file'}
          id={name}
          value={''}
          onChange={e => {
            form.setFieldValue(name, e.target.files && e.target.files[0]);
          }}
          hidden
        />
        <Button
          onClick={() => {
            fileFrontRef.current?.click();
          }}
        >
          Agregar imagen
        </Button>
      </>
    );
  };

  interface GuestObj {
    guests: Guest[];
  }

  const handleCheckin = async (guestsObj: GuestObj, actions: any) => {
    const body: CheckinBody = {
      bookingId,
      userId: user.id,
      guests: guestsObj.guests,
    };
    const formatedGuests = body.guests.map((guest: any) => {
      return {
        ...guest,
        idCardFront: guest.idCardFront.name,
        idCardBack: guest.idCardFront.name,
      };
    });
    const newBody = {
      ...body,
      guests: formatedGuests,
    };

    if (user) {
      try {
        const response = await checkin(newBody, user.token);

        if (response.status === 200) {
          const user = await response.json();
          updateUser(user);
        } else {
          toast({
            title: 'Error al hacer checkin',
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

  const initialValues = {
    guests: [
      {
        firstName: '',
        lastName: surname as string | '',
        gender: '',
        dateOfBirth: '',
        telephoneNumber: '',
        country: '',
        idCardFront: '',
        idCardBack: '',
      },
    ],
  };

  return (
    <Flex
      direction={'column'}
      justifyContent={'space-between'}
      height={'100%'}
      flex={'1'}
    >
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={checkinSchema}
          onSubmit={(values, actions) => {
            handleCheckin(values as GuestObj, actions);
          }}
        >
          {props => (
            <Form>
              <Box mb={'5'}>
                <Text>
                  {`Usted tiene una reserva disponible para el día ${formatedStartDate} al ${formatedEndDate}`}
                </Text>
                <Text mb='5'>Cantidad de huéspedes: {amountGuests}</Text>
                <Text>
                  <b>Por favor, complete los siguientes datos:</b>
                </Text>
              </Box>
              <FieldArray
                name='guests'
                render={arrayHelpers => (
                  <div>
                    {props.values.guests &&
                      props.values.guests.map((guest, index) => (
                        <Box
                          key={index}
                          p={'3'}
                          mb={'5'}
                          backgroundColor={'gray.50'}
                        >
                          {index > 0 && (
                            <Flex
                              mb={'3'}
                              direction={'row'}
                              justifyContent={'space-between'}
                              justifyItems={'center'}
                            >
                              <Text>Acompañante {index}</Text>
                              <Button
                                leftIcon={<Icon as={MdDelete} />}
                                size='xs'
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Eliminar acompañante
                              </Button>
                            </Flex>
                          )}
                          <FieldWidthErrorMessage
                            name={`guests[${index}].firstName`}
                            label={'Nombre'}
                          />
                          <FieldWidthErrorMessage
                            name={`guests[${index}].lastName`}
                            label={'Apellido'}
                          />
                          <GenderWidthErrorMessage
                            name={`guests[${index}].gender`}
                            label={'Género'}
                            options={['Masculino', 'Femenino']}
                          />
                          <FieldWidthErrorMessage
                            name={`guests[${index}].dateOfBirth`}
                            label={'Fecha de nacimiento'}
                          />
                          <FieldWidthErrorMessage
                            name={`guests[${index}].telephoneNumber`}
                            label={'Teléfono'}
                          />
                          <FieldWidthErrorMessage
                            name={`guests[${index}].country`}
                            label={'País'}
                          />
                          <FormControl
                            isInvalid={
                              getIn(
                                props.errors,
                                `guests[${index}].idCardFront`
                              ) &&
                              getIn(
                                props.touched,
                                `guests[${index}].idCardFront`
                              )
                            }
                            mb={'5'}
                          >
                            {guest.idCardFront ? (
                              <>
                                <PreviewImage file={guest.idCardFront} />
                                <Button
                                  onClick={() => {
                                    props.setFieldValue(
                                      `guests[${index}].idCardFront`,
                                      null
                                    );
                                  }}
                                >
                                  Eliminar imagen
                                </Button>
                              </>
                            ) : (
                              <>
                                <FormLabel
                                  htmlFor={`guests[${index}].idCardFront`}
                                >
                                  Foto DNI (Frente):
                                </FormLabel>
                                <UploadFile
                                  field={guest.idCardFront}
                                  name={`guests[${index}].idCardFront`}
                                  form={props}
                                />
                              </>
                            )}
                            <FormErrorMessage>
                              {getIn(
                                props.errors,
                                `guests[${index}].idCardFront`
                              )}
                            </FormErrorMessage>
                          </FormControl>
                          <FormControl
                            isInvalid={
                              getIn(
                                props.errors,
                                `guests[${index}].idCardBack`
                              ) &&
                              getIn(
                                props.touched,
                                `guests[${index}].idCardBack`
                              )
                            }
                            mb={'5'}
                          >
                            {guest.idCardBack ? (
                              <>
                                <PreviewImage file={guest.idCardBack} />
                                <Button
                                  onClick={() => {
                                    props.setFieldValue(
                                      `guests[${index}].idCardBack`,
                                      null
                                    );
                                  }}
                                >
                                  Eliminar imagen
                                </Button>
                              </>
                            ) : (
                              <>
                                <FormLabel
                                  htmlFor={`guests[${index}].idCardBack`}
                                >
                                  Foto DNI (Dorso):
                                </FormLabel>
                                <UploadFile
                                  field={guest.idCardBack}
                                  name={`guests[${index}].idCardBack`}
                                  form={props}
                                />
                              </>
                            )}
                            <FormErrorMessage>
                              {getIn(
                                props.errors,
                                `guests[${index}].idCardBack`
                              )}
                            </FormErrorMessage>
                          </FormControl>
                        </Box>
                      ))}
                    {props.values.guests.length < amountGuests && (
                      <Button
                        mb={'5'}
                        leftIcon={<Icon as={IoPersonAddSharp} />}
                        size='xs'
                        onClick={() =>
                          arrayHelpers.push({
                            firstName: '',
                            lastName: '',
                            gender: '',
                            dateOfBirth: '',
                            telephoneNumber: '',
                            country: '',
                            idCardFront: '',
                            idCardBack: '',
                          })
                        }
                      >
                        Agregar nuevo huesped
                      </Button>
                    )}
                  </div>
                )}
              />
              {props.errors &&
                props.errors.guests &&
                typeof props.errors.guests === 'string' && (
                  <div
                    style={{
                      color: 'red',
                      fontSize: '14px',
                      marginBottom: '10px',
                    }}
                  >
                    {props.errors.guests}
                  </div>
                )}
              <Button
                width={'full'}
                isLoading={props.isSubmitting}
                type='submit'
              >
                Cargar checkin
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};
