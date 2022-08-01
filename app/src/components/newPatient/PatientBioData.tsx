import React, { useState } from 'react';
import { Button, Select, SimpleGrid, useToast } from '@chakra-ui/react';
import { PatientBioData, PatientData } from '../../utils/types';
import { TextInput } from '../common/TextInput';
import { invoke } from '@tauri-apps/api/tauri';
import { useNavigate } from 'react-router-dom';

interface Props {
  patientBioData?: PatientBioData;
}

export const PatientBioDataForm: React.FC<Props> = ({ patientBioData }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('Male');
  const [address, setAddres] = useState('');
  const [loading, setLoading] = useState(false);

  const createPatient = () => {
    setLoading(true);

    let patientData: PatientData = {
      bioData: {
        name,
        age,
        sex,
        address,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    invoke('create_patient', {
      data: JSON.stringify(patientData),
    })
      .then(() => {
        navigate('/', { replace: true });
        toast({
          title: 'Saved patient data successfully',
          description: `${name} is in your list now :)`,
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
        });
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
    <div>
      <SimpleGrid mt={5} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <TextInput title='Name' value={name} setValue={setName} />
        <TextInput title='Age' value={age} setValue={setAge} />
        <div>
          <h2 className='mb-2 text-md'>Gender</h2>
          <Select
            variant='filled'
            value={sex}
            defaultValue={sex}
            onChange={(e) => setSex(e.target.value)}
            disabled={loading}
          >
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Other'>Other</option>
          </Select>
        </div>
      </SimpleGrid>
      <TextInput
        title='Address'
        value={address}
        setValue={setAddres}
        className='mt-5'
        textArea
      />
      <Button
        size='md'
        mt={5}
        w='full'
        colorScheme='teal'
        disabled={name.trim().length == 0}
        isLoading={loading}
        onClick={createPatient}
      >
        Create Patient
      </Button>
    </div>
  );
};
