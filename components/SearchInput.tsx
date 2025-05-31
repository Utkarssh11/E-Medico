import React from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // No specific new props needed for now, relies on standard input attributes
  // value and onChange should be passed by the parent.
}

const SearchInput: React.FC<SearchInputProps> = ({ className, ...props }) => {
  return (
    <div className={`relative flex items-center ${className || ''}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-slate-400 dark:text-slate-500 group-focus-within:text-primary-DEFAULT dark:group-focus-within:text-primary-light transition-colors duration-200"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="search"
        {...props}
        className={`
          w-full pl-10 pr-4 py-2.5 
          text-sm text-slate-800 dark:text-slate-100
          bg-white dark:bg-slate-700/60 
          border border-slate-300 dark:border-slate-600 
          rounded-lg shadow-sm 
          placeholder-slate-400 dark:placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/80 dark:focus:ring-primary-light/80
          focus:border-primary-DEFAULT dark:focus:border-primary-light
          hover:border-slate-400 dark:hover:border-slate-500
          transition-all duration-200 ease-in-out
          group 
        `}
      />
    </div>
  );
};

export default SearchInput;
