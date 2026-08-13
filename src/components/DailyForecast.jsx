function DailyForecast({ weather, convertTemp }) {
  if (!weather) {
    return null
  }

  const dailyData = {}

  weather.list.forEach((item) => {
    const date = new Date(
      item.dt * 1000
    ).toLocaleDateString('en-CA')

    if (!dailyData[date]) {
      dailyData[date] = []
    }

    dailyData[date].push(item)
  })

  const days = Object.entries(dailyData).slice(0, 5)

  return (
    <aside className="card daily-section">

      <h2>
        5-DAY FORECAST
      </h2>

      <div className="daily-list">

        {days.map(([date, entries]) => {

          const temperatures = entries.map(
            (item) => item.main.temp
          )

          const high = Math.max(...temperatures)
          const low = Math.min(...temperatures)

          const representative =
            entries.find((item) => {

              const hour = new Date(
                item.dt * 1000
              ).getHours()

              return hour >= 12 && hour <= 15

            }) || entries[0]

          const dayName = new Date(
            representative.dt * 1000
          ).toLocaleDateString('en-US', {
            weekday: 'short'
          })

          return (

            <div
              className="daily-item"
              key={date}
            >

              <span>
                {dayName}
              </span>

              <img
                src={`https://openweathermap.org/img/wn/${representative.weather[0].icon}@2x.png`}
                alt={representative.weather[0].description}
              />

              <strong>
                {representative.weather[0].main}
              </strong>

              <p>
                {convertTemp(high)}° /{' '}
                <span>
                  {convertTemp(low)}°
                </span>
              </p>

            </div>

          )
        })}

      </div>

    </aside>
  )
}

export default DailyForecast