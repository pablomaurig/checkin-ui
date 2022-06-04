import { Formik, Form, Field } from 'formik';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import PageTitle from '../../../components/PageTitle';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Room } from '../../../types/rooms.types';
import { updateRoom } from '../../../services/rooms.service';
import { useContext } from 'react';
import { AuthContext } from '../../../context/Auth.context';

const EditRoomSchema = Yup.object().shape({
  name: Yup.string().required('Este campo es requerido'),
  description: Yup.string().required('Este campo es requerido'),
  singleBeds: Yup.number().required('Este campo es requerido'),
  doubleBeds: Yup.number().required('Este campo es requerido'),
  floor: Yup.number().required('Este campo es requerido'),
});

type RoomState = {
  room: {
    id: number;
    name: string;
    description: string;
    singleBeds: string;
    doubleBeds: string;
    floor: string;
  };
};

const RoomsEdit = () => {
  const location = useLocation();
  const toast = useToast();
  const navigate = useNavigate();
  const { room } = location.state as RoomState;
  const { user } = useContext(AuthContext);

  const handleEditRoom = async (roomValue: Partial<Room>, actions: any) => {
    if (user) {
      try {
        const response = await updateRoom(room.id, roomValue, user.token);

        if (response.status === 200) {
          navigate(-1);
          toast({
            title: 'Habitación editada con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Hubo un problema al editar la habitación',
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
  };

  return (
    <Formik
      initialValues={{
        name: room.name,
        description: room.description,
        singleBeds: room.singleBeds,
        doubleBeds: room.doubleBeds,
        floor: room.floor,
      }}
      validationSchema={EditRoomSchema}
      onSubmit={(values, actions) => {
        handleEditRoom(values, actions);
      }}
    >
      {props => (
        <Form>
          <PageTitle label='Detalle de habitación' />
          <Field name='name'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.name && form.touched.name}
                mb={'5'}
              >
                <FormLabel htmlFor='name'>Nombre de habitación</FormLabel>
                <Input {...field} id='name' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='description'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
                mb={'5'}
              >
                <FormLabel htmlFor='description'>Descripción</FormLabel>
                <Input {...field} id='description' />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='floor'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.floor && form.touched.floor}
                mb={'5'}
              >
                <FormLabel htmlFor='floor'>Piso</FormLabel>
                <Input {...field} id='floor' placeholder='floor' />
                <FormErrorMessage>{form.errors.floor}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='singleBeds'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.singleBeds && form.touched.singleBeds}
                mb={'5'}
              >
                <FormLabel htmlFor='singleBeds'>Camas simples</FormLabel>
                <Input {...field} id='singleBeds' />
                <FormErrorMessage>{form.errors.singleBeds}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='doubleBeds'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.doubleBeds && form.touched.doubleBeds}
                mb={'5'}
              >
                <FormLabel htmlFor='doubleBeds'>Camas dobles</FormLabel>
                <Input {...field} id='doubleBeds' />
                <FormErrorMessage>{form.errors.doubleBeds}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <ButtonGroup mt={4} alignItems={'center'}>
            <Button isLoading={props.isSubmitting} type='submit'>
              Submit
            </Button>
            <Link as={NavLink} to={'../habitaciones'}>
              Cancelar
            </Link>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default RoomsEdit;
