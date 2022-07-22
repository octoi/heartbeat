import React from 'react';
import { RiEyeLine } from 'react-icons/ri';
import { PreviewContent } from '../preview';
import { PatientBioData, PatientRecord } from '../../../utils/types';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  patientCreatedAt: number;
  patientBioData: PatientBioData;
  patientRecord: PatientRecord;
}

export const PreviewButton: React.FC<Props> = ({
  patientCreatedAt,
  patientBioData,
  patientRecord,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef<any>();

  return (
    <>
      <IconButton
        aria-label='preview'
        variant='ghost'
        colorScheme='teal'
        icon={<RiEyeLine className='text-xl' />}
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
          <DrawerBody>
            <div className='mt-5' />
            <PreviewContent
              patientCreatedAt={patientCreatedAt}
              patientBioData={patientBioData}
              patientRecord={patientRecord}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
