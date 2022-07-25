import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { invoke } from '@tauri-apps/api/tauri';
import { PatientData, SetState } from '../../../utils/types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

interface Props {
  patientId: number;
  patientData: PatientData;
  setPatientData: SetState<PatientData>;
  currentRecordCreatedAt: number;
}

export const DeleteRecord: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
  currentRecordCreatedAt,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const cancelRef = React.useRef<any>();

  const [loading, setLoading] = useState(false);

  const deleteRecord = () => {
    setLoading(true);

    let patientRecords = (patientData.records || []).filter(
      (record) => record.createdAt !== currentRecordCreatedAt
    );

    let patientNewData: PatientData = {
      ...patientData,
      records: patientRecords,
      updatedAt: Date.now(),
    };

    invoke('update_patient', {
      id: patientId,
      data: JSON.stringify(patientNewData),
    })
      .then(() => {
        toast({
          title: 'Deleted patient record successfully',
          description: 'Latest changes in database',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });

        setPatientData(patientNewData);
        onClose();
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
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Are you sure ?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={deleteRecord}
                isLoading={loading}
                ml={3}
              >
                Delete record
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
