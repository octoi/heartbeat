import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Patient, PatientData } from '../../utils/types';
import { Header } from './header';
import { Patients } from './patients';
import { useToast } from '@chakra-ui/react';
import { getId } from '../../utils/getId';

export const HomePageContent: React.FC = () => {
  const toast = useToast();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    invoke('read_patients')
      .then((data: any) => {
        setPatients(data.reverse());
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Try again, or report this to HeartBeat',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Patients
        loading={loading}
        patients={patients.filter((patient) => {
          // patient.data.toLowerCase().includes(searchQuery)
          const patientData: PatientData = JSON.parse(patient.data);
          return (
            patientData.bioData?.name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            getId(patientData.createdAt || 0) === searchQuery.trim()
          );
        })}
      />
    </section>
  );
};
