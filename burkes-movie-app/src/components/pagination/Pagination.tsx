import { Dispatch, SetStateAction } from 'react';

import { generatePageNumbers } from '@/utils/generatePageNumbers';

import { PaginationItem } from './PaginationItem';
import css from './pagination.module.css';

interface Props {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: Props) => {
  const pageNumbers = generatePageNumbers(numberOfPages);

  const handleIncrement = () => {
    if (currentPage < numberOfPages) setCurrentPage((currPage) => currPage + 1);
  };

  const handleDecrement = () => {
    if (currentPage !== 1) setCurrentPage((currPage) => currPage - 1);
  };

  const shouldShowEndDots = currentPage < numberOfPages - 1;
  const shouldShowStartDots = currentPage > 4;
  const shouldRenderIntermediateNumber =
    currentPage > 3 && currentPage < numberOfPages;

  const renderPageNumbers = (pageNumbers: number[]) =>
    pageNumbers.length <= 4 ? (
      pageNumbers.map((pageNumber) => (
        <PaginationItem
          key={pageNumber}
          page={pageNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ))
    ) : (
      <>
        <PaginationItem
          page={1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <PaginationItem
          page={2}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <PaginationItem
          page={3}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {shouldShowStartDots && <div>...</div>}

        {shouldRenderIntermediateNumber && (
          <PaginationItem
            page={currentPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage > 3 && currentPage < numberOfPages - 1}

        {shouldShowEndDots && <div>...</div>}

        <PaginationItem
          page={numberOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    );

  return (
    <ul className={css.container}>
      <li className={css.button} onClick={handleDecrement}>
        PREVIOUS
      </li>

      {renderPageNumbers(pageNumbers)}

      <li className={css.button} onClick={handleIncrement}>
        NEXT
      </li>
    </ul>
  );
};
