import React, { useState } from 'react';
import { PatientMedicine, SetState } from '../../../utils/types';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { TextInput } from '../../common/TextInput';
import {
  Flex,
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface Props {
  medicines: PatientMedicine[];
  setMedicines: SetState<PatientMedicine[]>;
  loading?: boolean;
}

export const AdviceMedicines: React.FC<Props> = ({
  medicines,
  setMedicines,
  loading,
}) => {
  const [medicineName, setMedicineName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('After food');
  const [duration, setDuration] = useState('');
  const [durationType, setDurationType] = useState('Day');

  const addMedicine = (e: any) => {
    e.preventDefault();

    let medicine_duration = `${duration} ${durationType}${
      Number(duration) != 1 ? 's' : ''
    }`;

    setMedicines([
      ...medicines,
      {
        medicineName,
        frequency,
        time,
        duration: medicine_duration,
      },
    ]);
    setMedicineName('');
    setFrequency('');
    setTime('Before food');
    setDuration('');
    setDurationType('Day');
  };

  const deleteMedicine = (idx: number) => {
    let allMedicines = [...medicines];
    allMedicines.splice(idx, 1);
    setMedicines(allMedicines);
  };

  return (
    <TableContainer mt={5}>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Index</Th>
            <Th>Medicine</Th>
            <Th>Frequency</Th>
            <Th>Time</Th>
            <Th>Duration</Th>
            <Th>Option</Th>
          </Tr>
        </Thead>
        <Tbody>
          <>
            {medicines.map((medicine, idx) => (
              <Tr key={idx}>
                <Td>{idx + 1}</Td>
                <Td>{medicine.medicineName}</Td>
                <Td>{medicine.frequency}</Td>
                <Td>{medicine.time}</Td>
                <Td>{medicine.duration}</Td>
                <Td>
                  <IconButton
                    colorScheme='red'
                    variant='ghost'
                    aria-label='Delete medicine'
                    icon={<FaRegTrashAlt />}
                    onClick={() => deleteMedicine(idx)}
                    disabled={loading}
                  />
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td>{medicines.length + 1}</Td>
              <Td>
                <TextInput
                  disableTitle
                  title='Medicine'
                  value={medicineName}
                  setValue={setMedicineName}
                  disabled={loading}
                />
              </Td>
              <Td>
                <TextInput
                  disableTitle
                  title='Frequency'
                  value={frequency}
                  setValue={setFrequency}
                  disabled={loading}
                />
              </Td>
              <Td>
                <Select
                  variant='filled'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value='Before food'>Before food</option>
                  <option value='Between food'>Between food</option>
                  <option value='After food'>After food</option>
                </Select>
              </Td>
              <Td>
                <Flex alignItems='center' justifyContent='space-around'>
                  <TextInput
                    disableTitle
                    title='Duration'
                    value={duration}
                    setValue={setDuration}
                    disabled={loading}
                  />
                  <Select
                    variant='filled'
                    value={durationType}
                    onChange={(e) => setDurationType(e.target.value)}
                    ml={2}
                    width='38%'
                  >
                    <option value='Day'>D</option>
                    <option value='Week'>W</option>
                    <option value='Month'>M</option>
                  </Select>
                </Flex>
              </Td>
              <Td>
                <IconButton
                  onClick={addMedicine}
                  variant='ghost'
                  aria-label='Add medicine'
                  colorScheme='blue'
                  icon={<FaPlus />}
                  disabled={
                    loading ||
                    medicineName.trim().length === 0 ||
                    frequency.trim().length === 0 ||
                    duration.trim().length === 0
                  }
                >
                  Add Medicine
                </IconButton>
              </Td>
            </Tr>
          </>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
