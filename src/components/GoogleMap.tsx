import { Marker, StaticGoogleMap } from 'react-static-google-map';

export default function GoogleMap() {
  return (
    <StaticGoogleMap
      size="600x600"
      className="img-fluid"
      apiKey="AIzaSyDqeiHHKbV7ivv2SXJiZk2JbZQUeRkmJ_o"
    >
      <Marker location="6.4488387,3.5496361" color="blue" label="P" />
    </StaticGoogleMap>
  );
  // <iframe
  //   title="gigMap"
  //   width="600"
  //   height="450"
  //   style={{ border: 0 }}
  //   loading="lazy"
  //   allowFullScreen
  //   referrerPolicy="no-referrer-when-downgrade"
  //   src="https://www.google.com/maps/embed/v1/place
  //   ?key=AIzaSyDqeiHHKbV7ivv2SXJiZk2JbZQUeRkmJ_o&q=Eiffel+Tower,Paris+France"
  // ></iframe>
}
