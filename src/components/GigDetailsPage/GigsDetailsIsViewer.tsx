import { useQuery } from '@apollo/client';
import { MyGigById } from '../../graphql/queries';

export default function GigsDetailsIsViewer({ gigId }: { gigId: string }) {
  const { loading, error, data } = useQuery(MyGigById, {
    variables: { gigId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const {
    amountOfSets,
    dressCode,
    extraDJ,
    extraXL,
    gigDate,
    gigImportantGuests,
    gigOccasion,
    gigStatus,
    gigTitle,
    gigsUsers,
    isDinner,
    isParking,
    payMembers,
    timeCheckInGroup,
    timeCheckInSoundEngineer,
    timeCheckOut,
    timeDinner,
    timeReadyForShow,
    timeShowEnd,
    timeShowStart,
    timeSoundCheck,
    updated_at,
  } = data.gigs_by_pk;

  return (
    <div>
      <h3>{gigStatus}</h3>
      <div className="p-3 d-flex flex-wrap">
        <div className="details-block rounded">
          <h4>
            <u>Common details</u>
          </h4>
          <p>Date: {gigDate}</p>
          <p>Title: {gigTitle}</p>
          <p>Occasion: {gigOccasion}</p>
          <p>Important guests: {gigImportantGuests}</p>
          <p>Parking: {isParking ? 'yes' : 'no'}</p>
          <p>Dinner: {isDinner ? 'yes' : 'no'}</p>
          <p>Pay: €{payMembers},-</p>
        </div>
        <div className="details-block rounded">
          <h4>
            <u>Show details</u>
          </h4>
          <p>Dresscode: {dressCode}</p>
          <p>Number of sets: {amountOfSets}</p>
          <p>XL: {extraXL ? 'yes' : 'no'}</p>
          <p>DJ: {extraDJ ? 'yes' : 'no'}</p>
        </div>
        <div className="details-block rounded">
          <h4>
            <u>Times</u>
          </h4>
          <p>Check in sound: {timeCheckInSoundEngineer}</p>
          <p>Check in group: {timeCheckInGroup}</p>
          <p>Soundcheck: {timeSoundCheck}</p>
          <p>Ready for show: {timeReadyForShow}</p>
          <p>Dinner: {timeDinner}</p>
          <p>
            Show: {timeShowStart} to {timeShowEnd}
          </p>
          <p>Check out: {timeCheckOut}</p>
        </div>
      </div>
    </div>
  );
}
