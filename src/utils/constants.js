// export const LOGO =
//   "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";


export const USER_PHOTO =
  "https://avatars.githubusercontent.com/u/111851101?v=4";
export const BACKGROUND_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b0bec7d03085/IN-en-20240115-trifectadaily-perspective_alpha_website_medium.jpg";
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

export const IMG_URL = "https://image.tmdb.org/t/p/w500";

export const LANGUAGE_SUPORTED = [
  {
    identifire: "en",
    name: "English",
  },
  {
    identifire: "hindi",
    name: "Hindi",
  },
  {
    identifire: "spanish",
    name: "Spanish",
  },
];
export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

export const img_URL = "https://image.tmdb.org/t/p/original"
