import React, { useRef,useState } from 'react';
import axios from 'axios';
import QuickButton from './QuickButton';
import { Form } from 'react-bootstrap';
import './index.css';

const App = () => {
  const API_URL = "https://api.unsplash.com/search/photos";
  const IMAGES_PER_PAGE = 20;
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const searchInput = useRef(null);
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${searchInput.current.value}&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`);
      console.log('data', data);
      setImages(data.results);
      setTotalPages(data.total_pages);
    }
    catch (error) {
      console.log(error);
    }
  }


  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
  }

  const QuickButtonhandler = (clickedButton) => {
    searchInput.current.value = clickedButton;
    fetchImages();
  };


  return (
    <div className='container'>
      <h1 className='title'>Unsplash Image Search</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Enter something to search here'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>

      <div className='filters'>
        <QuickButton Name={"Nature"} onQuickButtonClick={QuickButtonhandler} />
        <QuickButton Name={"Birds"} onQuickButtonClick={QuickButtonhandler} />
        <QuickButton Name={"Dogs"} onQuickButtonClick={QuickButtonhandler} />
        <QuickButton Name={"Sports"} onQuickButtonClick={QuickButtonhandler} />
        {/* <div onClick={()=> handleQuickButton('Nature')}>Nature</div>
        <div onClick={()=> handleQuickButton('Birds')}>Birds</div>
        <div onClick={()=> handleQuickButton('Dogs')}>Dogs</div>
        <div onClick={()=> handleQuickButton('Sports')}>Sports</div> */}
        
      </div>
      <div className='images'>
        {images.map((image) => {
          return (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              className='image'
            />
          );
        })}
      </div>

    </div>
  );
};

export default App;