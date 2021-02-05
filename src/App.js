import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
function App({ slides, logoUrl }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const timeoutRef = useRef(null);

  const handleSlideTimeout = useCallback(() => {
    if (currentSlideIdx < slides.length - 1) {
      console.log('Pause recording from template');
      setCurrentSlideIdx(currentSlideIdx + 1);
      console.log('Resume recording from template');
    } else {
      console.log('Stop recording from template');
    }
  }, [currentSlideIdx, slides]);

  useEffect(() => {
    console.log('Start recording from template');
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleSlideTimeout, slides[currentSlideIdx].seconds * 1000);
  }, [currentSlideIdx, handleSlideTimeout, slides]);

  return (
    <div className="App">
      {slides.map((slide, index) => (
        <section
          key={index}
          className={currentSlideIdx === index ? 'slide active': 'slide'}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          <p>{slide.content}</p>
        </section>
      ))}
      <img
        alt="logo"
        src={logoUrl}
        className="logo"
      />
    </div>
  );
}

App.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    seconds: PropTypes.number.isRequired
  })).isRequired,
  logoUrl: PropTypes.string.isRequired,
}

App.defaultProps = {
  logoUrl: 'https://outfit-v2-exports-production.s3.ap-southeast-2.amazonaws.com/media_library_items/abd7eee50699a6c8b852e7c6e704f434/outfit-logo.svg',
  slides: [
    {
      imageUrl: 'https://media1.giphy.com/media/xKDTLosMl4XZu/giphy.gif',
      content: 'This is page 1',
      seconds: 5,
    },
    {
      imageUrl: 'https://media3.giphy.com/media/qKmWi9mfycx6E/giphy.gif',
      content: 'This is page 2',
      seconds: 5,
    },
    {
      imageUrl: 'https://media1.giphy.com/media/yALcFbrKshfoY/giphy.gif',
      content: 'This is page 3',
      seconds: 5,
    },
    {
      imageUrl: 'https://media1.giphy.com/media/coaTo9TVvOOIg/giphy.gif',
      content: 'This is page 4',
      seconds: 5,
    }
  ]
}


export default App;
