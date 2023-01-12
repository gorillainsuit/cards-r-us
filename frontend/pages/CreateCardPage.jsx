import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import { redirect } from 'react-router-dom';
import img0 from '../images/testImg/img0.jpg';
import img1 from '../images/testImg/img1.png';
import img2 from '../images/testImg/img2.png';
import img3 from '../images/testImg/img3.png';

//import bg svg
import BG from '../images/bg.svg';

let testData = {
  data: [
    {
      url: img0,
    },
    {
      url: img1,
    },
    {
      url: img2,
    },
    {
      url: img3,
    },
  ],
};

// Step 1
const CreateImg = ({
  allImages,
  imageState,
  canContinue,
  currentStep,
  nextFunction,
  steps,
}) => {
  const [selectedImage, setSelectedImage] = imageState;
  const [imgPrompt, setImgPrompt] = useState('');
  const [imgList, setImgList] = allImages;

  //--DALL-E API fetch request--

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
    <div
      className='image
    noSelect'
      key={i}>
      <img
        className='noDrag'
        onClick={(e) => {
          setSelectedImage(e.target.src);
        }}
        src={el.url}
      />
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
            value={imgPrompt}
            placeholder=' generate an image for your card... '
            onChange={(e) => setImgPrompt(e.target.value)}
          />
          <button>
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
        </form>
      </div>
      <div className='imgDisplay'>
        <div className='img-result'>{ImgResult}</div>
      </div>
      <div className='Next'>
        {/* The button to continue */}
        <Button
          variant='soft'
          endDecorator={<ChevronRight />}
          disabled={!canContinue}
          onClick={nextFunction}>
          {currentStep >= steps - 1 ? 'Create' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// Step 2  create prompt and confirm card
const CreatePrompt = ({
  allImages,
  promptState,
  imageState,
  canContinue,
  currentStep,
  nextFunction,
  steps,
}) => {
  const [imgList, setImgList] = allImages;
  const [selectedImage, setSelectedImage] = imageState;
  const [selectedMessage, setSelectedMessage] = promptState;
  const image = imageState[0];

  const ImgResult = imgList.map((el, i) => (
    <div className='image' key={i}>
      <img
        className='noDrag'
        onClick={(e) => {
          setSelectedImage(e.target.src);
        }}
        src={el.url}
      />
    </div>
  ));

  return (
    <div className='CreatePrompt'>
      <div className='funStuff'>
        <div className='MessageInput'>
          <input
            type='text'
            placeholder='Say something nice...'
            id='message'
            onChange={(e) => setSelectedMessage(e.target.value)}
            value={selectedMessage ?? ''}
          />
        </div>
        <div
          className='Preview'
          style={{
            backgroundImage: `url(${image ?? Placeholder})`,
            borderRadius: '1em',
          }}>
          <h2>{selectedMessage || 'Say something nice...'}</h2>
        </div>
        <div className='Next'>
          <Button
            variant='soft'
            endDecorator={<ChevronRight />}
            disabled={!canContinue}
            onClick={nextFunction}>
            {currentStep >= steps - 1 ? 'Create' : 'Next'}
          </Button>
        </div>
      </div>
      <div className='img-result'>{ImgResult}</div>
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
  const [allImages, setAllImages] = useState([]);

  const handleNext = () => {
    if (createCardState.currentStep >= steps.length - 1) {
      // TODO: POST to backend with the data

      // post to backend then reedirect to the cards gallery
      setTimeout(() => (window.location.href = '/cards'), 600);
    }

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
    });
  };

  if ((selectedImage || selectedMessage) && !createCardState.canContinue)
    setCreateCardState({ ...createCardState, canContinue: true });

  return (
    <div className='CreateCard'>
      <BG className='background' />
      {/* Displays the current step */}
      <div className='StepDisplay'>
        {React.cloneElement(createCardState.stepDisplayed, {
          allImages: [allImages, setAllImages],
          imageState: [selectedImage, setSelectedImage],
          promptState: [selectedMessage, setSelectedMessage],
          currentStep: createCardState.currentStep,
          canContinue: createCardState.canContinue,
          nextFunction: handleNext,
          steps: steps.length,
        })}
      </div>
    </div>
  );
};

export default CreateCard;
