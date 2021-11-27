import { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { FaFilePdf, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import classNames from 'classnames'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import Select from '../../components/Select'
import FileTag from '../../components/FileTag'
import { Button } from '../../components/Buttons'

import style from './style.module.css'

const PublicDocumentBox = ({ file }) => {
  const [isLiked, setIsLiked] = useState(file.is_liked)
  const [isAdded, setIsAdded] = useState(file.is_added)
  const [updatedStars, setUpdatedStars] = useState(file.stars)
  const userId = useAuth().user.id
  
  const handleLike = async (e) => {
    const action = isLiked ? 'unlike' : 'like'

    // Update UI
    setIsLiked(!isLiked)
    setUpdatedStars(prevState => action === 'like' ? (prevState + 1) : (prevState - 1))

    // Update backend
    await authAPI.stars(action, file.id, userId)
  }

  // Add document to user library
  const handleAddToLibrary = async () => {
    await authAPI.addToLibrary(file.id, userId)

    setIsAdded(true)
  } 

  const handleRemoveFromLibrary = async () => {
    await authAPI.removeFromLibrary(file.id, userId)

    setIsAdded(false)
  } 

  return (
    <article className={style.publicDocumentBox}>
      <FaFilePdf fontSize="60px" color="var(--salmon)" />

      <div className={style.content}>
        <header>
          <div className={style.leftInfo}>
            <h3 className={style.title}>{file.title}</h3>

            <span className={style.author}>By {file.author}</span>
          </div>

          <div className={style.rightInfo}>
            <div className={style.size}>
              <span>{file.size} MB</span>
              Size
            </div>

            <div className={style.stars}>
              <FaStar 
                fontSize="20px" 
                className={classNames(
                  style.starIcon,
                  { [style.liked]: isLiked }
                )}
                onClick={handleLike}
              />

              {updatedStars}
            </div>
            
            {(!isAdded && file.authorId !== userId) && 
              <Button 
                className={classNames(style.button, style.addButton)}
                onClick={handleAddToLibrary}
              >
                Add to library
              </Button>
            }

            {(isAdded && file.authorId !== userId) &&
              <Button 
                className={classNames(style.button, style.removeButton)}
                onClick={handleRemoveFromLibrary}
              >
                Remove from library
              </Button> 
            }

          </div>
        </header>

        <div className={style.description}>
          {'fjdjfojfjdsjfjjdfjsfjsjodjfojsodjfjdsjfjosdjifojiosdjfojsofjodsjfjosjofjdsofjjdsjfjsodfjosdjfojodsjfoj'}
        </div>

        <FileTag>{file.tag_name}</FileTag>
      </div>
    </article>
  )
}

const Pagination = ({ count, pageNumber, onNext, onPrevious, onPageChange }) => {
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

const Explore = () => {
  const queryLimit = 20

  const [publicDocuments, setPublicDocuments] = useState([]) 
  const userId = useAuth().user.id
  const location = useLocation()
  const history = useHistory()
  const { page = 1 } = queryString.parse(location.search)
  const [currentPage, setCurrentPage] = useState(parseInt(page))
  const [totalPages, setTotalPages] = useState(0)

  const paginationCount = Math.ceil(totalPages / queryLimit)

  // Get documents
  useEffect(() => {
    const getPublicDocuments = async () => {
      const response = await authAPI.findPublic(currentPage, userId)
      const { files, total } = response.data
  
      setPublicDocuments(files)
      setTotalPages(total)
    }

    getPublicDocuments()
  }, [currentPage, userId])

  // Update page url
  useEffect(() => {
    const newParams = new URLSearchParams()
    newParams.append('page', currentPage)

    history.push({ search: newParams.toString() })
  }, [currentPage, history])

  return (
    <section className={style.wrapper}>
      <div className={style.searchHeader}>
        <span className={style.currentSearch}>
          {totalPages} available documents.   
        </span>

        <Select 
          items={[
            {text: 'Most Recent', id: 0},
            {text: 'Popular', id: 1}
          ]}
          onSelect={() => {}}
          style={{ 
            maxWidth: '200px', 
            background: 'var(--background-light)',
            fontSize: '14px' 
          }}
        />
      </div>

      <div className={style.searchResults}>
        {publicDocuments.map(doc => 
          <PublicDocumentBox 
            key={doc.id}
            file={doc}
          />
        )}
      </div>
      
      <Pagination 
        count={paginationCount} 
        pageNumber={currentPage} 
        onPageChange={pageNumber => setCurrentPage(pageNumber)}
        // onNext={() => setCurrentPage(state => state + 1)}
        // onPrevious={() => setCurrentPage(state => state - 1)}
      />
    </section>
  )
}

export default Explore