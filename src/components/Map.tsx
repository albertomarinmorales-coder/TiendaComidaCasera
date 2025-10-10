const Map = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-3">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.5!2d-3.6!3d37.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sC.+Gavil%C3%A1n%2C+1%2C+local+1%2C+18194+Churriana+de+la+Vega%2C+Granada!5e0!3m2!1sen!2ses!4v1635789456789!5m2!1sen!2ses"
        width="100%"
        height="340"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación El Buen Comer - C. Gavilán, 1, local 1, 18194 Churriana de la Vega, Granada"
      />
    </div>
  )
}

export default Map