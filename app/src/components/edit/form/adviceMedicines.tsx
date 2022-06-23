import React, { useState } from 'react';
import { PatientMedicine, SetState } from '../../../utils/types';
import { FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import {
  IconButton,
  Input,
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
  const [time, setTime] = useState('Before food');
  const [duration, setDuration] = useState('');

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        medicineName,
        frequency,
        time,
        duration,
      },
    ]);
    setMedicineName('');
    setFrequency('');
    setTime('Before food');
    setDuration('');
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
                <Input
                  placeholder='Medicine'
                  variant='filled'
                  size='md'
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  disabled={loading}
                />
              </Td>
              <Td>
                <Input
                  placeholder='Frequency'
                  variant='filled'
                  size='md'
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
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
                <Input
                  placeholder='Duration'
                  variant='filled'
                  size='md'
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  disabled={loading}
                />
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
