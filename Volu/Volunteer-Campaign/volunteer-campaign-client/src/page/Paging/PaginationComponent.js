import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  // Tạo một mảng chứa số trang để hiển thị
  const pageNumbers = Array.from(Array(totalPages).keys());

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`pagination-btn ${
            pageNumber + 1 === currentPage ? "active" : ""
          }`}
          onClick={() => onPageChange(pageNumber + 1)}
        >
          {pageNumber + 1}
        </button>
      ))}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

export default PaginationComponent;
