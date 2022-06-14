import {
  AlertDialog as Alert,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Select,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  Tfoot,
  useToast,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import PageTitle from '../../../components/PageTitle';
import { MdCancel, MdExitToApp } from 'react-icons/md';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import * as Yup from 'yup';
import {
  createBookingSpent,
  deleteBooking,
  getBookings,
  getBookingSpents,
  updateBookingRoom,
  checkout,
} from '../../../services/bookings.service';
import { Booking, Spent } from '../../../types/booking.types';
import { AuthContext } from '../../../context/Auth.context';
import { getRooms } from '../../../services/rooms.service';
import { Room } from '../../../types/rooms.types';
import { Field, Form, Formik } from 'formik';

const CreateSpentSchema = Yup.object().shape({
  description: Yup.string().required('Este campo es requerido'),
  amount: Yup.number()
    .typeError('Este campo solo acepta números')
    .min(0.1, 'Ingrese un monto válido')
    .required('Este campo es requerido'),
  bookingId: Yup.number().required('Este campo es requerido'),
});

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [spents, setSpents] = useState<Spent[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const {
    isOpen: isOpenCheckOutModal,
    onOpen: onOpenCheckOutModal,
    onClose: onCloseCheckOutModal,
  } = useDisclosure();
  const {
    isOpen: isOpenExpensesModal,
    onOpen: onOpenExpensesModal,
    onClose: onCloseExpensesModal,
  } = useDisclosure();

  const handleCancel = (id: number) => {
    onOpen();
    setBookingId(id);
  };

  const onCancelSubmit = () => {
    handleDeleteBooking();
    onClose();
  };

  const handleDeleteBooking = async () => {
    try {
      if (user && bookingId) {
        const response = await deleteBooking(bookingId, user.token);
        if (response.status === 200) {
          toast({
            title: 'Reserva eliminada con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          fetchBookings();
        } else {
          toast({
            title: 'Error al eliminar reserva',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOut = (id: number) => {
    onOpenCheckOutModal();
    setLoading(true);
    setBookingId(id);
    fetchBookingSpent(id);
  };

  const handleExpense = (id: number) => {
    onOpenExpensesModal();
    setBookingId(id);
  };

  const onCheckOutSubmit = () => {
    fetchUpdateBookingState(bookingId as number);
    onCloseCheckOutModal();
  };

  const fetchBookings = async () => {
    if (user) {
      const reservas = await getBookings(user.token);
      setBookings(reservas);
    }
  };

  const fetchRooms = async () => {
    if (user) {
      const habitaciones = await getRooms(user.token);
      setRooms(habitaciones);
    }
  };

  const fetchBookingSpent = async (bookingId: number) => {
    if (user) {
      const gastos = await getBookingSpents(bookingId, user.token);
      setSpents(gastos);
      setLoading(false);
    }
  };

  const fetchUpdateBookingRoom = async (bookingId: number, roomId: number) => {
    if (user) {
      try {
        const response = await updateBookingRoom(bookingId, roomId, user.token);
        if (response.status === 200) {
          toast({
            title: 'Habitación asignada con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          fetchBookings();
        } else {
          toast({
            title: 'Error al asignar habitación',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
        fetchBookings();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchUpdateBookingState = async (bookingId: number) => {
    if (user) {
      try {
        const response = await checkout(bookingId, user.token);
        if (response.status === 200) {
          toast({
            title: 'Checkout realizado con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          fetchBookings();
        } else {
          toast({
            title: 'Error al realizar checkout',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
        fetchBookings();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateSpent = async (values: Spent, actions: any) => {
    if (user) {
      try {
        const response = await createBookingSpent(values, user.token);

        if (response.status === 200) {
          toast({
            title: 'Nuevo gasto creado con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Error al crear gasto',
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
    onCloseExpensesModal();
  };

  const handleBookingRoomUpdate = (bookingId: number, event: any) => {
    if (event.target.value) {
      fetchUpdateBookingRoom(bookingId, event.target.value);
    }
  };

  useEffect(() => {
    try {
      fetchBookings();
      fetchRooms();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Flex justifyContent={'space-between'} mb={'4'}>
        <PageTitle label='Reservas' />
        <Button as={NavLink} to={'crear'} size='sm'>
          Crear Reserva
        </Button>
      </Flex>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th> Código de Reserva </Th>
              <Th> Apellido </Th>
              <Th> Habitación asignada </Th>
              <Th> Fecha Ingreso </Th>
              <Th> Fecha Salida </Th>
              <Th> Cant. de huéspedes </Th>
              <Th> Estado </Th>
              <Th isNumeric>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map(booking => (
              <Tr key={booking.id}>
                <Td>{booking.bookingNumber}</Td>
                <Td>{booking.surname}</Td>
                <Td>
                  <Select
                    placeholder={
                      booking.roomId
                        ? rooms.find(room => room.id === booking.roomId)?.name
                        : 'Sin asignar'
                    }
                    size='sm'
                    onChange={event =>
                      handleBookingRoomUpdate(booking.id, event)
                    }
                  >
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </Select>
                </Td>
                <Td>{new Date(booking.startDate).toLocaleDateString('es')}</Td>
                <Td>{new Date(booking.endDate).toLocaleDateString('es')}</Td>
                <Td>{booking.amountGuests}</Td>
                <Td>{booking.state} </Td>
                <Td isNumeric>
                  <Button
                    title='Cancelar Reserva'
                    onClick={() => handleCancel(booking.id)}
                    px={2}
                    rounded={'full'}
                  >
                    <Icon as={MdCancel} />
                  </Button>
                  {booking.roomId !== null && booking.checkin !== null && (
                    <>
                      <Button
                        title='Agregar gasto'
                        onClick={() => handleExpense(booking.id)}
                        ml={'2'}
                        px={2}
                        rounded={'full'}
                      >
                        <Icon as={FaCartPlus} />
                      </Button>
                      <Button
                        title='Realizar checkout'
                        onClick={() => handleCheckOut(booking.id)}
                        ml={'2'}
                        px={2}
                        rounded={'full'}
                      >
                        <Icon as={MdExitToApp} />
                      </Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        label='resereva'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onCancelSubmit}
        cancelRef={cancelRef}
        tipo='cancelar'
      />
      <Alert
        isOpen={isOpenCheckOutModal}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Detalle de Cuenta:
            </AlertDialogHeader>

            <AlertDialogBody>
              {loading ? (
                'loading'
              ) : spents.length > 0 ? (
                <TableContainer>
                  <Table variant='simple' size='sm'>
                    <Thead>
                      <Tr>
                        <Th>Detalle</Th>
                        <Th>Costo</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {spents.map(spent => (
                        <Tr key={spent.id}>
                          <Td>{spent.description}</Td>
                          <Td>${spent.amount}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Total</Th>
                        <Th>
                          ${spents.reduce((a, b) => a + Number(b.amount), 0)}
                        </Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              ) : (
                'No hay gastos cargados en esta cuenta'
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseCheckOutModal}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={onCheckOutSubmit} ml={3}>
                Realizar checkout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </Alert>
      <Alert
        isOpen={isOpenExpensesModal}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Agregar gasto a la cuenta:
            </AlertDialogHeader>
            <Formik
              initialValues={{
                bookingId: bookingId as number,
                description: '',
                amount: '',
              }}
              validationSchema={CreateSpentSchema}
              onSubmit={(values, actions) => {
                const spent = {
                  amount: Number(values.amount),
                  bookingId: Number(values.bookingId),
                  description: values.description,
                };
                handleCreateSpent(spent, actions);
              }}
            >
              {props => (
                <Form>
                  <AlertDialogBody>
                    <Field name='description'>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={
                            form.errors.description && form.touched.description
                          }
                          mb={'5'}
                        >
                          <Textarea
                            {...field}
                            id='description'
                            placeholder='Detalle de gasto'
                            mb={'0'}
                          />
                          <FormErrorMessage>
                            {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='amount'>
                      {({ field, form }: any) => (
                        <FormControl
                          isInvalid={form.errors.amount && form.touched.amount}
                          mb={'0'}
                        >
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents='none'
                              color='gray.300'
                              fontSize='1.2em'
                            >
                              $
                            </InputLeftElement>
                            <Input
                              placeholder='Ingresar monto'
                              {...field}
                              id='amount'
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.amount}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      variant='link'
                      ref={cancelRef}
                      onClick={onCloseExpensesModal}
                    >
                      Cancelar
                    </Button>
                    <Button isLoading={props.isSubmitting} type='submit' ml={3}>
                      Agregar gasto
                    </Button>
                  </AlertDialogFooter>
                </Form>
              )}
            </Formik>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </Alert>
    </>
  );
};

export default Bookings;
