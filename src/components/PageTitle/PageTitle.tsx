import { Text } from '@chakra-ui/react';

interface PageTitleType {
  label: string;
}

const PageTitle = ({ label }: PageTitleType) => (
  <Text
    fontSize={{ base: '16px', lg: '18px' }}
    fontWeight={'400'}
    textTransform={'uppercase'}
    mb={'4'}
  >
    {label}
  </Text>
);

export default PageTitle;
