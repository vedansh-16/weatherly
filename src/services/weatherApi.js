const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export async function getCurrentWeather(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  )

  if (!response.ok) {
    throw new Error('City not found')
  }

  return await response.json()
}

export async function getWeather(city) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  )

  if (!response.ok) {
    throw new Error('City not found')
  }

  return await response.json()
}

export async function getCurrentWeatherByLocation(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )

  if (!response.ok) {
    throw new Error('Unable to get current weather')
  }

  return await response.json()
}

export async function getForecastByLocation(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )

  if (!response.ok) {
    throw new Error('Unable to get weather for this location')
  }

  return await response.json()
}