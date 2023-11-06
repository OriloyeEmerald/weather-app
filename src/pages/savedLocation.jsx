import React from 'react';

const SavedLocation = () => {

    const setBg = () => {
        const body = document.body;
        const bgUrl = 'url("weather10.avif")'

        body.style.backgroundImage = bgUrl
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundPosition = 'center';
        body.style.backgroundSize = 'cover';
        body.style.backgroundAttachment = 'fixed';
    }

    setBg()
  return (
    <div style={{}}>
      <h1>Hello World</h1>
    </div>
  );
}

export default SavedLocation;
