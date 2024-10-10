import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Updated import
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import SearchResults from './SearchResults';
import { searchMovies, resetSearch } from '../redux/slices/movieSlice';
import tv from '../../../public/tv.svg';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  const { searchResults, searchStatus } = useSelector((state) => state.movies);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchResultsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    handleResetSearch();
    setIsSearchResultsVisible(false);
  }, [pathname]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchMovies({ query: searchQuery, page: 1 }));
      setIsSearchResultsVisible(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResetSearch = () => {
    dispatch(resetSearch());
    setSearchQuery('');
  };

  const handleSeeMore = () => {
    searchQuery.trim();
    router.push(`/search?query=${searchQuery}`).then(() => {
      handleResetSearch();
    });
  };

  return (
    <div className="relative w-screen" ref={searchRef}>
      <div className="flex flex-col md:flex-row md:justify-between absolute top-0 left-0 z-10 w-screen px-5 gap-2 lg:px-10 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 h-fit w-fit">
          <Image src={tv} alt="logo" width={50} height={50} />
          <p className="text-xl font-semibold text-white hidden md:flex">Movie Box</p>
        </Link>
        {/* Search area */}
        <div className="space-y-5 w-full md:w-[500px]">
          {/* Search box */}
          <div className="flex gap-1 h-10 border-[1.4px] border-white rounded-lg overflow-hidden items-center px-2 flex-1 md:flex-none backdrop-blur-md">
            <input
              type="text"
              className="flex-1 bg-transparent h-full text-white placeholder:text-white outline-none"
              placeholder="What do you want to watch?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {
              searchStatus === 'loading' ? (
                <AiOutlineLoading3Quarters
                  className="text-white text-2xl cursor-pointer animate-spin duration-300"
                />
              ) : (
                <MdSearch
                  className="text-white text-2xl cursor-pointer"
                  onClick={handleSearch}
                />
              )
            }
          </div>

          {isSearchResultsVisible && (
            <div className="backdrop-blur-md">
              {/* No results found */}
              {searchStatus === 'succeeded' && searchResults.length === 0 && (
                <p className="text-white border-[1.4px] rounded-lg p-2 py-10 flex items-center justify-center">No results found</p>
              )}

              {/* Render search results */}
              {searchStatus === 'succeeded' && searchResults.length > 0 && (
                <div className="space-y-4 w-full ml-auto">
                  <SearchResults results={searchResults} />

                  {/* Link to See More */}
                  <Link
                    href={{ pathname: "/search", query: { query: searchQuery } }}
                    onClick={handleSeeMore}
                    className="text-white border-[1.4px] rounded-lg p-2 cursor-pointer flex items-center justify-center hover:bg-white/10 transition-all duration-300 ease-in-out"
                  >
                    See more
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
