'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import Loading from '../components/Loading';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { IoArrowBackOutline } from "react-icons/io5";
import {incrementPage, decrementPage, searchMovies } from "../redux/slices/searchMoviesSlice"

const SearchContent = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { results, status, currentPage, totalPages } = useSelector((state) => state.searchMovies);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('query');

    useEffect(() => {
        if (searchQuery) {
            dispatch(searchMovies({ query: searchQuery, page: currentPage }));
        }
    }, [searchQuery, currentPage, dispatch]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            dispatch(decrementPage(-1));
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(incrementPage(1));
        }
    };

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="px-5 lg:px-10 py-5 lg:py-10">
                <Header />

                {
                    searchQuery ? (
                        status === 'succeeded' && results.length > 0 ? (
                            <div className="space-y-5 mt-10">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.back()}>
                                    <IoArrowBackOutline className="text-black text-xl" />
                                    <p className="text-xl font-medium text-black">Go back</p>
                                </div>
                                <div className="mt-20 divide-y divide-black">
                                    {results.map(movie => (
                                        <Link key={movie.id} href={`/${movie.id}`} className="flex gap-2 py-4 w-full">
                                            <div className="w-32 h-32 relative rounded-lg overflow-hidden">
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                                    alt={movie.title}
                                                    fill
                                                    priority
                                                    className="object-cover"
                                                />
                                            </div>
                                            <p className="font-medium text-base md:text-lg lg:text-2xl flex-1">{movie.title}</p>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-center gap-5 mt-5">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={handlePrevPage}
                                        className={`px-4 py-2 border border-black ${currentPage === 1 ? ' cursor-not-allowed' : 'text-black'}`}
                                    >
                                        <PiCaretLeftBold className="text-black text-2xl" />
                                    </button>
                                    <p className="text-black text-2xl">{currentPage}</p>
                                    <button
                                        disabled={currentPage >= totalPages}
                                        onClick={handleNextPage}
                                        className="px-4 py-2 border border-black text-black"
                                    >
                                        <PiCaretRightBold className="text-black text-2xl" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-xl w-screen h-screen flex items-center justify-center">Seems we couldn&apos;t find anything</p>
                        )
                    ) : (
                        <p className="text-center text-2xl opacity-50 italic w-screen h-screen flex items-center justify-center">
                            Search to see movies.
                        </p>
                    )
                }
            </div>
        </Suspense>
    );
};



const SearchPage = () => {
    return (
      <Suspense fallback={<Loading />}>
        <SearchContent />
      </Suspense>
    );
  };
  
  export default SearchPage;


