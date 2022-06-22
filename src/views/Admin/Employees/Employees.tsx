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
  useToast,
} from '@chakra-ui/react';
import PageTitle from '../../../components/PageTitle';
import { MdDelete, MdOutlineListAlt } from 'react-icons/md';
import AlertDialog from '../../../components/AlertDialog/AlertDialog';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/Auth.context';
import {
  deleteEmployee,
  getEmployees,
} from '../../../services/employees.service';
import { Employee } from '../../../types/employees.types';
import { UserRole } from '../../../types/user.types';

const Employees = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const [deteletId, setDeleteId] = useState<number | null>(null);
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const toast = useToast();

  const handleDelete = (id: number) => {
    onOpen();
    setDeleteId(id);
  };

  const fetchEmployees = async () => {
    if (user) {
      const _employees = await getEmployees(user.token);
      setEmployees(_employees);
    }
  };

  useEffect(() => {
    try {
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDeleteEmployee = async () => {
    try {
      if (user && deteletId) {
        const response = await deleteEmployee(deteletId, user.token);
        if (response.status === 200) {
          toast({
            title: 'Empleado eliminado con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          fetchEmployees();
        } else {
          toast({
            title: 'Error al eliminar empleado',
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
    handleDeleteEmployee();
    onClose();
  };

  const translateRole = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'employee':
        return 'Empleado';
      case 'customer':
        return 'Cliente';
      default:
        return 'Rol desconocido';
    }
  };

  return (
    <>
      <Flex justifyContent={'space-between'} mb={'4'}>
        <PageTitle label='Empleados' />
        <Button as={NavLink} to={'crear'} size='sm' title={'Alta de empleado'}>
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
            {employees.map(employee => (
              <Tr key={employee.id}>
                <Td>{employee.firstName}</Td>
                <Td>{employee.lastName}</Td>
                <Td>{employee.email}</Td>
                <Td>{translateRole(employee.role as UserRole)}</Td>
                <Td>
                  {new Date(employee.createdAt as string).toLocaleDateString(
                    'es-AR'
                  )}
                </Td>
                <Td>
                  {new Date(employee.updatedAt as string).toLocaleDateString(
                    'es-AR'
                  )}
                </Td>
                <Td isNumeric>
                  <Button
                    onClick={() => handleDelete(employee.id as number)}
                    px={2}
                    rounded={'full'}
                    title={'Eliminar'}
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
                    title={'Ver detalles'}
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
