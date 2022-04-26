import './gigs-details-page.css';

import { useQuery, useReactiveVar } from '@apollo/client';
import { useParams } from 'react-router-dom';
import GoogleMap from '../GoogleMap';
import { MyGigById } from '../../graphql/queries';
import GigsDetailsIsEditor from './GigsDetailsIsEditor';
import GigsDetailsIsViewer from './GigsDetailsIsViewer';
import { isEditor } from '../../cache';

export default function GigDetailsPage() {
  const { gigId } = useParams<string>();
  const isEditorRole = useReactiveVar(isEditor);

  //Logs
  // console.log('data :>> ', data.gigs_by_pk);
  console.log('isEditorRole :>> ', isEditorRole);

  return (
    <div className="gigs-details-container p-3">
      {isEditorRole ? (
        <GigsDetailsIsEditor gigId={gigId || ''} />
      ) : (
        <GigsDetailsIsViewer gigId={gigId || ''} />
      )}
    </div>
  );
}
