import React, { useState } from 'react';
import { RecordForm } from './RecordForm';
import { invoke } from '@tauri-apps/api';
import { PatientData, PatientRecord, SetState } from '../../../utils/types';
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
} from '@chakra-ui/react';

interface Props {
  patientData: PatientData;
  setPatientData: SetState<PatientData>;
  patientId: number;
}

export const NewRecordButton: React.FC<Props> = ({
  patientId,
  patientData,
  setPatientData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const btnRef = React.useRef<any>();

  let lastMedicalRecord = patientData?.records
    ? patientData.records.length != 0
      ? patientData.records[0]
      : undefined
    : undefined;

  const [record, setRecord] = useState<PatientRecord>(
    lastMedicalRecord
      ? {
          medicalBioData: {
            height: lastMedicalRecord?.medicalBioData?.height || undefined,
            weight: lastMedicalRecord?.medicalBioData?.weight || undefined,
            bmi: lastMedicalRecord?.medicalBioData?.bmi || undefined,
          },
          examination: {
            systemicExamination: {
              diagnosis:
                lastMedicalRecord?.examination?.systemicExamination?.diagnosis,
            },
          },
        }
      : {}
  );
  const [loading, setLoading] = useState(false);

  const saveRecord = () => {
    let patientRecords = patientData.records || [];

    patientRecords.unshift({
      ...record,
      createdAt: Date.now(),
    });

    let patientUpdatedData: PatientData = {
      ...patientData,
      records: patientRecords,
      updatedAt: Date.now(),
    };

    invoke('update_patient', {
      id: patientId,
      data: JSON.stringify(patientUpdatedData),
    })
      .then(() => {
        toast({
          title: 'Added record successfully',
          description: 'Latest changes in database',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });

        setPatientData(patientUpdatedData);
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
      <Button ml={1} colorScheme='teal' ref={btnRef} onClick={onOpen}>
        New record
      </Button>
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
          <DrawerHeader>Create new record</DrawerHeader>

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
            <Button colorScheme='blue' onClick={saveRecord}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
