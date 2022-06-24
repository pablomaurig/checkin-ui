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
import { NavLink, useNavigate } from 'react-router-dom';
import { Room } from '../../../types/rooms.types';
import { createRoom } from '../../../services/rooms.service';
import { useContext } from 'react';
import { AuthContext } from '../../../context/Auth.context';

const CreateRoomSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, 'Supera el máximo de 100 caracteres')
    .required('Este campo es requerido'),
  description: Yup.string()
  .max(100, 'Supera el máximo de 100 caracteres')
  .required('Este campo es requerido'),
  singleBeds: Yup.number().required('Este campo es requerido'),
  doubleBeds: Yup.number().required('Este campo es requerido'),
  floor: Yup.number().required('Este campo es requerido'),
});

const RoomsCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCreateRoom = async (room: Room, actions: any) => {
    if (user) {
      try {
        const response = await createRoom(room, user.token);

        if (response.status === 200) {
          navigate(-1);
          toast({
            title: 'Habitación creada con éxito',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Hubo un problema al crear la habitación',
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
        name: '',
        description: '',
        singleBeds: '',
        doubleBeds: '',
        floor: '',
      }}
      validationSchema={CreateRoomSchema}
      onSubmit={(values, actions) => {
        handleCreateRoom(values, actions);
      }}
    >
      {props => (
        <Form>
          <PageTitle label='Crear habitación' />
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
                <Input {...field} id='floor' />
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
            <Button isLoading={props.isSubmitting} type='submit' bg='purple.200' color= 'purple.700' border='1px' borderColor = 'purple.500'
              _hover={{
                bg: 'purple.400',
              }}>
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

export default RoomsCreate;
