import { invoke } from '@tauri-apps/api/tauri';

export const getPatient = (patientId: number, toast: any) => {
  return new Promise((resolve, reject) => {
    invoke('read_patient', {
      id: patientId,
    })
      .then((data: any) => {
        resolve(JSON.parse(data[0].data) || {});
      })
      .catch((err) => {
        toast({
          title: err,
          description: 'Failed to find patient',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
        });
        reject();
      });
  });
};
