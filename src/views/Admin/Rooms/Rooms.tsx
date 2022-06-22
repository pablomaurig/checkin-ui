import {
  Button,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Select,
  useToast,
} from '@chakra-ui/react';
import PageTitle from '../../../components/PageTitle';
import { MdDelete, MdOutlineListAlt } from 'react-icons/md';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getRooms, deleteRoom } from '../../../services/rooms.service';
import { AuthContext } from '../../../context/Auth.context';
import { Room } from '../../../types/rooms.types';

const Rooms = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const [deteletId, setDeleteId] = useState<number | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'available':
        setFilteredRooms(rooms.filter(room => room.bookingId === null));
        break;
      case 'unavailable':
        setFilteredRooms(rooms.filter(room => room.bookingId !== null));
        break;

      default:
        setFilteredRooms(rooms);
        break;
    }
  };

  const setHabitaciones = async () => {
    if (user) {
      const habitaciones = await getRooms(user.token);
      setRooms(habitaciones);
      setFilteredRooms(habitaciones);
    }
  };

  useEffect(() => {
    try {
      setHabitaciones();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDelete = (id: number) => {
    onOpen();
    setDeleteId(id);
  };

  const handleDeleteRoom = async () => {
    try {
      if (user && deteletId) {
        const response = await deleteRoom(deteletId, user.token);
        if (response.status === 200) {
          toast({
            title: 'Habitación eliminada con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          setHabitaciones();
        } else {
          toast({
            title: 'Error al eliminar habitación',
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

  const onDeleteSubmit = () => {
    handleDeleteRoom();
    onClose();
  };

  return (
    <>
      <Flex justifyContent={'space-between'} mb={'4'}>
        <PageTitle label='Habitaciones' />
        <Button as={NavLink} to={'crear'} size='sm'>
          Crear habitación
        </Button>
      </Flex>
      <Flex justifyContent={'flex-end'} alignItems={'center'} mb={'4'}>
        <Text mr='5' as='label'>
          Filtrar habitaciones
        </Text>
        <Select maxW={'200'} onChange={handleFilter}>
          <option value='all'>Todas</option>
          <option value='unavailable'>Ocupadas</option>
          <option value='available'>Disponibles</option>
        </Select>
      </Flex>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Numero de Habitación</Th>
              <Th>Piso</Th>
              <Th>Camas simples</Th>
              <Th>Camas dobles</Th>
              <Th isNumeric>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredRooms.map(room => (
              <Tr key={room.id}>
                <Td>{room.name}</Td>
                <Td>{room.floor}</Td>
                <Td>{room.singleBeds}</Td>
                <Td>{room.doubleBeds}</Td>
                <Td isNumeric>
                  <Button
                    onClick={() => handleDelete(room.id as number)}
                    px={2}
                    rounded={'full'}
                  >
                    <Icon as={MdDelete} />
                  </Button>
                  <Button
                    as={NavLink}
                    to={`${room.id}`}
                    state={{ room: room }}
                    px={2}
                    rounded={'full'}
                  >
                    <Icon as={MdOutlineListAlt} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        label='habitación'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onDeleteSubmit}
        cancelRef={cancelRef}
      />
    </>
  );
};

export default Rooms;
