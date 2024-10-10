import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MdSearch } from 'react-icons/md';
import tv from '../../../public/tv.svg';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/search?query=${searchQuery}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
            <div className="flex flex-col md:flex-row md:justify-between w-full gap-2">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 h-fit w-fit">
                    <Image src={tv} alt="logo" width={50} height={50} />
                    <p className="text-xl font-semibold text-black hidden md:flex">Movie Box</p>
                </Link>
                {/* Search area */}
                <div className="space-y-5 w-full md:w-[500px]">
                    {/* Search box */}
                    <div className="flex gap-1 h-10 border-[1.4px] border-black rounded-lg overflow-hidden items-center px-2 flex-1 md:flex-none backdrop-blur-md">
                        <input
                            type="text"
                            className="flex-1 bg-transparent h-full text-black placeholder:text-black outline-none"
                            placeholder="What do you want to watch?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <MdSearch
                            className="text-black text-2xl cursor-pointer"
                            onClick={handleSearch}
                        />
                    </div>
                </div>
            </div>

    );
};

export default Header;
