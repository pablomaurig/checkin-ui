import {
  AlertDialog as Alert,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogHeader,
} from '@chakra-ui/react';
import React, { MouseEventHandler } from 'react';

interface AlerDialogType {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;
  label: string;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
}

const AlertDialog = ({
  isOpen,
  onClose,
  cancelRef,
  label,
  onSubmit,
}: AlerDialogType) => {
  return (
    <Alert isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Eliminar {label}
          </AlertDialogHeader>

          <AlertDialogBody>
            Estás seguro? No se podrá deshacer esta acción.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='red' onClick={onSubmit} ml={3}>
              Eliminar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </Alert>
  );
};

export default AlertDialog;
