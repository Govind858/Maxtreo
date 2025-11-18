export default function MapIframe() {
  const lat = 9.9312;
  const lng = 76.2673;

  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  return (
    <div
      onClick={openDirections}
      style={{
        width: "200px",
        height: "200px",
        cursor: "pointer",
        borderRadius: "10px",
        overflow: "hidden",
        border: "2px solid #ccc"
      }}
    >
      <iframe
        title="Google Map"
        src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0, pointerEvents: "none" }}
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
}
