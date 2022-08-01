import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';
import { FiTrash2 } from 'react-icons/fi';
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  IconButton,
} from '@chakra-ui/react';

interface Props {
  patientId: number;
  patientName?: string;
}

export const DeletePatient: React.FC<Props> = ({ patientId, patientName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef<any>();
  const toast = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const deletePatient = () => {
    setLoading(true);

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
        onClose();
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
        setLoading(false);
      });
  };

  return (
    <>
      <IconButton
        aria-label='delete'
        variant='ghost'
        colorScheme='red'
        icon={<FiTrash2 className='text-lg' />}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {patientName}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={deletePatient}
                ml={3}
                isLoading={loading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
