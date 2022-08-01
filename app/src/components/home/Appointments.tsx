import React from 'react';
import moment from 'moment';
import { BsCalendar3 } from 'react-icons/bs';
import { Patient, PatientData } from '../../utils/types';
import { Link } from 'react-router-dom';
import { Paths } from '../../utils/paths';
import { TiFolderOpen } from 'react-icons/ti';
import {
  Avatar,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  appointedPatients: Patient[];
}

export const Appointments: React.FC<Props> = ({ appointedPatients }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filterPatients = (isTomorrow?: boolean) => {
    return appointedPatients.filter((patient) => {
      let patientData: PatientData = JSON.parse(patient.data);
      let nextAppointment =
        patientData.records &&
        patientData.records?.length > 0 &&
        patientData.records[0].nextAppointment
          ? patientData.records[0].nextAppointment
          : null;

      let check = isTomorrow
        ? moment(nextAppointment).isSame(moment().add(1, 'day'), 'day')
        : moment(nextAppointment).isSame(moment(), 'day');

      if (nextAppointment && check) {
        return patient;
      }
    });
  };

  const todaysAppointment = filterPatients();
  const tomorrowsAppointment = filterPatients(true);

  return (
    <>
      <IconButton
        aria-label='Appointed patients'
        icon={<BsCalendar3 />}
        onClick={onOpen}
        mr={2}
        colorScheme={appointedPatients.length == 0 ? 'gray' : 'blue'}
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Appointed patients</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Today ({todaysAppointment.length})</Tab>
                <Tab>Tomorrow ({tomorrowsAppointment.length})</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <DisplayPatients patients={todaysAppointment} />
                </TabPanel>
                <TabPanel>
                  <DisplayPatients patients={tomorrowsAppointment} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface DisplayPatientsProps {
  patients: Patient[];
}

const DisplayPatients: React.FC<DisplayPatientsProps> = ({ patients }) => {
  return (
    <>
      {patients.length == 0 && <p>No patients</p>}
      {patients.map((patient, idx) => {
        let patientData: PatientData = JSON.parse(patient.data);

        return (
          <Flex mt={2} alignItems='center' justifyContent='space-between'>
            <Flex alignItems='center'>
              <Avatar size='sm' name={patientData.bioData?.name || ''} />
              <Text ml={2}>{patientData.bioData?.name}</Text>
            </Flex>
            <Link to={`${Paths.Patient}/${patient.id}`}>
              <IconButton
                aria-label='View patient'
                variant='ghost'
                colorScheme='teal'
                icon={<TiFolderOpen className='text-xl' />}
              />
            </Link>
          </Flex>
        );
      })}
    </>
  );
};
