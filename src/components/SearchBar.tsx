import React, { useRef, useState } from 'react'

interface SearchBarProps {
    wordsInput: string[];
}

const SearchBar = ({ wordsInput }: SearchBarProps): JSX.Element => {
    const [activeSearch, setActiveSearch] = useState<string[]>([])
    const [searchValue, setSearchValue] = useState<string>('');
    const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setDropdownVisible(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        if (e.target.value === '') {
            setActiveSearch([])
            return false
        }
        setActiveSearch(wordsInput?.filter(w => w.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 8))
    }

    const handleDropdownClick = (value: string): void => {
        setSearchValue(value);
        setActiveSearch([]); // Hide the dropdown after selection
    };

    const handleBlur = () => {
        // Delay closing the dropdown to handle the click on dropdown options
        setTimeout(() => setDropdownVisible(false), 100);
    };

    return (
        <div>
            <form>
                <div className="relative" onBlur={handleBlur}>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search" required
                        value={searchValue} onChange={(e) => { handleSearch(e) }} onFocus={() => setDropdownVisible(true)}
                    />
                    {
                        isDropdownVisible && activeSearch.length > 0 && (
                            <div className="absolute top-13 p-4 text-black w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 bg-slate-100 max-h-56 overflow-y-auto">
                                <ul>
                                    {
                                        activeSearch.map(s => (
                                            <li key={s} onMouseDown={() => handleDropdownClick(s)} className="cursor-pointer hover:bg-gray-200 py-2 px-2 hover:rounded-lg">{s}</li>
                                        ))
                                    }

                                </ul>
                            </div>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default SearchBar