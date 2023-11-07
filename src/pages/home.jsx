import React, { useEffect, useState } from 'react';
import SearchLocationBar from '../components/search-location-bar';
import axios from 'axios';

const Home = ({ inputVal, setInputVal, prevSearches, setPrevSearches, handleFetch, delSearchedRes, currentDateTime, handleKeyDown }) => {
    const [displayWeather, setDisplayWeather] = useState({})
  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=1b3b237b684eb68a390fc4acbc493a04`);
      const displayWeather = res.data;
      setDisplayWeather(displayWeather)
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Please enable location access for weather information.");
          }
        }
      );
    } else {
        alert("Geolocation is not available in this browser.");
    }
  }, []);

  const weather =displayWeather?.weather?.[0]?.main || '';
  const cityName = displayWeather?.name || '';
  const icon =displayWeather?.weather?.[0]?.icon || '';
  const wind = displayWeather?.wind?.speed || 0
  const humidity =displayWeather?.main?.humidity || 0
  const temp = displayWeather?.main?.temp || 0;
  const tempInCels = (Math.round((temp - 32) * (5/9) * 100) / 100 );
  const iconUrl =`https://openweathermap.org/img/w/${icon}.png`

const setBackgroundImage = () => {
    const body = document.body;
  
    const backgroundImageUrl =
      weather === 'Clouds'
        ? 'url("weather4.avif")'
        : weather === 'Rain'
        ? 'url("weather9.avif")'
        : weather === 'Clear'
        ? 'url("weather2.jpeg")'
        : weather === 'Thunderstorm'
        ? 'url("weather6.jpeg")'
        : weather === 'Snow'
        ? 'url("weather8.jpeg")'
        : weather === 'Mist'
        ? 'url("weather7.avif")'
        : 'url("weather2.avif")'; 
  
    body.style.backgroundImage = backgroundImageUrl;
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundPosition = 'center';
    body.style.backgroundSize = 'cover';
    body.style.backgroundAttachment = 'fixed';
  };
  
  useEffect(() => {
    setBackgroundImage();
  }, [displayWeather]);

  
  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 z-0" style={{ background: '#000', opacity: 0.4 }}></div>
      {Object.keys(displayWeather).length > 0 ? (
        <div className='p-[1rem] lg:p-[3rem] z-30  ' >
          <h1 className='text-[1.2rem] font-bold z-30 relative text-left'>Weather-wiz</h1>

          <div className='relative lg:absolute lg:left-0 lg:bottom-[5rem] lg:flex lg:items-center lg:ml-[3rem] lg:gap-[1rem] md:[.4rem]'>
          <p className='text-[2.3rem] lg:text-[5rem]'>{tempInCels}&deg;</p>
          <div className='mt-[1rem]'>
            <p className='text-[1.7rem] lg:text-left lg:text-[1.3rem] '>{cityName}</p>
            <p className='text-[1.1rem] lg:text-[.9rem] '>{currentDateTime}</p>
          </div>

          <div className=''>
          <img src={iconUrl} alt="" className='mx-auto'/>
           <p className='text-[1.6rem]'>{weather}</p>
           
          </div>
          </div>
          

        </div>
      ) : (<div className='p-[1rem] lg:p-[3rem] mx-auto text-left'>
        <h1 className='text-[1.2rem] font-bold z-30 relative'>Weather-wiz</h1>
        <h2 className='text-[1.3rem] font-bold z-30 relative lg:w-[900px] mt-[2rem]'>
          Failed to fetch weather of the current location. Check your internet connectivity or enable your location.
        </h2>
      </div>) }
      <SearchLocationBar
        inputVal={inputVal}
        setInputVal={setInputVal}
        prevSearches={prevSearches}
        handleFetch={handleFetch}
        setPrevSearches={setPrevSearches}
        delSearchedRes={delSearchedRes}
        displayWeather={displayWeather}
        wind={wind}
        tempInCels={tempInCels}
        humidity={humidity}
        handleKeyDown={handleKeyDown}
        
      />
    </>
  );
};

export default Home;
