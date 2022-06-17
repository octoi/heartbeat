import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Patient } from '../../utils/types';
import { Header } from './header';
import { Patients } from './patients';
import { useToast } from '@chakra-ui/react';

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
        patients={patients.filter((patient) =>
          patient.data.toLowerCase().includes(searchQuery)
        )}
      />
    </section>
  );
};
