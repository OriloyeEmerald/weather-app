import {ArrowCircleLeft, Check, X} from 'phosphor-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Location = ({weatherData, currentDateTime, saveLocation, modalState, setModalState}) => {
     

      if(!weatherData) {

        return <div>Loading...</div>;

      }      

  const cityName = weatherData?.name || '';
  const country = weatherData?.sys?.country || '';
  const weather =weatherData?.weather?.[0]?.main || '';
  const icon =weatherData?.weather?.[0]?.icon || '';
  const temp = weatherData?.main?.temp || 0
  const high = weatherData?.main?.temp_max || 0
  const low = weatherData?.main?.temp_min || 0
  const wind = weatherData?.wind?.speed || 0
  const humidity = weatherData?.main?.humidity || 0
  const pressure = weatherData?.main?.pressure || 0
  let precipitation = weatherData?.rain?.['1h'] || 0;
  precipitation += (Math.round((precipitation * 100) *100) /100)
  const iconUrl =`https://openweathermap.org/img/w/${icon}.png`
  const tempInCels = (Math.round((temp - 32) * (5/9) * 100) / 100 );
  const highTempInCels = (Math.round((high - 32) * (5/9) * 100) / 100 );
  const lowTempInCels = (Math.round((low - 32) * (5/9) * 100) / 100);

  return (
   <div style={{
    backgroundImage:
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
            : '',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
}}
>
    <div className='mx-[1rem] relative h-[100vh] px-[1rem] rounded-[1rem] blur-background relative' >
    <Link to={'/'}>
     <div style={{ display: 'flex',justifyContent: 'flex-start' }}>
       
      <ArrowCircleLeft  className='text-[3.3rem] mt-3'/>
     </div>
    </Link>
        <button className='bg-blue-600 rounded-[.3rem] text-white py-[.7rem] px-[1rem] mt-2' onClick={saveLocation}>Save Location</button>

      <div className='text-white'>
        <div className='text-left mt-[.5rem] text-[1.8rem] mt-[1.2rem]'>
            <span>{cityName + ','}</span> <span>{country}</span>
            <p className='text-[1rem] mt-[.8rem]'>{currentDateTime}</p>
        </div>
         
         <div className='mt-[.5rem] flex justify-center gap-[.5rem] items-center'>
          <img src={iconUrl} alt="" className='w-[180px]' />
 
           <div>
            <p className='text-[1.8rem]'>{tempInCels}&deg;C</p>
           <p>{weather}</p>
           </div>
          
         </div>
      </div>

      <div className='flex justify-between mt-[.5rem] items-center'>
        <div>
         <p className='text-[1.3rem]'>{highTempInCels}</p>
         <p>High</p>
        </div>
        <div>
         <p className='text-[1.3rem]'>{wind}mph</p>
         <p>Wind</p>
        </div>
        <div>
         <p className='text-[1.3rem]'>{humidity}%</p>
         <p>Humidity</p>
        </div>
      </div>

      <div className='flex justify-between mt-[2rem] items-center'>
        <div>
         <p className='text-[1.3rem]'>{lowTempInCels}</p>
         <p>Low</p>
        </div>
        <div>
         <p className='text-[1.3rem]'>{pressure}in</p>
         <p>Pressure</p>
        </div>
        <div>
         <p className='text-[1.3rem]'>{precipitation}%</p>
         <p>Precipitation</p>
        </div>
      </div>

      <Link to={'/savedLocation'}>
        <button className='bg-white border-[.15rem] border-blue-600 rounded-[.4rem] py-[.9rem] px-[.4rem] mt-[3rem] text-blue-600 w-full'>View Saved Locations</button>
      </Link>

      
    </div>
    {modalState &&  
  <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] '>
    <div className='bg-white rounded-[.8rem] py-[1.5rem] text-black'>

    <div className="flex justify-end mr-[1rem]">
     <button className='border rounded-[.3rem] text-white bg-gray-300 rounded-full py-[.5rem] px-[.5rem] text-center text-[1.5rem]' onClick={() => setModalState(false)}>
    
     <X className='text-black'/>
    
   </button>
   </div> 
      <Check className='text-[6rem] text-center text-green-500 mx-auto'/>
      
      
      <p className='mt-[.5rem] text-[1.1rem]'>Your search has been saved successfully</p>
    </div>
  </div>
}

    </div>
  );
}

export default Location;
