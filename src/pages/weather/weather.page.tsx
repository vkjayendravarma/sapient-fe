import axios from "axios";
import { useEffect, useState } from "react";
import { DayWise, WeatherReportInterface } from "../../types/weatherReportTypes";
import "./weather.style.scss"
import { useNavigate } from "react-router-dom";
function verifyDate(inputDate: Date) {
    const date = inputDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    if (date.getTime() === today.getTime()) {
        return 0;
    } else if (date.getTime() === tomorrow.getTime()) {
        return 1;
    } else if (date.getTime() === dayAfterTomorrow.getTime()) {
        return 2;
    }
    return -1
}

function WeatherReportPage() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherReportInterface>();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchWeather = async (e: any = null) => {
        if (e)
            e.preventDefault();
        setError(""); // Clear previous errors

        let cityToFetch = city

        if (!cityToFetch) {
            let storedCity = window.localStorage.getItem("userCity")
            if (!storedCity) {
                return
            }
            if (city !== storedCity) {
                setCity(storedCity)
                cityToFetch = storedCity
            }

        }
        try {
            const token = window.localStorage.getItem("token")

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/weather/forecast`, {
                params: { city: cityToFetch },
                headers: { Authorization: token }
            });
            setWeather({ prediction: response.data.data });

            window.localStorage.setItem('userCity', cityToFetch)

        } catch (err: any) {
            if (err.response.status == 401) {
                window.localStorage.removeItem("token")
                navigate("/login")
            }
            setError("City not found. Please try again.");
        }
    };

    useEffect(() => {
        const storedCity = localStorage.getItem("userCity");
        if (storedCity) {
            setCity(storedCity);
            fetchWeather(null)
        }
    }, []);

    const logout = (e: any) => {
        e.preventDefault();
        window.localStorage.clear()
        navigate('/login');
    }
    return (
        <div className="container">
            <div className="page weather-report mobile-only-page">
                <div className="page-container weather-container">
                    <h2 className="page-title p-3 text-center">Weather Report <span className="logout-button"><button className="btn" onClick={logout}><i className="fa fa-sign-out"></i></button>                    </span></h2>
                    <form onSubmit={fetchWeather}>
                        <div className="form-group">
                            <label htmlFor="" className="form-group-label">Enter city</label>
                            <input className="form-group-input"
                                type="text"
                                placeholder="Enter city name"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">Get Weather</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}

                    {weather && weather.prediction && weather.prediction[0] && <div className="weather-today mt-3 card">
                        <div className="wrapper temperature-wrapper ">
                            <p className="text-center today margin-none pt-1">Today</p>
                            <h2 className="text-center temperature-now"> {weather.prediction[0].max} / {weather.prediction[0].min}</h2>
                            <div className="alerts">
                                {weather.prediction[0].rainy && <p className="alert padding-none">Carry umbrella</p>}
                                {weather.prediction[0].sunny && <p className="alert padding-none ">Use sunscreen lotion</p>}
                                {weather.prediction[0].windy && <p className="alert  padding-none">It's too windy, watch out!</p>}
                                {weather.prediction[0].storm && <p className="alert padding-none">Don't step out! A storm is brewing!</p>}
                            </div>
                        </div>
                    </div>}

                    <div className="weather-following-days-wapperr pb-3">
                        {weather && weather.prediction && weather.prediction?.map((prediction, index) => (

                            <div className="weather-info  mt-3" key={index}>
                                {index > 0 && <div className="followingDays card pt-3">
                                    <p className="alert padding-none margin-none">{new Date(prediction.date * 1000).toDateString()} : <b>  {prediction.max} / {prediction.min}</b></p>
                                    <div className="alerts padding-none">
                                        {prediction.rainy && <p className="alert margin-none">Carry umbrella</p>}
                                        {prediction.sunny && <p className="alert margin-none">Use sunscreen lotion</p>}
                                        {prediction.windy && <p className="alert margin-none">It's too windy, watch out!</p>}
                                        {prediction.storm && <p className="alert margin-none">Don't step out! A storm is brewing!</p>}
                                    </div>
                                </div>}

                            </div>
                        ))}

                    </div>


                </div>
            </div>

        </div>
    );
}

export default WeatherReportPage;