import { X } from 'phosphor-react';
import { Link } from 'react-router-dom';


const SearchLocationBar = ({inputVal, setInputVal, prevSearches, setPrevSearches, handleFetch, delSearchedRes, displayWeather, wind, humidity, tempInCels, handleKeyDown}) => {
   
  return (
    <div className='blur-background py-[1.2rem] lg:absolute lg:right-0 lg:top-0 lg:h-[100vh] lg:w-[650px] lg:shadow-[4rem]'>
  <div className='bg-white border rounded-[.3rem] py-[.4rem] mx-[1rem] flex justify-between items-center mt-[1.5rem] '  >
  <input 
    type="text"
    value={inputVal}
    placeholder='Search for a city' className='text-black bg-transparent pl-1 max-w-[150px] focus:outline-0 overflow-x-hidden lg:max-w-[250px] lg:px-[.2rem] sm:max-w-[200px]' onChange={(e) => setInputVal(e.target.value)}
    onKeyDown={handleKeyDown}
  />

  <Link to={'/location'}>
    <button className='bg-blue-600 rounded-[.4rem] py-[.45rem] text-white px-[.6rem] max-w-[90px]' onClick={handleFetch}>Search</button>
  </Link>
</div>

       <div className='h-[130px] overflow-y-auto mt-5 text-left mx-[1rem]'>
          <p>Your previous searches</p>
          {prevSearches.map((searchRes, id) => {
                return <div className='flex justify-between mt-[.4rem]' key={id}>
                     <Link to={`/location`}>
                      <p className='text-[1.2rem] font-thin'>{searchRes.city}</p>
                      </Link>
                      <button className='border rounded-[.3rem] text-white bg-gray-400 py-[.2rem] px-[.3rem] text-center text-[1.5rem]' onClick={() => delSearchedRes(searchRes.id)}>
                        <X  className='text-red-700'/>
                      </button>
                </div>
             }
          )}

          {prevSearches.length >= 3 && <button className='w-full bg-red-600 rounded-[.3rem] py-[.6rem] mt-[1rem] hover:opacity-[.3]' onClick={() => setPrevSearches([]) }>Clear Searches</button>}
          {prevSearches.length === 0 && <p>No searches yet</p>}
          
       </div>

       <p className='border-b-[.09rem] mx-[1rem] mt-[.5rem]'></p>

       {Object.keys(displayWeather).length >  0 && <div className='text-left px-[1rem]'>
         <p className='text-center text-[1.17rem] text-curr lg:text-left lg:mt-[1rem] mt-[1rem]'>Current Location Weather Detail</p>
         <div className='flex justify-between text-[1.1rem] lg:text-[.9rem] mt-[.5rem] lg:mt-[1rem]'>
            <p>Humidity</p>
            <p>{humidity}%</p>
         </div>
         <div className='flex justify-between text-[1.1rem] lg:text-[.9rem] mt-[.5rem] lg:mt-[1rem]'>
            <p>Temperature</p>
            <p>{tempInCels}&deg;</p>
         </div>
         <div className='flex justify-between text-[1.1rem] lg:text-[.9rem] mt-[.5rem] lg:mt-[1rem]'>
            <p>Wind Speed</p>
            <p>{wind}m/s</p>
         </div>
        </div>}
    <Link to={'/savedLocation'}>
    <button className='bg-white border-[.15rem] border-blue-600 rounded-[.4rem] py-[.7rem] px-[1.1rem] mt-[1.5rem] flex ml-[.9rem] text-blue-600 font-thin'>View Saved Locations</button>
    </Link>
      
    </div>
  );
}

export default SearchLocationBar;
