import {
    Button,
    Flex,
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
  
  const EMPLEADOS = [
    {
        id: 6,
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'juan.robi@gmail.com',
        role: 'employee',
        createdAt: '2022-05-04T23:59:45.198Z',
        updatedAt: '2022-05-04T23:59:45.198Z',
    },
    {
        id: 5,
        firstName: 'Ana',
        lastName: 'Gomez',
        email: 'ana.gomez@gmail.com',
        role: 'employee',
        createdAt: '2022-05-02T23:59:45.198Z',
        updatedAt: '2022-05-02T23:59:45.198Z',
    },
    {
        id: 4,
        firstName: 'Pedro',
        lastName: 'Rodriguez',
        email: 'pedro.rodriguez@gmail.com',
        role: 'employee',
        createdAt: '2022-05-01T23:59:45.198Z',
        updatedAt: '2022-05-01T23:59:45.198Z',
    },
  ];
  
  const Employees = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deteletId, setDeleteId] = useState<number | null>(null);
    const cancelRef = React.useRef<HTMLButtonElement>(null);
  
    const handleDelete = (id: number) => {
      onOpen();
      setDeleteId(id);
    };
  
    const onDeleteSubmit = () => {
      console.log('Eliminando empleado con id: ', deteletId);
      onClose();
    };
  
    return (
      <>
      <Flex justifyContent={'space-between'} mb={'4'}>
        <PageTitle label='Empleados' />
        <Button as={NavLink} to={'crear'} size='sm'>
          Alta de empleado
        </Button>
      </Flex>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th>Email</Th>
                <Th>Rol</Th>
                <Th>Fecha de Alta</Th>
                <Th>última actualización</Th>
                <Th isNumeric>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {EMPLEADOS.map(employee => (
                <Tr key={employee.id}>
                  <Td>{employee.firstName}</Td>
                  <Td>{employee.lastName}</Td>
                  <Td>{employee.email}</Td>
                  <Td>{employee.role}</Td>
                  <Td>{employee.createdAt}</Td>
                  <Td>{employee.updatedAt}</Td>
                  <Td isNumeric>
                    <Button
                      onClick={() => handleDelete(employee.id)}
                      px={2}
                      rounded={'full'}
                    >
                      <Icon as={MdDelete} />
                    </Button>
                    <Button 
                      as={NavLink} 
                      to={`${employee.id}`}
                      state={{ employee: employee }}
                      ml={'2'} 
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
          label='empleado'
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onDeleteSubmit}
          cancelRef={cancelRef}
        />
      </>
    );
  };

export default Employees;
