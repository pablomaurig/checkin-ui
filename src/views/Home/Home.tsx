import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Formik, Form, Field, FieldArray, getIn } from 'formik';
import { BookingState } from '../../types/booking.types';
import { useRef, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';
import { ImStarFull } from 'react-icons/im';

const SURVEY = ['Sevicio 1', 'Sevicio 2', 'Sevicio 3', 'Sevicio 4'];

const Survey = ({ onClick, step }: any) => {
  const [value, setValue] = useState(0);
  const handleChange = (number: number) => {
    if (step <= SURVEY.length) {
      setValue(number);
      setTimeout(() => {
        if (step !== SURVEY.length) {
          setValue(0);
          onClick();
        }
      }, 1000);
    }
  };

  const Star = ({ starNumber }: { starNumber: number }) => {
    return (
      <Icon
        h={7}
        w={7}
        color={value >= starNumber ? 'yellow.300' : 'gray.200'}
        as={ImStarFull}
        onClick={() => handleChange(starNumber)}
      />
    );
  };

  return (
    <Box>
      <Text>{SURVEY[step - 1]}</Text>
      <Flex justifyContent={'space-around'}>
        <Star starNumber={1} />
        <Star starNumber={2} />
        <Star starNumber={3} />
        <Star starNumber={4} />
        <Star starNumber={5} />
      </Flex>
    </Box>
  );
};

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

const RequestBookingSchema = Yup.object().shape({
  lastName: Yup.string().required('Este campo es requerido'),
  bookingNumber: Yup.string().required('Este campo es requerido'),
});

const Home = () => {
  const [bookingState, setBookingState] = useState(BookingState.Pending);
  const [surveyStep, setSurveyStep] = useState(0);
  const [lastName, setLastName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const FRIENDS_COUNT = 1;

  const handleNextSurveyStep = () => {
    setSurveyStep(prevstate => prevstate + 1);
  };

  const handleFinishSurvey = () => {
    onClose();
    setBookingState(BookingState.Finalized);
  };

  const checkinSchema = Yup.object().shape({
    guests: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Este campo es requerido'),
          lastName: Yup.string().required('Este campo es requerido'),
          gender: Yup.string().required('Este campo es requerido'),
          dateOfBirth: Yup.date().required('Este campo es requerido'),
          phone: Yup.string().required('Este campo es requerido'),
          country: Yup.string().required('Este campo es requerido'),
          pictureFront: Yup.string().required('Este campo es requerido'),
          pictureBack: Yup.string().required('Este campo es requerido'),
        })
      )
      .min(FRIENDS_COUNT + 1, `Debe ingresar ${FRIENDS_COUNT} acompañantes`)
      .max(FRIENDS_COUNT + 1, `Debe ingresar ${FRIENDS_COUNT} acompañantes`),
  });

  return (
    <>
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
                  setBookingState(BookingState.Approved);
                  setLastName(values.lastName);
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
      {bookingState === BookingState.Approved && (
        <Flex
          direction={'column'}
          justifyContent={'space-between'}
          height={'100%'}
          flex={'1'}
        >
          <Box>
            <Formik
              initialValues={{
                guests: [
                  {
                    name: '',
                    lastName: lastName || '',
                    gender: '',
                    dateOfBirth: '',
                    phone: '',
                    country: '',
                    pictureFront: '',
                    pictureBack: '',
                  },
                ],
              }}
              validationSchema={checkinSchema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  actions.setSubmitting(false);
                  setBookingState(BookingState.Active);
                }, 1000);
              }}
            >
              {props => (
                <Form>
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
                                name={`guests[${index}].name`}
                                label={'Nombre'}
                              />
                              <FieldWidthErrorMessage
                                name={`guests[${index}].lastName`}
                                label={'Apellido'}
                              />
                              <FieldWidthErrorMessage
                                name={`guests[${index}].gender`}
                                label={'Género'}
                              />
                              <FieldWidthErrorMessage
                                name={`guests[${index}].dateOfBirth`}
                                label={'Fecha de nacimiento'}
                              />
                              <FieldWidthErrorMessage
                                name={`guests[${index}].phone`}
                                label={'Teléfono'}
                              />
                              <FieldWidthErrorMessage
                                name={`guests[${index}].country`}
                                label={'País'}
                              />
                              {guest.pictureFront ? (
                                <>
                                  <PreviewImage file={guest.pictureFront} />
                                  <Button
                                    onClick={() => {
                                      props.setFieldValue(
                                        `guests[${index}].pictureFront`,
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
                                    htmlFor={`guests[${index}].pictureFront`}
                                  >
                                    Foto DNI (Frente):
                                  </FormLabel>
                                  <UploadFile
                                    field={guest.pictureFront}
                                    name={`guests[${index}].pictureFront`}
                                    form={props}
                                  />
                                </>
                              )}
                              {guest.pictureBack ? (
                                <>
                                  <PreviewImage file={guest.pictureBack} />
                                  <Button
                                    onClick={() => {
                                      props.setFieldValue(
                                        `guests[${index}].pictureBack`,
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
                                    htmlFor={`guests[${index}].pictureFront`}
                                  >
                                    Foto DNI (Frente):
                                  </FormLabel>
                                  <UploadFile
                                    field={guest.pictureBack}
                                    name={`guests[${index}].pictureBack`}
                                    form={props}
                                  />
                                </>
                              )}
                            </Box>
                          ))}
                        {props.values.guests.length <= FRIENDS_COUNT && (
                          <Button
                            mb={'5'}
                            leftIcon={<Icon as={IoPersonAddSharp} />}
                            size='xs'
                            onClick={() =>
                              arrayHelpers.push({
                                name: '',
                                lastName: '',
                                gender: '',
                                dateOfBirth: '',
                                phone: '',
                                country: '',
                              })
                            }
                          >
                            Agregar nuevo huesped
                          </Button>
                        )}
                      </div>
                    )}
                  />
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
      )}
      {bookingState === BookingState.Active && (
        <Flex
          direction={'column'}
          justifyContent={'space-between'}
          height={'100%'}
          flex={'1'}
        >
          <Text>Checkin realizado con éxito.</Text>
          <Button onClick={onOpen}>Realizar checkout</Button>
          <Modal
            onClose={onClose}
            closeOnOverlayClick={false}
            size={'xs'}
            isOpen={isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              {surveyStep === 0 ? (
                <>
                  <ModalHeader>Realizar checkout</ModalHeader>
                  <ModalBody>
                    <Text>
                      Para finalizar complete la siguiente encuesta de
                      satisfacción
                    </Text>
                  </ModalBody>
                  <ModalFooter justifyContent={'center'}>
                    <Button onClick={handleNextSurveyStep}>
                      Realizar encuesta
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <>
                  <ModalHeader>Encuesta de satisfacción</ModalHeader>
                  <ModalBody>
                    <Survey onClick={handleNextSurveyStep} step={surveyStep} />
                  </ModalBody>
                  <ModalFooter justifyContent={'center'}>
                    <Button
                      disabled={surveyStep < SURVEY.length}
                      onClick={handleFinishSurvey}
                    >
                      Finalizar encuesta
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Flex>
      )}
      {bookingState === BookingState.Finalized && (
        <Flex
          direction={'column'}
          justifyContent={'space-between'}
          height={'100%'}
          flex={'1'}
        >
          <Text>Checkout realizado con éxito.</Text>
          <Button onClick={() => {}}>Realizar checkout</Button>
        </Flex>
      )}
    </>
  );
};

export default Home;
