import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Patient, PatientData } from '../../utils/types';
import { useToast } from '@chakra-ui/react';
import { invoke } from '@tauri-apps/api/tauri';
import { Patients } from './Patients';

export const HomePageContent: React.FC = () => {
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    invoke('read_patients')
      .then((rawData: any) => {
        var data: Patient[] = rawData;

        setPatients(
          data.sort(function (a, b) {
            let aParsed: PatientData = JSON.parse(a.data);
            let bParsed: PatientData = JSON.parse(b.data);

            let aDate =
              (aParsed.records != undefined
                ? aParsed.records[0].createdAt
                : aParsed.createdAt) || 1;

            let bDate =
              (bParsed.records != undefined
                ? bParsed.records[0].createdAt
                : bParsed.createdAt) || 2;

            return bDate - aDate;
          })
        );
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
          let patientData: PatientData = JSON.parse(patient.data);
          return (
            patientData.bioData?.name
              ?.toLowerCase()
              .trim()
              .includes(searchQuery.toLowerCase().trim()) ||
            patient.id.toString() === searchQuery.trim()
          );
        })}
      />
    </section>
  );
};
