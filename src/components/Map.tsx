const Map = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.8943270799396!2d-3.766776523474368!3d37.15199097197435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71f935c6e7856b%3A0x27c3122457c7f44b!2sC.%20Gavil%C3%A1n%2C%201%2C%2018194%20Churriana%20de%20la%20Vega%2C%20Granada!5e0!3m2!1ses!2ses!4v1709650844814!5m2!1ses!2ses"
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