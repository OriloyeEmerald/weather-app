import { ArrowCircleLeft } from 'phosphor-react';
import React from 'react';
import { Link } from 'react-router-dom';

const SavedLocation = () => {

    const setBg = () => {
        const body = document.body;
        const bgUrl = 'url("weather12.avif")'

        body.style.backgroundImage = bgUrl
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundPosition = 'center';
        body.style.backgroundSize = 'cover';
        body.style.backgroundAttachment = 'fixed';
    }

    setBg()
  return (
    <div style={{}}>
      <Link to={'/'}>
     <div style={{ display: 'flex',justifyContent: 'flex-start' }}>
       
     <ArrowCircleLeft  className='text-[3.3rem] mt-3 ml-4'/>
     </div>
    </Link>

    <h1 className='text-[1.4rem]'><b>Saved Locations</b></h1>
    <br />
    <p>Find your saved locations here</p>
    <p>You do not have a saved location yet. Your saved locations will show up here when you save them.</p>
    </div>
  );
}

export default SavedLocation;
