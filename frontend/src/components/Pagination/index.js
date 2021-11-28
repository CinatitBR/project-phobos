import { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'
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

  // If there is only one page, return null
  if (count === 1) return null

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

export const usePagination = () => {
  const location = useLocation()
  const history = useHistory()

  const { page = 1 } = queryString.parse(location.search)
  const [currentPage, setCurrentPage] = useState(parseInt(page))

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Update page url
  useEffect(() => {
    const newParams = new URLSearchParams()
    newParams.append('page', currentPage)

    history.push({ search: newParams.toString() })
  }, [currentPage, history])

  return {
    handlePageChange,
    currentPage
  }
}

export default Pagination