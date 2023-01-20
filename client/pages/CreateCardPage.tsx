import React, { useEffect, useRef, useState } from 'react';
import Axios from 'axios';

import Button from '@mui/joy/Button';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import { redirect } from 'react-router-dom';
import Placeholder from '../images/testImg/img0.jpg';
import loading from '../images/loading.gif';

//import bg svg
import BG from '../images/bg.svg';
import useLoginState from '../hooks/useLoginState';

interface CreateProps {
  allImages: [
    { url: string }[],
    React.Dispatch<React.SetStateAction<{ url: string }[]>>
  ];
  imageState: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ];
  canContinue: boolean;
  currentStep: number;
  nextFunction: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  steps: number;
  promptState?: [
    MessagePrompt | null,
    React.Dispatch<React.SetStateAction<MessagePrompt | null>>
  ];
}

// Step 1
const CreateImg: React.FC<CreateProps> = ({
  allImages,
  imageState,
  canContinue,
  currentStep,
  nextFunction,
  steps,
}) => {
  const [selectedImage, setSelectedImage] = imageState;
  const [userPrompt, setUserPrompt] = useState('');
  const [imgList, setImgList] = allImages;
  const [searching, setSearching] = useState(false);
  //--DALL-E API fetch request--

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(true);
    const prompt = { userPrompt };
    fetch('/api/generate/image/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt),
    })
      .then((res) => res.json())
      .then((data) => {
        setImgList(data.data);
        setSearching(false);
      });
  };

  //--DUMMY DB Test--
  // useEffect(() => {
  //   setTimeout(() => {
  //     setImgList(testData.data);
  //   }, 600);
  // });

  const ImgResult = imgList.map((el, i) => (
    <div
      className='images
    noSelect'
      key={i}>
      <img
        className='noDrag image'
        onClick={() => {
          setSelectedImage(el.url);
        }}
        src={el.url}
      />
    </div>
  ));

  return (
    <div className='CreateImg'>
      <div className='search-part'>
        <form className='askAi-img' onSubmit={handleSubmit}>
          {/* is the type of this input box 'search'?? */}
          <input
            type='search'
            id='ai-img-bar'
            value={userPrompt}
            placeholder=' generate an image for your card... '
            onChange={(e) => setUserPrompt(e.target.value)}
          />
          <button>
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
        </form>
      </div>
      <div className='imgDisplay'>
        <div className='img-result'>
          {searching ? (
            <div className='loading'>
              <img src={loading} />
              <h1>loading</h1>
            </div>
          ) : (
            ImgResult
          )}
        </div>
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

type MessagePrompt = {
  message: string;
  color: string;
};

// Step 2  create prompt and confirm card
const CreatePrompt: React.FC<CreateProps> = ({
  allImages,
  promptState = [{ message: '', color: '' }, () => {}],
  imageState,
  canContinue,
  currentStep,
  nextFunction,
  steps,
}) => {
  const [imgList, setImgList] = allImages;
  const [selectedImage, setSelectedImage] = imageState;
  const [selectedMessage, setSelectedMessage] = promptState;
  const [textColor, setTextColor] = useState('#eef0f2');

  const image = imageState[0];

  const ImgResult = imgList.map((el, i) => (
    <div className='image' key={i}>
      <img
        className='noDrag'
        onClick={(e) => {
          setSelectedImage(el.url);
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
            onChange={(e) =>
              setSelectedMessage({ message: e.target.value, color: 'white' })
            }
            value={selectedMessage?.message ?? ''}
          />
          <input
            type='color'
            name=''
            id='color'
            onChange={(e) => {
              // setselectedMessage?.color(e.target.value);)
              if (!selectedMessage) return;
              setSelectedMessage({
                message: selectedMessage.message,
                color: e.target.value,
              });
              console.log(selectedMessage?.color);
            }}
          />
        </div>
        <div
          className='Preview'
          style={{
            backgroundImage: `url(${image ?? Placeholder})`,
            borderRadius: '1em',
          }}>
          <h2
            style={{
              color: `${selectedMessage?.color}`,
            }}>
            {selectedMessage?.message || 'Say something nice...'}
          </h2>
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

interface CardState {
  stepDisplayed: React.FC<CreateProps>;
  currentStep: number;
  canContinue: boolean;
}

// The main page component that will handle state for prompt and image generation and it will control whether the user can continue to the next step
const CreateCard = () => {
  const steps: React.FC<CreateProps>[] = [CreateImg, CreatePrompt];

  const [createCardState, setCreateCardState] = useState<CardState>({
    stepDisplayed: steps[0],
    currentStep: 0,
    canContinue: false,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessagePrompt | null>(
    null
  );
  const [allImages, setAllImages] = useState<{ url: string }[]>([]);
  const [error, setError] = useState(false);
  const { isLoggedIn } = useLoginState();

  // if (error) return new Error('Something went wrong.');
  // console.log(selectedMessage);

  const handleNext = () => {
    if (createCardState.currentStep >= steps.length - 1) {
      if (selectedMessage === null) return;
      // TODO: POST to backend with the data
      fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: selectedImage,
          message: selectedMessage.message,
          messageColor: selectedMessage.color,
        }),
      })
        .then((d) => {
          if (d.status === 401) window.location.href = '/login';
          if (d.status !== 200) {
            setError(true);
          }
          window.location.href = '/cards';
        })
        .catch((e) => {
          setError(true);
        });

      // post to backend then reedirect to the cards gallery
      // setTimeout(() => (window.location.href = '/cards'), 600);
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
        {React.createElement(createCardState.stepDisplayed, {
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
