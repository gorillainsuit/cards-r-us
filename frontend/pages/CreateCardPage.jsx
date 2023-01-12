import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/joy/Button';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { redirect } from 'react-router-dom';
import Placeholder from '../images/placeholder.jpg';

//import bg svg
import BG from '../images/bg.svg';

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
    <div className='image' key={i}>
      <img
        onClick={(e) => {
          setSelectedImage(e.target.src);
          e.style.transform = scale(1.06);
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
            <i class='fa-solid fa-magnifying-glass'></i>
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

// Step 2
const CreatePrompt = ({
  promptState,
  imageState,
  canContinue,
  currentStep,
  nextFunction,
  steps,
}) => {
  const [selectedMessage, setSelectedMessage] = promptState;
  const image = imageState[0];

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
          style={{ backgroundImage: `url(${image ?? Placeholder})` }}>
          <h2>{selectedMessage || 'Say something nice...'}</h2>
        </div>
        <div className='Next'>
          {/* The button to continue */}
          <Button
            variant='soft'
            endDecorator={<ChevronRight />}
            // disabled={!canContinue}
            onClick={nextFunction}>
            {currentStep >= steps - 1 ? 'Create' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

//step 3: confirm card
const ConfirmCard = ({
  allImages,
  imageState,
  promptState,
  confirmState,
  canContinue,
  currentStep,
  nextFunction,
  steps,
}) => {
  const [confirmedCard, setConfirmedCard] = confirmState;

  return (
    <div className='apple'>
      Hello World
      <Button
        variant='soft'
        endDecorator={<ChevronRight />}
        disabled={!canContinue}
        onClick={nextFunction}>
        {currentStep >= steps - 1 ? 'Create' : 'Next'}
      </Button>
    </div>
  );
};

// The main page component that will handle state for prompt and image generation and it will control whether the user can continue to the next step
const CreateCard = () => {
  const steps = [<CreateImg />, <CreatePrompt />, <ConfirmCard />];
  const [createCardState, setCreateCardState] = useState({
    stepDisplayed: steps[0],
    currentStep: 0,
    canContinue: false,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [confirmedCard, setConfirmedCard] = useState(null);
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

  if (
    (selectedImage || selectedMessage || confirmedCard) &&
    !createCardState.canContinue
  )
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
          confirmState: [confirmedCard, setConfirmedCard],
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
