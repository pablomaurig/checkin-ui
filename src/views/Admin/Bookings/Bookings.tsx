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
} from '@chakra-ui/react';
import PageTitle from '../../../components/PageTitle';
import { MdCancel, MdExitToApp } from 'react-icons/md';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
    onClose: onCloseCheckOutModal 
} = useDisclosure()

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
                  <Select placeholder='Select option' size='sm'>
                    <option value='option1'> {booking.roomId} </option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                </Td>
                <Td>{booking.startDate}</Td>
                <Td>{booking.endDate}</Td>
                <Td>{booking.amountGuests}</Td>
                <Td>{booking.state} </Td>
                <Td isNumeric>
                  <Button
                    onClick={() => handleCancel(booking.id)}
                    px={2}
                    rounded={'full'}
                  >
                    <Icon as={MdCancel} />
                  </Button>
                  <Button
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
      <Alert isOpen={isOpenCheckOutModal} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Detalle de Cuenta:
            </AlertDialogHeader>

            <AlertDialogBody>
              Restaurant---------------------- $4280 <br />
              Spa----------------------------- $2500 <br />
              Frigobar------------------------ $1890 <br />
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
    </>
  );
};

export default Bookings;
