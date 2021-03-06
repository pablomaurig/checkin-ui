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
  Box,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdLogout, MdHotel, MdDateRange, MdTrendingUp, MdSettings, MdOutlineBedroomParent, MdPersonOutline } from 'react-icons/md';
import { AiOutlineForm } from 'react-icons/ai';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth.context';
import HasPermission from '../Auth/HasPermission';
import { Permissions } from '../../types/user.types';
import InstallPWA from '../InstallPWA';

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
            VisitAR
          </Link>
        </DrawerHeader>
        <DrawerBody px={'0'}>

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
                Informaci??n del hotel
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
                Check-In
              </Flex>
            </Link>
          </HasPermission>
          <HasPermission
            requiredPermissions={[Permissions.employee, Permissions.admin]}
          >
            <Box>
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
                  <Icon as={MdDateRange} mr='4' fontSize='18' />
                  Reservas
                </Flex>
              </Link>
            </Box>
          </HasPermission>

          <HasPermission
            requiredPermissions={[Permissions.employee, Permissions.admin]}
          >
            <Box>
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
                  <Icon as={MdTrendingUp} mr='4' fontSize='18' />
                  Encuestas de Satisfacci??n
                </Flex>
              </Link>
            </Box>
          </HasPermission>

          <HasPermission
            requiredPermissions={[Permissions.employee, Permissions.admin]}
          >
            <Box paddingTop={2}>
              <Flex
                align='center'
                px={'5'}
                py='1'
                mx='0'
                borderRadius='lg'
                role='group'
                cursor='pointer'
                fontWeight='300'
              >
                <Icon as={MdSettings} mr='4' fontSize='18' />
                Configuraciones generales
              </Flex>
              <Box paddingLeft={10}>
                <HasPermission
                  requiredPermissions={[
                    Permissions.employee,
                    Permissions.admin,
                  ]}
                >
                  <Box>
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
                        <Icon as={MdOutlineBedroomParent} mr='4' fontSize='18' />
                        Habitaciones
                      </Flex>
                    </Link>
                  </Box>
                </HasPermission>

                <HasPermission requiredPermissions={[Permissions.admin]}>
                  <Box>
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
                        <Icon as={MdPersonOutline} mr='4' fontSize='18' />
                        Empleados
                      </Flex>
                    </Link>
                  </Box>
                </HasPermission>

              </Box>
            </Box>
          </HasPermission>

          <InstallPWA />
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
              Cerrar sesi??n
            </Flex>
          </Button>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Nav;
