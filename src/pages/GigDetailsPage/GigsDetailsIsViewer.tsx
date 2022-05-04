export default function GigsDetailsIsViewer({ data }: { data: any }) {
  const {
    gigStatus,
    gigTitle,
    gigDate,
    gigOccasion,
    gigImportantGuests,
    gigIsParking,
    gigIsDinner,
    gigPayMembers,
    showDressCode,
    showAmountOfSets,
    showExtraXL,
    showExtraDJ,
    timeCheckInSoundEngineer,
    timeCheckInGroup,
    timeSoundCheck,
    timeReadyForShow,
    timeDinner,
    timeShowStart,
    timeShowEnd,
    timeCheckOut,
    // gigsUsers,
    // updated_at,
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
          <p>Parking: {gigIsParking ? 'yes' : 'no'}</p>
          <p>Dinner: {gigIsDinner ? 'yes' : 'no'}</p>
          <p>Pay: €{gigPayMembers},-</p>
        </div>
        <div className="details-block rounded">
          <h4>
            <u>Show details</u>
          </h4>
          <p>Dresscode: {showDressCode}</p>
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
    </div>
  );
}
