import { useParams } from 'react-router-dom';
import { PreviewPageContent } from '../components/preview';

export default function PreviewPage() {
  const params = useParams();
  let id = params?.id;

  return (
    <div>
      <PreviewPageContent patientId={Number(id)} />
    </div>
  );
}
