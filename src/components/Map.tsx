const Map = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.7266890748587!2d-3.6016668234748!3d37.176664771452435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fcb0c2f6a5c7%3A0x8a7a5c3c5e3c3c3c!2sPuerta%20Real%2C%20Granada!5e0!3m2!1ses!2ses!4v1709650844814!5m2!1ses!2ses"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default Map