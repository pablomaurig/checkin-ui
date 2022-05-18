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
} from '@chakra-ui/react';
import PageTitle from '../../../components/PageTitle';
import { MdCancel, MdExitToApp } from 'react-icons/md';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';

const RESERVAS = [
  {
    id: 1,
    roomId: '100',
    bookingNumber: 'AAB522',
    surname: 'Perez',
    startDate: '2022-05-03',
    endDate: '2022-05-03',
    amountGuests: 3,
    checkIn: null,
    checkOut: null,
    state: 'CheckIn Pending',
    enable: 'true',
    createdAt: '2022-05-03',
    updatedAt: '2022-05-03',
  },
  {
    id: 2,
    roomId: '300',
    bookingNumber: 'AAB529',
    surname: 'Rodriguez',
    startDate: '2022-05-03',
    endDate: '2022-05-03',
    amountGuests: 2,
    checkIn: null,
    checkOut: null,
    state: 'CheckIn Pending',
    enable: 'true',
    createdAt: '2022-05-03',
    updatedAt: '2022-05-03',
  },
  {
    id: 3,
    roomId: '250',
    bookingNumber: 'AAB532',
    surname: 'Gomez',
    startDate: '2022-05-03',
    endDate: '2022-05-03',
    amountGuests: 5,
    checkIn: null,
    checkOut: null,
    state: 'CheckIn Pending',
    enable: 'true',
    createdAt: '2022-05-03',
    updatedAt: '2022-05-03',
  },
];

const Bookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookingId, setBookingId] = useState<number | null>(null);
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
    console.log('Cancelando reserva con id: ', bookingId);
    onClose();
  };

  const handleCheckOut = (id: number) => {
    onOpenCheckOutModal();
    setBookingId(id);
  };

  const handleExpense = (id: number) => {
    onOpenExpensesModal();
    setBookingId(id);
  };

  const onCheckOutSubmit = () => {
    // Realizar Pago
    onCloseCheckOutModal();
  };

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
              <Th> Cantidad de huéspedes </Th>
              <Th> Estado </Th>
              <Th isNumeric>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {RESERVAS.map(booking => (
              <Tr key={booking.id}>
                <Td>{booking.bookingNumber}</Td>
                <Td>{booking.surname}</Td>
                <Td>
                  <Select placeholder={booking.roomId} size='sm'>
                    <option value='option1'>101</option>
                    <option value='option1'>102</option>
                    <option value='option1'>103</option>
                    <option value='option2'>201</option>
                    <option value='option2'>202</option>
                    <option value='option2'>203</option>
                    <option value='option3'>301</option>
                    <option value='option3'>302</option>
                    <option value='option3'>303</option>
                  </Select>
                </Td>
                <Td>{booking.startDate}</Td>
                <Td>{booking.endDate}</Td>
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
              <TableContainer>
                <Table variant='simple' size='sm'>
                  <Thead>
                    <Tr>
                      <Th>Detalle</Th>
                      <Th>Costo</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Restaurant</Td>
                      <Td>$4280</Td>
                    </Tr>
                    <Tr>
                      <Td>Spa</Td>
                      <Td>$2500</Td>
                    </Tr>
                    <Tr>
                      <Td>Frigobar</Td>
                      <Td>$1890</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Total</Th>
                      <Th>$8670</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseCheckOutModal}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={onCheckOutSubmit} ml={3}>
                Confirmar pago
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

            <AlertDialogBody>
              <Textarea placeholder='Detalle de gasto' mb={'5'} />
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                >
                  $
                </InputLeftElement>
                <Input placeholder='Ingresar monto' />
              </InputGroup>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant='link'
                ref={cancelRef}
                onClick={onCloseExpensesModal}
              >
                Cancelar
              </Button>
              <Button onClick={onCloseExpensesModal} ml={3}>
                Agregar gasto
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </Alert>
    </>
  );
};

export default Bookings;
