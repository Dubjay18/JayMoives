import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../axios";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import Header from "../../components/Header";
import YouTube from "react-youtube";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useStateValue } from "../../stateProvider";
function Series() {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [{ darkmode }, dispatch] = useStateValue();
  const [genres, setGenres] = React.useState([]);
  const [movie, setMovie] = React.useState([]);
  const [trailerUrl, setTrailerUrl] = React.useState("");
  const [ready, setReady] = React.useState(false);
  setTimeout(() => {
    setReady(true);
  }, 1000);
  const router = useRouter();
  const opts = {
    height: "390",
    width: "100%",
    playersVars: {
      autoplay: 1,
    },
  };
  const { tv } = router.query;
  const API_KEY = "c7ad2f9f56b2f7935e7da5cf937bba66";
  useEffect(() => {
    axios
      .get(`/tv/${tv}?api_key=${API_KEY}&languages=en-US`)
      .then((res) => {
        setMovie(res?.data);
        console.log(res?.data);
        if (res.data.genres) {
          setGenres(res.data.genres);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`/tv/${tv}/videos?api_key=${API_KEY}&languages=en-US`)
      .then((res) => {
        setTrailerUrl(res.data.results[res.data.results.length - 1].key);
      });
  }, [tv]);

  const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <div
      data-theme={darkmode ? "halloween" : "cupcake"}
      className={"bg-base-100 w-full "}
    >
      <Header />
      <ReactPlaceholder
        showLoadingAnimation
        ready={ready}
        rows={5}
        type="text"
        className="max-w-screen-md mx-auto mt-10 p-10"
      >
        <div className="max-w-screen-md mx-auto mt-10 p-10 text-primary bg-base-300">
          <h1 className="  sm:text-5xl text-2xl font-bold mb-9 font-poppins">
            {movie?.title || movie?.original_title || movie?.name}
            {movie.first_air_date
              ? `(${movie?.first_air_date?.substring(0, 4)})`
              : ""}
          </h1>
          <LazyLoadImage
            src={`${baseUrl}${movie?.poster_path || movie?.backdrop_path}`}
            className="w-full"
            height={700}
          />
          {
            <p className="flex sm:text-xl font-medium  my-6">
              <span className="underline">Genre: </span>
              {genres.map((e, i) => {
                return (
                  <span className="ml-2" key={i}>
                    {e.name}
                    {i === genres.length - 1 ? "." : ","}
                  </span>
                );
              })}
            </p>
          }
          <p className="sm:text-xl  italic   mb-6">
            <span className="underline font-medium">Details</span>:{" "}
            {movie?.overview}
          </p>
          {trailerUrl ? (
            <YouTube videoId={trailerUrl} opts={opts} />
          ) : (
            <h1 className=" italic font-thin text-neutral ">
              Trailer not avaliable
            </h1>
          )}
        </div>
      </ReactPlaceholder>
    </div>
  );
}

export default Series;
