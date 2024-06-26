import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import runChat from "../utils/gemini";
import Loading from "./Loading"

function GptSearchBar() {
  const search = useRef(null);
  const [loader, setLoader] = useState(false)

  const langKey = useSelector((store) => store.config?.lang);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    setLoader(true)
    const searchText = search.current.value;
    const response = await runChat(`Act as a Movie Recommendation system and suggest me 10 movies from the query: ${searchText}. Only give me names of one movie, comma separated like the result given ahead. Example: Gadar, Sholay, Don, Goalmaal, Krish`);
    
    const gptMovies = response.split(",").map(movie => movie.trim());
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    console.log("GPT Movies:", gptMovies);
    console.log("TMDB Results:", tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    setLoader(false);
    //API call
    try {
      const response = await runChat("Act as a Movie Recommendation system and suggest me 10 movies from the query:" + prompt + "only give me names of one movie, comma seperated like the result given ahead. Example: Gadar, Sholay, Don, Goalmaal, Krish")
  
      console.log("coming from here : ", response)
      console.log(typeof (response))
  
      const gptMovies = response.split(",");
  
  
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoader(false)
    }
  };
  return (
    <div className="pt-[50%] md:pt-[12%] flex flex-wrap">
      <form
        className="w-full md:w-1/3 md:mx-auto flex gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="w-96 px-3 py-3 text-lg rounded-lg"
          ref={search}
          placeholder={lang[langKey]?.gptSearchPlaceHolder}
        />
        <button
          className="px-4 py-2 rounded-lg text-white bg-red-600"
          onClick={handleGptSearch}
        >
          {lang[langKey]?.search}

        </button>
      </form>
      {loader?<Loading/>:null}

      {loader ? <Loading /> : null}
    </div>
  );
}

export default GptSearchBar;
