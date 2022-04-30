import {
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Link,
  Flex,
  Icon,
  Button,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdLogout, MdHotel } from 'react-icons/md';
import { AiOutlineForm } from 'react-icons/ai';
import { RiSettings5Fill } from 'react-icons/ri';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth.context';
import HasPermission from '../Auth/HasPermission';
import { Permissions } from '../../types/user.types';

const Nav = ({ isOpen, onClose }: any) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeDrawer = () => {
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleLogout = () => {
    closeDrawer();
    logout();
    navigate('/');
  };

  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Link
            as={NavLink}
            to='/'
            onClick={closeDrawer}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            Logo
          </Link>
        </DrawerHeader>
        <DrawerBody px={'0'}>
          <HasPermission requiredPermissions={[Permissions.customer]}>
            <Link
              as={NavLink}
              to='/configuracion'
              onClick={closeDrawer}
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align='center'
                px={'5'}
                py='1'
                mx='0'
                borderRadius='lg'
                role='group'
                cursor='pointer'
              >
                <Icon as={RiSettings5Fill} mr='4' fontSize='16' />
                Configuración
              </Flex>
            </Link>
          </HasPermission>
          <HasPermission requiredPermissions={[Permissions.customer]}>
            <Link
              as={NavLink}
              to='/informacion-del-hotel'
              onClick={closeDrawer}
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align='center'
                px={'5'}
                py='1'
                mx='0'
                borderRadius='lg'
                role='group'
                cursor='pointer'
              >
                <Icon as={MdHotel} mr='4' fontSize='16' />
                Información del hotel
              </Flex>
            </Link>
          </HasPermission>
          <HasPermission requiredPermissions={[Permissions.customer]}>
            <Link
              as={NavLink}
              to='/checkin'
              onClick={closeDrawer}
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align='center'
                px={'5'}
                py='1'
                mx='0'
                borderRadius='lg'
                role='group'
                cursor='pointer'
              >
                <Icon as={AiOutlineForm} mr='4' fontSize='16' />
                Realizar checkin
              </Flex>
            </Link>
          </HasPermission>
          <HasPermission
            requiredPermissions={[Permissions.employee, Permissions.admin]}
          >
            <Link
              as={NavLink}
              to='/admin/reservas'
              onClick={closeDrawer}
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align='center'
                px={'5'}
                py='1'
                mx='0'
                borderRadius='lg'
                role='group'
                cursor='pointer'
              >
                <Icon as={AiOutlineForm} mr='4' fontSize='16' />
                Reservas
              </Flex>
            </Link>
          </HasPermission>
          <HasPermission
            requiredPermissions={[Permissions.employee, Permissions.admin]}
          >
            <Link
              as={NavLink}
              to='/admin/habitaciones'
              onClick={closeDrawer}
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align='center'
                px={'5'}
                py='1'
                mx='0'
                borderRadius='lg'
                role='group'
                cursor='pointer'
              >
                <Icon as={AiOutlineForm} mr='4' fontSize='16' />
                Habitaciones
              </Flex>
            </Link>
          </HasPermission>
          <HasPermission
            requiredPermissions={[Permissions.employee, Permissions.admin]}
          >
            <Link
              as={NavLink}
              to='/admin/encuestas'
              onClick={closeDrawer}
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align='center'
                px={'5'}
                py='1'
                mx='0'
                borderRadius='lg'
                role='group'
                cursor='pointer'
              >
                <Icon as={AiOutlineForm} mr='4' fontSize='16' />
                Encuestas
              </Flex>
            </Link>
          </HasPermission>
          <HasPermission requiredPermissions={[Permissions.admin]}>
            <Link
              as={NavLink}
              to='/admin/empleados'
              onClick={closeDrawer}
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Flex
                align='center'
                px={'5'}
                py='1'
                mx='0'
                borderRadius='lg'
                role='group'
                cursor='pointer'
              >
                <Icon as={AiOutlineForm} mr='4' fontSize='16' />
                Empleados
              </Flex>
            </Link>
          </HasPermission>
          <Divider my={'3'} />
          <Button
            variant='link'
            onClick={handleLogout}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            <Flex
              align='center'
              px={'5'}
              py='1'
              mx='0'
              borderRadius='lg'
              role='group'
              cursor='pointer'
            >
              <Icon as={MdLogout} mr='4' fontSize='16' />
              Cerrar sesión
            </Flex>
          </Button>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Nav;
