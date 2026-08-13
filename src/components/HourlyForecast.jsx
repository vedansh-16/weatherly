function HourlyForecast({ weather, convertTemp }) {
  if (!weather) {
    return null
  }

  const cityTimezone = weather.city.timezone

  function getLocalDate(timestamp) {
    return new Date(
      (timestamp + cityTimezone) * 1000
    )
      .toISOString()
      .split('T')[0]
  }

  const today = getLocalDate(
    Math.floor(Date.now() / 1000)
  )

  const todayForecast = weather.list
    .filter((item) => {
      return getLocalDate(item.dt) === today
    })
    .slice(0, 6)

  return (
    <section className="card hourly-section">

      <h2>Today's Forecast</h2>

      <div className="hourly-forecast">

        {todayForecast.map((item) => {

          const time = new Date(
            (item.dt + cityTimezone) * 1000
          )

          const hours = time.getUTCHours()
          const minutes = time.getUTCMinutes()

          const formattedTime = new Date(
            1970,
            0,
            1,
            hours,
            minutes
          ).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit'
          })

          return (
            <div
              className="hour"
              key={item.dt}
            >

              <p>
                {formattedTime}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />

              <strong>
                {convertTemp(item.main.temp)}°
              </strong>

            </div>
          )
        })}

      </div>

    </section>
  )
}

export default HourlyForecast