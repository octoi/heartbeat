import { Link, useParams } from 'react-router-dom';

export default function EditPage() {
  const params = useParams();
  let id = params?.id;

  return (
    <div>
      <h2>Edit page {id && id}</h2>
      <br />
      <Link to='/'>Home</Link>
    </div>
  );
}
