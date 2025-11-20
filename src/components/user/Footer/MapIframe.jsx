export default function MapIframe() {
  const lat =  9.896598003945597;
  const lng = 76.71021744982812;

  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  return (
    <div
      onClick={openDirections}
      className="absolute inset-0 cursor-pointer overflow-hidden"
    >
      <iframe
        title="Google Map"
        src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        className="w-full h-full"
        style={{ border: 0, pointerEvents: "none" }}
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
}