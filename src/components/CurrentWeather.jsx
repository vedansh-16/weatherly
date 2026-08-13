function CurrentWeather({
  weather,
  convertTemp,
  unit,
  weatherClass
}) {
  if (!weather) {
    return null
  }

  return (
    <section className={`current-weather ${weatherClass}`}>

      <div className="current-info">

        <h1>
          {weather.name}
        </h1>


        <div className="temperature">
          {convertTemp(weather.main.temp)}°{unit}
        </div>

        <p>
          Feels like {convertTemp(weather.main.feels_like)}°{unit}
        </p>

      </div>

      <div className="weather-icon">

        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />

        <span>
          {weather.weather[0].main}
        </span>

      </div>

    </section>
  )
}

export default CurrentWeather