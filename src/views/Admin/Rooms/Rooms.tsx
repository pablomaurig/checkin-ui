import {
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
} from '@chakra-ui/react';
import PageTitle from '../../../components/PageTitle';
import { MdDelete, MdOutlineListAlt } from 'react-icons/md';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const HABITACIONES = [
  {
    id: 1,
    name: '100',
    floor: '1',
    sigleBeds: 1,
    doubleBeds: 2,
  },
  {
    id: 2,
    name: '101',
    floor: '1',
    sigleBeds: 1,
    doubleBeds: 2,
  },
  {
    id: 3,
    name: '102',
    floor: '1',
    sigleBeds: 1,
    doubleBeds: 2,
  },
  {
    id: 4,
    name: '104',
    floor: '1',
    sigleBeds: 1,
    doubleBeds: 2,
  },
  {
    id: 5,
    name: '201',
    floor: '2',
    sigleBeds: 1,
    doubleBeds: 2,
  },
  {
    id: 6,
    name: '202',
    floor: '2',
    sigleBeds: 1,
    doubleBeds: 2,
  },
];

const Rooms = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deteletId, setDeleteId] = useState<number | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleDelete = (id: number) => {
    onOpen();
    setDeleteId(id);
  };

  const onDeleteSubmit = () => {
    console.log('Eliminando habitación con id: ', deteletId);
    onClose();
  };

  return (
    <>
      <PageTitle label='Habitaciones' />
      <Button as={NavLink} to={'crear'}>
        Crear habitación
      </Button>
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
            {HABITACIONES.map(room => (
              <Tr key={room.name}>
                <Td>{room.name}</Td>
                <Td>{room.floor}</Td>
                <Td>{room.sigleBeds}</Td>
                <Td>{room.doubleBeds}</Td>
                <Td isNumeric>
                  <Button
                    onClick={() => handleDelete(room.id)}
                    px={2}
                    rounded={'full'}
                  >
                    <Icon as={MdDelete} />
                  </Button>
                  <Button ml={'2'} px={2} rounded={'full'}>
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
