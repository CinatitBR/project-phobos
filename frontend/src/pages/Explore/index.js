import { useEffect, useState } from 'react'
import { FaFilePdf, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import classNames from 'classnames'
import Select from '../../components/Select'
import FileTag from '../../components/FileTag'

import style from './style.module.css'

const PublicDocumentBox = ({ id, title, size, author, description, tag, stars, liked }) => {
  const [isLiked, setIsLiked] = useState(liked)
  const [updatedStars, setUpdatedStars] = useState(stars)
  const userId = useAuth().user.id

  const handleLike = async (e) => {
    const action = isLiked ? 'unlike' : 'like'

    // Update UI
    setIsLiked(!isLiked)
    setUpdatedStars(prevState => action === 'like' ? (prevState + 1) : (prevState - 1))

    // Update backend
    await authAPI.stars(action, id, userId)
  }

  return (
    <article className={style.publicDocumentBox}>
      <FaFilePdf fontSize="60px" color="var(--salmon)" />

      <div className={style.content}>
        <header>
          <div className={style.leftInfo}>
            <h3 className={style.title}>{title}</h3>

            <span className={style.author}>By {author}</span>
          </div>

          <div className={style.rightInfo}>
            <div className={style.size}>
              <span>{size} MB</span>
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
          </div>
        </header>

        <div className={style.description}>
          {description}
        </div>

        <FileTag>{tag}</FileTag>
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
            id={doc.id}
            title={doc.title}
            author={doc.username}
            size={doc.size}
            description="fdjfdlfjdklfjdslfjldjfldlfjldfjldj"
            tag={doc.tag_name}
            stars={doc.stars}
            liked={doc.is_liked}
          />
        )}
      </div>
      
      <Pagination count={9} />
    </section>
  )
}

export default Explore