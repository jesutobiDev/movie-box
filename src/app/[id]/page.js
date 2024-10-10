'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieById } from '../redux/slices/movieSlice';
import Image from 'next/image';
import { FaRegStar } from "react-icons/fa";
import { formatDate } from '../utilities/dateFormatter'
import { convertMinutesToHoursAndMinutes } from '../utilities/timeConvertter';
import Loading from '../components/Loading';
import NotFound from '../not-found';
import { IoArrowBackOutline } from "react-icons/io5";
import Header from '../components/Header';

const MoviePage = () => {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    // Access the movie state from the Redux store
    const movie = useSelector((state) => state.movies.movie);
    const status = useSelector((state) => state.movies.status);
    const error = useSelector((state) => state.movies.error);

    useEffect(() => {
        const fetchMovie = async () => {
            dispatch(getMovieById(id));
            setLoading(false);
        };

        fetchMovie();
    }, [dispatch, id]);

    if (loading || status === 'loading') {
        return <Loading />;
    }


    if (status === 'failed') {
        return <NotFound />;
    }

    return (
        <div className="px-5 lg:px-10 py-5 lg:py-10">
            <Header/>
            {movie ? (
                <div className="space-y-5 mt-10">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.back()}>
                        <IoArrowBackOutline className="text-black text-xl" />
                        <p className="text-xl font-medium text-black">Go back</p>
                    </div>
                    <div className="h-auto flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10">
                        <div className="min-w-[300px] w-full md:w-auto h-[500px] lg:h-[500px] relative shadow-lg" >
                            <Image
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="text-black space-y-5 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mt-5">
                                {
                                    movie.genres.map((genre, index) => (
                                        <span key={index} className="inline-block border border-black px-2 py-1 text-sm font-semibold rounded-full">
                                            {genre.name}
                                        </span>
                                    ))
                                }
                            </div>
                            <p className="text-3xl font-medium">{movie.title}</p>
                            <p>{movie.overview}</p>
                            <div className="flex items-center gap-3 flex-wrap pb-10">
                                <div className="flex items-baseline gap-1">
                                    <FaRegStar size={15} />
                                    <p>{(movie.vote_average).toFixed(1)}/10</p>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-black"></div>
                                <p>{convertMinutesToHoursAndMinutes(movie.runtime)}</p>
                                <div className="w-1 h-1 rounded-full bg-black"></div>
                                <p className="">{formatDate(movie.release_date)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No movie details found.</p>
            )}
        </div>
    );
};

export default MoviePage;
