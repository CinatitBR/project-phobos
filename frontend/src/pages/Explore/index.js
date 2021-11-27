import { useEffect, useState } from 'react'
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

  console.log(file)

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

const Pagination = ({ count }) => {
  const paginationButtons = []

  for (let i = 0; i < count; i++) {
    paginationButtons.push(<li className={style.paginationButton} key={i}>{i+1}</li>)
  }

  return (
    <ul className={style.paginationBar}>
      <li className={classNames(style.next, style.paginationButton)}><FaChevronLeft /></li>
      {paginationButtons}
      <li className={classNames(style.next, style.paginationButton)}><FaChevronRight /></li>
    </ul>
  )
}

const Explore = () => {
  const [publicDocuments, setPublicDocuments] = useState([]) 
  const userId = useAuth().user.id

  const getPublicDocuments = async () => {
    const response = await authAPI.findPublic(1, userId)

    setPublicDocuments(response.data)

    console.log(response.data)
  }

  useEffect(() => {
    getPublicDocuments()
  }, [])

  return (
    <section className={style.wrapper}>
      <div className={style.searchHeader}>
        <span className={style.currentSearch}>
          1 - 5 of 500 available documents.   
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
      
      <Pagination count={9} />
    </section>
  )
}

export default Explore