function AirConditions({ weather, convertTemp }) {
  if (!weather) {
    return null
  }

  const windSpeed = (
    weather.wind.speed * 3.6
  ).toFixed(1)

  const visibility = weather.visibility
    ? (weather.visibility / 1000).toFixed(1)
    : 'N/A'

  const conditions = [
    {
      icon: '🌡️',
      title: 'Real Feel',
      value: `${convertTemp(weather.main.feels_like)}°`
    },
    {
      icon: '💨',
      title: 'Wind',
      value: `${windSpeed} km/h`
    },
    {
      icon: '💧',
      title: 'Humidity',
      value: `${weather.main.humidity}%`
    },
    {
      icon: '👁️',
      title: 'Visibility',
      value: `${visibility} km`
    }
  ]

  return (
    <section className="card air-section">

      <h2>Air Conditions</h2>

      <div className="air-grid">

        {conditions.map((condition) => (
          <div
            className="condition"
            key={condition.title}
          >

            <div className="condition-icon">
              {condition.icon}
            </div>

            <div className="condition-info">

              <p>
                {condition.title}
              </p>

              <strong>
                {condition.value}
              </strong>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}

export default AirConditions