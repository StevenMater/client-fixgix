import './gigs-details-page.css';

import { useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router-dom';
import GigsDetailsIsEditor from './GigsDetailsIsEditor';
import GigsDetailsIsViewer from './GigsDetailsIsViewer';
import { isEditorVar } from '../../constants/cache';

export default function GigDetailsPage() {
  const { gigId } = useParams<string>();
  const isEditor = useReactiveVar(isEditorVar);

  //Logs
  // console.log('data :>> ', data.gigs_by_pk);
  // console.log('isEditorRole :>> ', isEditorRole);

  return (
    <div className="gigs-details-container p-3">
      {isEditor ? (
        <GigsDetailsIsEditor gigId={gigId || ''} />
      ) : (
        <GigsDetailsIsViewer gigId={gigId || ''} />
      )}
    </div>
  );
}
