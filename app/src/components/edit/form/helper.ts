import { invoke } from '@tauri-apps/api/tauri';
import { PatientData, SetState } from '../../../utils/types';

export const createPatient = (
  patientData: PatientData,
  navigate: any,
  toast: any,
  setLoading: SetState<boolean>
) => {
  let data: PatientData = {
    ...patientData,
    createdAt: patientData.createdAt ? patientData.createdAt : Date.now(),
    updatedAt: Date.now(),
  };

  invoke('create_patient', {
    data: JSON.stringify(data),
  })
    .then(() => {
      navigate('/', { replace: true });
      toast({
        title: 'Saved patient data successfully',
        description: `${patientData?.bioData?.name} is in your list now :)`,
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

export const updatePatient = (
  patientId: number,
  patientData: PatientData,
  toast: any,
  setLoading: SetState<boolean>
) => {
  let data: PatientData = {
    ...patientData,
    updatedAt: Date.now(),
  };

  invoke('update_patient', {
    id: patientId,
    data: JSON.stringify(data),
  })
    .then(() => {
      toast({
        title: 'Saved patient data successfully',
        description: 'Latest changes in database',
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
