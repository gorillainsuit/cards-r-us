import React from 'react';
import Background from '../images/bg.svg';


const CreateImg = () => {
  return (
    <div className='CreateImg'>
      <Background className='background' />
      <div className='search-part'>
        <form className='askAi-img'>
          {/* is the type of this input box 'search'?? */}
          <input
            type='search'
            id='ai-img-bar'
            name='q'
            placeholder='ask AI to generate an image for your card... 🗣'
          />
          <button>
            {/* replace with 'search' or 'ai' icon?*/}
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateImg;
