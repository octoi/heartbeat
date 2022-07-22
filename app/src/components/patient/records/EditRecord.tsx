import React, { useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { PatientData, PatientRecord, SetState } from '../../../utils/types';
import { RecordForm } from './RecordForm';
import { invoke } from '@tauri-apps/api/tauri';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

interface Props {
  patientId: number;
  patientData: PatientData;
  setPatientData: SetState<PatientData>;
  record: PatientRecord;
}

export const EditRecord: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
  record: currentRecord,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const btnRef = React.useRef<any>();

  const [record, setRecord] = useState<PatientRecord>(currentRecord);
  const [loading, setLoading] = useState(false);

  const editRecord = () => {
    setLoading(true);

    let patientRecords = (patientData.records || []).map((patientRecord) => {
      if (patientRecord.createdAt == record.createdAt) {
        return record;
      }

      return patientRecord;
    });

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
          title: 'Edited patient record successfully',
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
        aria-label='edit'
        variant='ghost'
        colorScheme='blue'
        icon={<TbEdit className='text-xl' />}
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        placement='right'
        size='full'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit record</DrawerHeader>

          <DrawerBody>
            <RecordForm
              patientRecord={record}
              setPatientRecord={setRecord}
              loading={loading}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={editRecord}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
