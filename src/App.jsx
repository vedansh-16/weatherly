import { useEffect, useState } from 'react'
import './App.css'

import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import AirConditions from './components/AirConditions'
import DailyForecast from './components/DailyForecast'

import {
  getCurrentWeather,
  getWeather,
  getCurrentWeatherByLocation,
  getForecastByLocation
} from './services/weatherApi'

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [unit, setUnit] = useState('C')

  function convertTemp(temp) {
    if (unit === 'C') {
      return Math.round(temp)
    }

    return Math.round((temp * 9) / 5 + 32)
  }

  function getWeatherClass() {
    if (!weather) {
      return 'default'
    }

    const condition = weather.weather[0].main.toLowerCase()
    const isNight = weather.weather[0].icon.endsWith('n')

    if (condition === 'clear') {
      return isNight ? 'clear-night' : 'clear-day'
    }

    if (condition === 'clouds') {
      return 'cloudy'
    }

    if (condition === 'rain' || condition === 'drizzle') {
      return 'rainy'
    }

    if (condition === 'thunderstorm') {
      return 'storm'
    }

    if (condition === 'snow') {
      return 'snowy'
    }

    if (
      condition === 'mist' ||
      condition === 'fog' ||
      condition === 'haze' ||
      condition === 'smoke'
    ) {
      return 'mist'
    }

    return 'default'
  }

  async function handleSearch(city) {
    setLoading(true)
    setError('')

    try {
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getWeather(city)
      ])

      setWeather(currentData)
      setForecast(forecastData)
    } catch (error) {
      setWeather(null)
      setForecast(null)
      setError('City not found. Please try another city.')
    } finally {
      setLoading(false)
    }
  }

  function handleLocation() {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    setLoading(true)
    setError('')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const [currentData, forecastData] = await Promise.all([
            getCurrentWeatherByLocation(latitude, longitude),
            getForecastByLocation(latitude, longitude)
          ])

          setWeather(currentData)
          setForecast(forecastData)
        } catch (error) {
          setWeather(null)
          setForecast(null)
          setError('Unable to get weather for your location.')
        } finally {
          setLoading(false)
        }
      },
      () => {
        setLoading(false)
        setError('Location permission was denied.')
      }
    )
  }

  useEffect(() => {
    handleSearch('Dehradun')
  }, [])

  return (
    <div className="app">

      <header className="top-bar">

        <div className="brand">
          Weatherly
        </div>

        <div className="search-wrapper">
          <SearchBar
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        <button
          className="location-button"
          onClick={handleLocation}
          disabled={loading}
        >
          📍 My Location
        </button>

      </header>

      <div className="unit-toggle">

        <button
          className={unit === 'C' ? 'active' : ''}
          onClick={() => setUnit('C')}
        >
          °C
        </button>

        <button
          className={unit === 'F' ? 'active' : ''}
          onClick={() => setUnit('F')}
        >
          °F
        </button>

      </div>

      {loading && (
        <div className="status-message">
          Loading weather...
        </div>
      )}

      {error && (
        <div className="status-message error">
          {error}
        </div>
      )}

      {!loading && !error && weather && forecast && (
        <div className="weather-layout">

          <main className="main-content">

            <CurrentWeather
              weather={weather}
              convertTemp={convertTemp}
              unit={unit}
              weatherClass={getWeatherClass()}
            />

            <HourlyForecast
              weather={forecast}
              convertTemp={convertTemp}
            />

            <AirConditions
              weather={weather}
              convertTemp={convertTemp}
            />

          </main>

          <DailyForecast
            weather={forecast}
            convertTemp={convertTemp}
          />

        </div>
      )}

      <footer>
        © Vedansh Jakhmola
      </footer>

    </div>
  )
}

export default App