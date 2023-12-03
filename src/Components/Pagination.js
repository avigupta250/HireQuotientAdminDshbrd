import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-4">
       
      <ul className="flex  items-center">
      <div className="mr-3">
            <h1>page {currentPage}{" "} of {" "} {totalPages}</h1>
        </div>
        {pageNumbers.map(number => (
          <li key={number} className={`mr-2 ${number === currentPage ? 'bg-red-500 text-white' : 'bg-gray-300'}`}>
            <button
              className="  py-2 px-4 rounded  hover:bg-blue-700 focus:outline-none"
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default Pagination