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
   <div className='lg:w-[100vw] h-[100vh]  lg:flex lg:justify-center lg:items-center' style={{
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
    <div className='mx-[1rem] lg:px-[3rem] relative  px-[1rem] rounded-[1rem] h-[100vh] blur-background relative lg:w-[1200px] lg:h-[600px] shadow-[1.2rem]' >
    <Link to={'/'}>
     <div style={{ display: 'flex',justifyContent: 'flex-start' }}>
       
      <ArrowCircleLeft  className='text-[3.3rem] mt-3'/>
     </div>
    </Link>
        <button className='bg-blue-600 rounded-[.3rem] text-white py-[.7rem] px-[1rem] mt-2' onClick={saveLocation}>Save Location</button>

      <div className='text-white'>
        <div className='text-left mt-[.5rem] text-[1.6rem] mt-[1.2rem]'>
            <span>{cityName + ','}</span> <span>{country}</span>
            <p className='text-[.9rem] mt-[.8rem] font-thin'>{currentDateTime}</p>
        </div>
         
      </div>
      <div className='lg:flex lg:gap-[2rem] '>
       <div className='mt-[.5rem] flex    justify-center gap-[.8rem]  items-center'>
          <img src={iconUrl} alt="" className='w-[160px] lg:w-[200px] ' />
 
           <div>
            <p className='text-[1.6rem] lg:text-[3.5rem]'>{tempInCels}&deg;</p>
           <p className='font-thin'>{weather}</p>
           </div>
          
         </div>
         <div className='lg:border-r-[.1rem]'></div>
         <div>
         <div className='flex justify-between mt-[.5rem] items-center lg:gap-[2rem]'>
        <div>
         <p className='text-[1.1rem]'>{highTempInCels}</p>
         <p className='font-thin'>High</p>
        </div>
        <div>
         <p className='text-[1.1rem]'>{wind}mph</p>
         <p className='font-thin'>Wind</p>
        </div>
        <div>
         <p className='text-[1.1rem]'>{humidity}%</p>
         <p className='font-thin'>Humidity</p>
        </div>
      </div>

      <div className='flex justify-between mt-[2rem] items-center lg:gap-[2rem]'>
        <div>
         <p className='text-[1.1rem]'>{lowTempInCels}</p>
         <p className='font-thin'>Low</p>
        </div>
        <div>
         <p className='text-[1.1rem]'>{pressure}in</p>
         <p className='font-thin'>Pressure</p>
        </div>
        <div>
         <p className='text-[1.1rem]'>{precipitation}%</p>
         <p className='font-thin'>Precipitation</p>
        </div>
      </div>
         </div>
      
      </div>
      <Link to={'/savedLocation'}>
        <button className='bg-white border-[.15rem] border-blue-600 rounded-[.4rem] py-[.8rem] px-[.4rem] mt-[2rem] text-blue-600 w-full lg:w-1/5 lg:text-[.8rem] font-thin'>View Saved Locations</button>
      </Link>

      
    </div>
    {modalState &&  
  <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg' style={{ width: '365px' }}>
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
 {modalState && (
        <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'></div>
      )}

    </div>
  );
}

export default Location;
