import React, { useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Header } from './Header';
import { Preview } from './preview';
import { useReactToPrint } from 'react-to-print';
import { getId } from '../../../utils/getId';
import { PatientBioData, PatientRecord } from '../../../utils/types';

interface Props {
  patientCreatedAt: number;
  patientBioData: PatientBioData;
  patientRecord: PatientRecord;
  onClose: any;
}

export const PreviewContent: React.FC<Props> = ({
  patientCreatedAt,
  patientBioData,
  patientRecord,
  onClose,
}) => {
  const toast = useToast();
  const printContentRef = useRef<any>();

  const [printLoading, setPrintLoading] = useState(false);
  const [tableVariant, setTableVariant] = useState('striped');

  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    documentTitle:
      `${getId(patientCreatedAt || Date.now())}_${patientBioData?.name}` ||
      'patient_details',
    onBeforeGetContent() {
      setPrintLoading(true);
    },
    pageStyle:
      '@page { size: auto;  margin: 0mm; margin-top: 10px; margin-bottom: 50px; } @media print { body { -webkit-print-color-adjust: exact; } }',
    onAfterPrint() {
      setPrintLoading(false);
    },
    onPrintError(err) {
      setPrintLoading(false);
      toast({
        title: 'Failed to print',
        description: err,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  return (
    <div>
      <Header
        printContent={handlePrint}
        printLoading={printLoading}
        tableVariant={tableVariant}
        setTableVariant={setTableVariant}
        onClose={onClose}
      />
      <Preview
        patientCreatedAt={patientCreatedAt}
        patientBioData={patientBioData || {}}
        patientRecord={patientRecord}
        printContentRef={printContentRef}
        tableVariant={tableVariant}
      />
    </div>
  );
};
