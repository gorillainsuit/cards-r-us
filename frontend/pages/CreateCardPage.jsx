import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { Form } from 'react-router-dom';
import Placeholder from '../images/placeholder.jpg';

let testData = {
  data: [
    {
      url: Placeholder,
    },
    {
      url: Placeholder,
    },
    {
      url: Placeholder,
    },
    {
      url: Placeholder,
    },
  ],
};

// Step 1
const CreateImg = ({ imageState }) => {
  const [selectedImage, setSelectedImage] = imageState;
  const [imgPrompt, setImgPrompt] = useState('');

  //--DALL-E API fetch request--

  const [keywords, setKeywords] = useState('');
  const [imgList, setImgList] = useState('');
  // const handleSubmit = (e) => {

  //   const keywords = { q };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const prompt = { imgPrompt, n: 4, size: '1024x1024' };

  //   fetch('#', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(prompt),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setImgList(data.data);
  //     });
  // };

  //--DUMMY DB Test--
  useEffect(() => {
    setTimeout(() => {
      setImgList(testData.data);
    }, 600);
  });

  const ImgResult = imgList.map((el, i) => (
    <div>
      <img src={el.url} />
    </div>
  ));

  return (
    <div className='CreateImg'>
      <div className='search-part'>
        <form className='askAi-img'>
          {/* is the type of this input box 'search'?? */}
          <input
            type='search'
            id='ai-img-bar'
            // name='q'
            value={imgPrompt}
            placeholder=' generate an image for your card... '
            onChange={(e) => setImgPrompt(e.target.value)}
          />
          <button>
            search
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='bi bi-search'
              viewBox='0 0 16 16'>
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
            </svg>
          </button>
        </form>
      </div>
      <div className='imgDisplay'>
        <div className='img-result'>{ImgResult}</div>
      </div>
    </div>
  );
};

// Step 2
const CreatePrompt = ({ promptState }) => {
  const [selectedMessage, setSelectedMessage] = promptState;
  const [currentMessage, setCurrentMessage] = useState('');

  return (
    <div className='CreatePropmpt'>
      <div className='MessageInput'>
        <input
          type='text'
          placeholder='Say something nice...'
          id='message'
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <Button
          color='neutral'
          onClick={() => setSelectedMessage(currentMessage)}
          variant='soft'
        />
      </div>
    </div>
  );
};

// The main page component that will handle state for prompt and image generation and it will control whether the user can continue to the next step
const CreateCard = () => {
  const steps = [<CreateImg />, <CreatePrompt />];

  const [createCardState, setCreateCardState] = useState({
    stepDisplayed: steps[0],
    currentStep: 0,
    canContinue: false,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  if ((selectedImage || selectedMessage) && !createCardState.canContinue)
    setCreateCardState({ ...createCardState, canContinue: true });

  console.log(createCardState);
  console.log(selectedMessage);

  return (
    <div className='CreateCard'>
      {/* Displays the current step */}
      <div className='StepDisplay'>
        {React.cloneElement(createCardState.stepDisplayed, {
          imageState: [selectedImage, setSelectedImage],
          promptState: [selectedMessage, setSelectedMessage],
        })}
      </div>

      {/* The button to continue */}
      <div className='NextButton'>
        <Button
          variant='soft'
          endDecorator={<ChevronRight />}
          disabled={!createCardState.canContinue}
          onClick={() =>
            setCreateCardState({
              ...createCardState,
              stepDisplayed:
                createCardState.currentStep < steps.length - 1
                  ? steps[++createCardState.currentStep]
                  : steps[createCardState.currentStep],
              currentStep:
                createCardState.currentStep < steps.length - 1
                  ? ++createCardState.currentStep
                  : createCardState.currentStep,
            })
          }>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CreateCard;
