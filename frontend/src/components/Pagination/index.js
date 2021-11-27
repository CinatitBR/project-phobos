import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import classNames from 'classnames'

import style from './style.module.css'

const Pagination = ({ count, pageNumber, onPageChange }) => {
  const paginationButtons = []

  for (let i = 0; i < count; i++) {
    paginationButtons.push(
      <li 
        key={i}
        className={classNames(
          style.paginationButton,
          { [style.currentPage]: (i+1) === pageNumber }
        )} 
        onClick={() => onPageChange(i+1)}
      >
        {i+1}
      </li>
    )
  }

  return (
    <ul className={style.paginationBar}>
      {pageNumber !== 1 &&
        <li 
          className={classNames(
            style.next, 
            style.paginationButton
          )}
          onClick={() => onPageChange(pageNumber - 1)}
        >
          <FaChevronLeft />
        </li>
      }

      {paginationButtons}

      {pageNumber !== count &&
        <li 
          className={classNames(
            style.next, 
            style.paginationButton
          )}
          onClick={() => onPageChange(pageNumber + 1)}
        >
          <FaChevronRight />
        </li>
      }
    </ul>
  )
}

export default Pagination