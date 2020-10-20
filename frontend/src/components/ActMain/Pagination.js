import React from 'react';
import styled from "styled-components";

const Paginationstyle = styled.div`

`;

const Pagination = ({ total }) => {
  const pageNumber = [];
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

   // Math.ceil: 올림
  //  for (let i = 1; i <= Math.ceil(totalActs / actsPerPage); i++) {
  //   pageNumber.push(i);
  // }

  return (
    <Paginationstyle>
      {/* <div className="pagination">
        {pageNumber.map((pageNum) => (
          <div
            key={pageNum}
            className="pagination_item"
            onClick={() => paginate(pageNum)}
          >
            {pageNum}
          </div>
        ))}
      </div> */}
    </Paginationstyle>
  );
  return null;
}


export default Pagination;