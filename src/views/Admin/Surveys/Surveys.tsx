import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import PageTitle from '../../../components/PageTitle';

const ENCUESTAS = [
  {
    id: 1,
    name: 'Carlos',
    lastName: 'Gonzalez',
    surv1: 4,
    surv2: 1,
    surv3: 2,
    surv4: 5,
  },
  {
    id: 2,
    name: 'Carlos',
    lastName: 'Gonzalez',
    surv1: 4,
    surv2: 1,
    surv3: 2,
    surv4: 5,
  },
  {
    id: 3,
    name: 'Carlos',
    lastName: 'Gonzalez',
    surv1: 4,
    surv2: 1,
    surv3: 2,
    surv4: 5,
  },
  {
    id: 4,
    name: 'Carlos',
    lastName: 'Gonzalez',
    surv1: 4,
    surv2: 1,
    surv3: 2,
    surv4: 5,
  },
  {
    id: 5,
    name: 'Carlos',
    lastName: 'Gonzalez',
    surv1: 4,
    surv2: 1,
    surv3: 2,
    surv4: 5,
  },
  {
    id: 6,
    name: 'Carlos',
    lastName: 'Gonzalez',
    surv1: 4,
    surv2: 1,
    surv3: 2,
    surv4: 5,
  },
];

const Surveys = () => {
  return (
    <>
      <Flex justifyContent={'space-between'} mb={'4'}>
        <PageTitle label='Encuestas' />
      </Flex>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Encuesta 1</Th>
              <Th>Encuesta 2</Th>
              <Th>Encuesta 3</Th>
              <Th>Encuesta 4</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ENCUESTAS.map(survey => (
              <Tr key={survey.name}>
                <Td>14/05/22</Td>
                <Td>{survey.name}</Td>
                <Td>{survey.lastName}</Td>
                <Td>{survey.surv1}</Td>
                <Td>{survey.surv2}</Td>
                <Td>{survey.surv3}</Td>
                <Td>{survey.surv4}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Surveys;
