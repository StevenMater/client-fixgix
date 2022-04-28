import { useQuery } from '@apollo/client';
import { MyGigById } from '../../constants/queries';
import Loading from '../../components/Loading/Loading';

export default function GigsDetailsPageIsEditor({ gigId }: { gigId: string }) {
  const { loading, error, data } = useQuery(MyGigById, {
    variables: { gigId },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  const {
    showAmountOfSets,
    gigDressCode,
    showExtraDJ,
    showExtraXL,
    gigDate,
    gigImportantGuests,
    gigOccasion,
    gigStatus,
    gigTitle,
    gigsUsers,
    gigIsDinner,
    gigIsParking,
    gigPayMembers,
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

  //Logs
  console.log('error', error);

  return (
    <div className="p-3 d-flex flex-wrap">
      <div className="details-block rounded">
        <h4>
          <u>Common details</u>
        </h4>
        <p>Date: {gigDate}</p>
        <p>Title: {gigTitle}</p>
        <p>Occasion: {gigOccasion}</p>
        <p>Important guests: {gigImportantGuests}</p>
        <p>Parking: {gigIsParking ? 'yes' : 'no'}</p>
        <p>Dinner: {gigIsDinner ? 'yes' : 'no'}</p>
        <p>Pay: €{gigPayMembers},-</p>
      </div>
      <div className="details-block rounded">
        <h4>
          <u>Show details</u>
        </h4>
        <p>Dresscode: {gigDressCode}</p>
        <p>Number of sets: {showAmountOfSets}</p>
        <p>XL: {showExtraXL ? 'yes' : 'no'}</p>
        <p>DJ: {showExtraDJ ? 'yes' : 'no'}</p>
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
  );
}
