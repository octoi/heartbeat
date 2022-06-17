import { Link, useParams } from 'react-router-dom';
import { EditPageContent } from '../components/edit';

export default function EditPage() {
  const params = useParams();
  let id = params?.id;

  return id ? <EditPageContent patientId={Number(id)} /> : <EditPageContent />;
}
