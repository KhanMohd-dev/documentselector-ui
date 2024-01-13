import { FC } from 'react';
import { buttonNames, headings } from '../common/common';
import { Link, useLocation } from 'react-router-dom';

const Header: FC = () => {
    const location = useLocation();
    const path = decodeURIComponent(location.pathname.replace('/', ''));

    const headingValue = Object.prototype.hasOwnProperty.call(headings, path)
    ? (headings as any)[path].value
    : '';

    return (
        <div className="justify-between shadow-lg">
            <div className="flex justify-between p-5">
                <h3 className="text-2xl font-bold">{headingValue}</h3>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-black mx-1">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    Save & Close
                </button>
            </div>

            <div className="flex justify-center pt-0 pb-4">
                {buttonNames.map((name: string, index: number) => (
                    <>
                        <button key={index} className={`bg-white text-green-600 font-semibold py-2 px-4 border rounded shadow ml-2 mr-2 ${name.toLowerCase() === path.toLowerCase() ? 'bg-orange-200 border-orange-500': 'border-gray-400'}`}>
                            {<Link to={`/${name.toLowerCase()}`}>{name}</Link>}
                        </button>
                        {index < buttonNames.length - 1 &&
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-3 mt-3 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>
                        }
                    </>
                ))}
            </div>
        </div>
    )
}

export default Header;