import React from "react"
import useFetch from "react-fetch-hook"
import { addPropertyControls, ControlType } from "framer"

export default function Weather(props) {
    let OwKey = props.OwKey
    let long = props.long
    let lat = props.lat
    let tempUnit = props.tempUnit
    let unit
    if (props.tempUnit == "metric") {
        unit = "°C"
    }
    if (props.tempUnit == "imperial") {
        unit = "°F"
    }
    const { isLoading, error, data } = useFetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            long +
            "&lang=fr&units=" +
            tempUnit +
            "&appid=" +
            OwKey
    )
    if (isLoading) return "Loading..."
    if (error) return "Error!"

    let date = new Date()
    let dateNow = Date.now()

    let sunrise = new Date(data.sys.sunrise * 1000)
    let sunriseHour = sunrise.getHours()
    let sunriseMinutes = sunrise.getMinutes()
    let sunset = new Date(data.sys.sunset * 1000)
    let sunsetHour = sunset.getHours()
    let sunsetMinutes = sunset.getMinutes()
    let windSpeed = data.wind.speed
    let windSpeedKm = (windSpeed * 3.6).toFixed(0)
    const cssStyles = { color: props.textColor }

    return (
        <div style={cssStyles}>
            <p>
                Lat: {data.coord.lat} - Long: {data.coord.lon}
            </p>
            <h2>Temps : {data.weather[0].description}</h2>
            <h2>Températures : {data.main.temp + unit}</h2>
            <p>Min: {data.main.temp_min + unit}</p>
            <p>Max: {data.main.temp_max + unit}</p>
            <p>Pression atmosphérique: {data.main.pressure} mbar</p>
            <h2>Humidité : {data.main.humidity}%</h2>
            <h2>Vent : {windSpeedKm} km/h</h2>
            <p>Direction: {data.wind.deg}°</p>
            <h2>Soleil</h2>
            <p>
                Lever: {sunriseHour}h{sunriseMinutes}
            </p>
            <p>
                Coucher: {sunsetHour}h{sunsetMinutes}
            </p>
        </div>
    )
}

addPropertyControls(Weather, {
    OwKey: {
        type: ControlType.String,
        title: "API key",
        defaultValue: "8bf1b6fd962f6aaeaef61f6e736673a6",
        placeholder: "Your OpenWeather key",
    },
    lat: {
        type: ControlType.String,
        defaultValue: "48.8566",
        placeholder: "Latitude",
    },
    long: {
        type: ControlType.String,
        defaultValue: "2.3522",
        placeholder: "Longitude",
    },
    tempUnit: {
        type: ControlType.Enum,
        title: "Unit",
        defaultValue: "a",
        displaySegmentedControl: true,
        segmentedControlDirection: "horizontal",
        options: ["metric", "imperial"],
        optionTitles: ["Celcius", "Fahrenheit"],
    },
    textColor: {
        type: ControlType.Color,
        defaultValue: "#fff",
    },
})
