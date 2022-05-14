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
  tipo?: string;
}

const AlertDialog = ({
  isOpen,
  onClose,
  cancelRef,
  label,
  onSubmit,
  tipo,
}: AlerDialogType) => {
  return (
    <Alert isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          {tipo === 'cancelar' ? (
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Cancelar {label}
            </AlertDialogHeader>
          ) : (
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Eliminar {label}
            </AlertDialogHeader>
          )}

          <AlertDialogBody>
            Estás seguro? No se podrá deshacer esta acción.
          </AlertDialogBody>

          {tipo === 'cancelar' ? (
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Atrás
              </Button>
              <Button colorScheme='red' onClick={onSubmit} ml={3}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          ) : (
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={onSubmit} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </Alert>
  );
};

export default AlertDialog;
