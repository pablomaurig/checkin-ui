import { Formik, Form, Field } from 'formik';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import PageTitle from '../../../components/PageTitle';
import { NavLink } from 'react-router-dom';

const CreateRoomSchema = Yup.object().shape({
  name: Yup.string().required('Este campo es requerido'),
  description: Yup.string().required('Este campo es requerido'),
  singleBed: Yup.number().required('Este campo es requerido'),
  doubleBed: Yup.number().required('Este campo es requerido'),
  floor: Yup.number().required('Este campo es requerido'),
});

const RoomsCreate = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        singleBed: '',
        doubleBed: '',
        floor: '',
      }}
      validationSchema={CreateRoomSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
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
                <Input {...field} id='floor' placeholder='floor' />
                <FormErrorMessage>{form.errors.floor}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='singleBed'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.singleBed && form.touched.singleBed}
                mb={'5'}
              >
                <FormLabel htmlFor='singleBed'>Camas simples</FormLabel>
                <Input {...field} id='singleBed' />
                <FormErrorMessage>{form.errors.singleBed}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='doubleBed'>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.doubleBed && form.touched.doubleBed}
                mb={'5'}
              >
                <FormLabel htmlFor='doubleBed'>Camas dobles</FormLabel>
                <Input {...field} id='doubleBed' />
                <FormErrorMessage>{form.errors.doubleBed}</FormErrorMessage>
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

export default RoomsCreate;
