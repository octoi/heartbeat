import React, { useEffect, useState } from 'react';
import { TextInput } from '../../common/TextInput';
import { NumberInput } from '../../common/NumberInput';
import { Checkbox, Flex, Heading, Select, SimpleGrid } from '@chakra-ui/react';
import {
  PatientMedicalBioData,
  PatientRecord,
  SetState,
} from '../../../utils/types';

interface Props {
  patientRecord: PatientRecord;
  setPatientRecord: SetState<PatientRecord>;
  loading: boolean;
}

enum HeightUnit {
  Metre,
  Centimeter,
  Inch,
}

export const MedicalBioData: React.FC<Props> = ({
  patientRecord,
  setPatientRecord,
  loading,
}) => {
  let medicalBioData = patientRecord.medicalBioData;

  const [heightUnit, setHeightUnit] = useState(HeightUnit.Metre);
  const [height, setHeight] = useState(medicalBioData?.height || '');
  const [weight, setWeight] = useState(medicalBioData?.weight || '');
  const [bmi, setBmi] = useState(medicalBioData?.bmi || '0');
  const [allergyToMedicines, setAllergyToMedicines] = useState(
    medicalBioData?.allergyToMedicine?.status || false
  );
  const [allergyMedicines, setAllergyMedicines] = useState(
    medicalBioData?.allergyToMedicine?.medicines || ''
  );
  const [remark, setRemark] = useState(medicalBioData?.remark || '');
  const [chiefComplaint, setChiefComplaint] = useState(
    medicalBioData?.chiefComplaint || ''
  );
  const [pastMedicalHistory, setPastMedicalHistory] = useState(
    medicalBioData?.pastMedicalHistory || ''
  );
  const [personalHistory, setPersonalHistory] = useState(
    medicalBioData?.personalHistory || ''
  );
  const [familyHistory, setFamilyHistory] = useState(
    medicalBioData?.familyHistory || ''
  );
  const [treatmentHistory, setTreatmentHistory] = useState(
    medicalBioData?.treatmentHistory || ''
  );

  useEffect(() => {
    let heightNumber = Number(height);
    const weightNumber = Number(weight);

    if (heightUnit == HeightUnit.Centimeter) {
      heightNumber = heightNumber * 0.01;
    }

    if (heightUnit == HeightUnit.Inch) {
      heightNumber = heightNumber * 0.0254;
    }

    const bmi = weightNumber / (heightNumber * heightNumber);
    setBmi(bmi.toFixed(2));
  }, [height, weight, heightUnit]);

  useEffect(() => {
    const patientMedicalBioData: PatientMedicalBioData = {
      heightUnit:
        HeightUnit[heightUnit][0] == 'C' ? 'Cm' : HeightUnit[heightUnit][0],
      height: height,
      weight: weight,
      bmi,
      allergyToMedicine: {
        status: allergyToMedicines,
        medicines: allergyMedicines,
      },
      remark,
      chiefComplaint,
      pastMedicalHistory,
      personalHistory,
      familyHistory,
      treatmentHistory,
    };

    let newPatientRecord: PatientRecord = {
      ...patientRecord,
      medicalBioData: patientMedicalBioData,
    };

    setPatientRecord(newPatientRecord);
  }, [
    heightUnit,
    height,
    weight,
    bmi,
    allergyToMedicines,
    allergyMedicines,
    remark,
    chiefComplaint,
    pastMedicalHistory,
    personalHistory,
    familyHistory,
    treatmentHistory,
  ]);

  return (
    <div>
      <Heading className='text-2xl' fontWeight='medium'>
        Biodata
      </Heading>
      <SimpleGrid mt={5} columns={{ sm: 1, md: 2, lg: 3 }} gap={2}>
        <div>
          <h2 className='mb-2 text-md'>
            Height (
            {HeightUnit[heightUnit][0] == 'C'
              ? 'CM'
              : HeightUnit[heightUnit][0]}
            )
          </h2>
          <Flex alignItems='center' justifyContent='space-between'>
            <NumberInput
              disabledTitle
              value={height}
              setValue={setHeight}
              disabled={loading}
            />
            <Select
              variant='filled'
              width='28%'
              ml={2}
              value={heightUnit}
              onChange={(e) => setHeightUnit(parseInt(e.target.value))}
            >
              <option value={HeightUnit.Metre}>M</option>
              <option value={HeightUnit.Centimeter}>CM</option>
              <option value={HeightUnit.Inch}>I</option>
            </Select>
          </Flex>
        </div>
        <NumberInput
          title='Weight (Kg)'
          value={weight}
          setValue={setWeight}
          disabled={loading}
        />
        <TextInput title='BMI' value={bmi} setValue={() => {}} disabled />
      </SimpleGrid>
      <div className='mt-3'>
        <Checkbox
          isChecked={allergyToMedicines}
          size='lg'
          onChange={(e) => setAllergyToMedicines(e.target.checked)}
          disabled={loading}
        >
          Allergy to medicines
        </Checkbox>
        {allergyToMedicines && (
          <TextInput
            title='Allergic medicines'
            value={allergyMedicines}
            setValue={setAllergyMedicines}
            disabled={loading}
            textArea
            className='mt-5'
          />
        )}
      </div>
      <TextInput
        title='Remarks'
        value={remark}
        setValue={setRemark}
        disabled={loading}
        textArea
        className='mt-5'
      />
      <SimpleGrid mt={3} columns={{ sm: 1, lg: 2 }} gap={2}>
        <TextInput
          title='Chief complaints'
          value={chiefComplaint}
          setValue={setChiefComplaint}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Past medical history'
          value={pastMedicalHistory}
          setValue={setPastMedicalHistory}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Personal history'
          value={personalHistory}
          setValue={setPersonalHistory}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Family history'
          value={familyHistory}
          setValue={setFamilyHistory}
          disabled={loading}
          textArea
        />
        <TextInput
          title='Treatment history'
          value={treatmentHistory}
          setValue={setTreatmentHistory}
          disabled={loading}
          textArea
        />
      </SimpleGrid>
    </div>
  );
};
