import { FaFilePdf, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import classNames from 'classnames'
import Select from '../../components/Select'
import FileTag from '../../components/FileTag'

import style from './style.module.css'

const PublicDocumentBox = ({ title, size, author, description, tag, stars, like=false }) => {
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
                // color="var(--yellow)" 
                className={classNames(
                  style.starIcon,
                  { [style.like]: like }
                )}
              />

              {stars}
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
        
        <PublicDocumentBox 
          title="Constituição Brasileira"
          author="cinatitBR"
          size="10"
          description="fdjfdlfjdklfjdslfjldjfldlfjldfjldj"
          tag="Democracia"
          stars={63}
          like={true}
        />

        <PublicDocumentBox 
          title="Probabilidade"
          author="PeDrOcA"
          size="10"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          tag="Matemática"
          stars={50}
        />

        <PublicDocumentBox 
          title="Divina Comédia Legal"
          author="Tavares"
          size="25"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          tag="Literatura"
          stars={23}
        />

        <PublicDocumentBox 
          title="Principais autores Enem"
          author="Renatovski"
          size="17"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          tag="Vestibular"
          stars={0}
        />

        <PublicDocumentBox 
          title="A Escravidão No Século XXI"
          author="alecs"
          size="15"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          tag="Sociologia"
          stars={5}
        />

      </div>
      
      <Pagination count={9} />
    </section>
  )
}

export default Explore