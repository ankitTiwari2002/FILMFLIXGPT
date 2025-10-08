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
    //API call
    try {
    setLoader(true)

    const searchText = search.current.value;
    if(searchText.trim() == "") return;
    const response = await runChat(`Act as a Movie Recommendation system and suggest me 5 movies from the query: ${searchText}. Only give me movie names and also include ${searchText} in your result as a first name seperated by "," like the result given ahead. Example: Gadar, Sholay, Don, Goalmaal, Krish.`);
    
    const gptMovies = response.split(",").map(movie => movie.trim());
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    console.log("GPT Movies:", gptMovies);
    console.log("TMDB Results:", tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    } catch (error) {
      console.log(error.message)
    } finally {
      setPrompt("");
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
           { loader ? "Loading..." : lang[langKey]?.search }
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
