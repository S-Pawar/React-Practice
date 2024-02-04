// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import QuickButton from "./QuickButton";
import { Form, Button } from "react-bootstrap";
import ImageAndTooltips from "./ImageAndTooltips"
import "./index.css";

const App = () => {
  const BASE_URL = "https://api.unsplash.com";
  const API_URL = "https://api.unsplash.com/search/photos";
  const IMAGES_PER_PAGE = 20;
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const searchInput = useRef(null);
  const [loading, setLoading] = useState(false);
  //TODO add random bg
  // eslint-disable-next-line no-unused-vars
  const fetchbackgroundImage = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/photos/random&client_id=${import.meta.env.VITE_API_KEY}`
      );
      console.log("bg data", data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchbackgroundImage();
  // }, []);

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );

        console.log("data", data);
        setImages(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  const resetSearch = () => {
    fetchImages();
    setPage(1);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  };

  const QuickButtonhandler = (clickedButton) => {
    searchInput.current.value = clickedButton;
    resetSearch();
  };
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="container">
      <h1 className="title">Unsplash Image Search</h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Enter something to search here"
            className="search-input"
            ref={searchInput}
            onChange={handleSearch}
          />
        </Form>
      </div>

      <div className="filters">
        <QuickButton Name={"Nature"} onQuickButtonClick={QuickButtonhandler} />
        <QuickButton Name={"Birds"} onQuickButtonClick={QuickButtonhandler} />
        <QuickButton Name={"Dogs"} onQuickButtonClick={QuickButtonhandler} />
        <QuickButton Name={"Sports"} onQuickButtonClick={QuickButtonhandler} />
      
      </div>
    

      {loading ? (
        <p className="loading">Loading💫</p>
      ) : (
        <>
        <ImageAndTooltips images={images}/>
        
        </>
      )}

      <div className="buttons">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default App;
