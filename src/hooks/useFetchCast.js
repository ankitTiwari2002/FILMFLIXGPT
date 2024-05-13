import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux";
import { addCastInfo } from "../utils/moviesSlice";

const useFetchCast = ({id}) => {
    const dispatch = useDispatch();

    const fetchCast = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/"+id+"/credits", API_OPTIONS);
        const json = await data.json();
        dispatch(addCastInfo(json.cast));
    }
    useEffect(() => {
        fetchCast();
    },[id])
}

export default useFetchCast;