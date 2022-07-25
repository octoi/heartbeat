import React from 'react';
import { RiEyeLine } from 'react-icons/ri';
import { PreviewContent } from '../preview';
import { PatientBioData, PatientRecord } from '../../../utils/types';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  patientCreatedAt: number;
  patientBioData: PatientBioData;
  patientRecord: PatientRecord;
  useButton?: boolean;
}

export const PreviewButton: React.FC<Props> = ({
  patientCreatedAt,
  patientBioData,
  patientRecord,
  useButton,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {useButton ? (
        <Button colorScheme='teal' onClick={onOpen}>
          Preview
        </Button>
      ) : (
        <IconButton
          aria-label='preview'
          variant='ghost'
          colorScheme='teal'
          icon={<RiEyeLine className='text-xl' />}
          onClick={onOpen}
        />
      )}
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className='mt-5' />
            <PreviewContent
              patientCreatedAt={patientCreatedAt}
              patientBioData={patientBioData}
              patientRecord={patientRecord}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
