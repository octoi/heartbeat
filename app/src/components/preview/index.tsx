import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { PatientData } from '../../utils/types';
import { getPatient } from '../edit/helper';
import { Header } from './header';
import { Preview } from './preview';
import { useReactToPrint } from 'react-to-print';

interface Props {
  patientId: number;
}

export const PreviewPageContent: React.FC<Props> = ({ patientId }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const printContentRef = useRef<any>();

  const [loading, setLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);
  const [tableVariant, setTableVariant] = useState('striped');
  const [patientData, setPatientData] = useState<PatientData>({});

  useEffect(() => {
    setLoading(true);

    getPatient(patientId, toast)
      .then((data: any) => {
        setPatientData(data);
      })
      .catch(() => {
        navigate('/', { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    documentTitle: patientData.bioData?.name || 'patient_details',
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
      />
      {loading && <p>Loading ...</p>}
      <Preview
        patientData={patientData}
        printContentRef={printContentRef}
        tableVariant={tableVariant}
      />
    </div>
  );
};
