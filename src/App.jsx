import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Location from './pages/location'
import React, {  useState } from 'react';
import axios from 'axios';
import SavedLocation from './pages/savedLocation';



const API_URL = `https://api.openweathermap.org/data/2.5/weather?`
function App() {
  const [inputVal, setInputVal] = useState('')
  const [weatherData, setWeatherData] = useState({})
  const [prevSearches, setPrevSearches] = useState([])
  const [modalState, setModalState] = useState(false)


  const addSearchedRes = () => {
     const newSearches = {
       id: Date.now(),
       city: inputVal
     }
     if(inputVal.length > 0) {
       setPrevSearches([...prevSearches, newSearches])
     }
     
  }

  const delSearchedRes = (id) => {
    const newSearchedRes = prevSearches.filter((search) => search.id !== id)

    setPrevSearches(newSearchedRes)
  }

  const fectchWeather = async () => {
    try {
       const res = await axios.get(`${API_URL}q=${inputVal}&units=imperial&appid=1b3b237b684eb68a390fc4acbc493a04`)
      const weatherData = await res.data;
      setWeatherData(weatherData)
      setInputVal('');
      addSearchedRes();
    } catch (error) {
       console.log(error)
    }
  }

  const handleFetch = () => {
   if(inputVal.length > 0) {
       fectchWeather()
   }
  }

  
  const getCurrentDateTime = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
  
    return `${formattedHours}:${formattedMinutes} ${ampm} - ${dayOfWeek}, ${month} ${day}, ${year}`;
  }
  
  const currentDateTime = getCurrentDateTime();
  const saveLocation = () => {
    setModalState(true)

  }
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home 
           inputVal={inputVal}
           setInputVal={setInputVal}
           prevSearches={prevSearches}
           handleFetch={handleFetch}
           setPrevSearches={setPrevSearches}
           delSearchedRes={delSearchedRes}
           currentDateTime={currentDateTime}
           
          />}/>
   

          <Route path='/location' element={<Location 
           weatherData = {weatherData}
           currentDateTime={currentDateTime}
           saveLocation = {saveLocation}
           modalState={modalState}
           setModalState={setModalState}
          />}/>

          <Route path='/savedLocation' element={<SavedLocation />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
