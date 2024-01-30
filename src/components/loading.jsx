"use client"
const Loader = ({loading=false}) => {
    if(!loading) return null
    return (
      <div className="flex items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-indigo-600 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6-2.687-6-6z"
          ></path>
        </svg>
        <span className="text-lg">Cargando...</span>
      </div>
    );
  };
  
  export default Loader;
  