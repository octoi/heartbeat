import React from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';
import { SetState } from '../../../utils/types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

interface Props {
  disabled: boolean;
  isLoading: boolean;
  setDeleteLoading: SetState<boolean>;
  patientId: number;
  patientName: string;
}

export const DeleteButton: React.FC<Props> = ({
  disabled,
  isLoading,
  setDeleteLoading,
  patientId,
  patientName,
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef() as React.MutableRefObject<any>;

  const deletePatient = () => {
    setDeleteLoading(true);

    invoke('delete_patient', {
      id: patientId,
    })
      .then(() => {
        toast({
          title: `Say bye to ${patientName}`,
          description: 'Deleted patient data successfully',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });
        navigate('/', { replace: true });
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Please try again or report this as bug',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
        });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  return (
    <>
      <Button
        colorScheme='red'
        size='md'
        disabled={disabled}
        isLoading={isLoading}
        onClick={onOpen}
      >
        Delete Patient
      </Button>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Are you sure ?
            </AlertDialogHeader>

            <AlertDialogBody>You cant recover this data again.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deletePatient} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
