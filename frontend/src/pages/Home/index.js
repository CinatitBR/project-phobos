import { useState } from 'react'
import authAPI from '../../apis/authAPI'
import Pagination, { usePagination } from '../../components/Pagination'
import DocumentPreviewList from '../../components/DocumentPreviewList'
import Searchbar from '../../components/Searchbar'
import Modal from '../../components/Modal'
import Select from '../../components/Select'

import earth from '../../assets/earth.svg'
import planet from '../../assets/planet.svg'
import saturn from '../../assets/saturn.svg'
import phoebeSad from '../../assets/phoebe-sad.svg'
import stars from '../../assets/stars.svg'

import style from './style.module.css'

const Home = () => {
  const queryLimit = 10
  const [keyword, setKeyword] = useState('')
  const [documentPreviews, setDocumentPreviews] = useState([])
  const [showModal, setShowModal] = useState(false)

  const { currentPage, handlePageChange } = usePagination()
  const [totalPages, setTotalPages] = useState(0)
  const paginationCount = Math.ceil(totalPages / queryLimit)

  const onKeywordChange = async (keyword) => {
    setKeyword(keyword)

    const response = await authAPI.search(keyword, currentPage, queryLimit)
    const { files, total } = response.data

    setDocumentPreviews(files)
    setTotalPages(total)
  }

  return (
    <section id={style.wrapper}>
      <header>
        <Searchbar onChange={onKeywordChange} keyword={keyword} />

        <Select 
          className={style.select}
          label="All"
          items={[{ id: 0, text: 'TCC' }, { id: 1, text: 'Game Design' }]} 
          onSelect={() => null}
        />
      </header>

      <div className={style.divider}></div>

      <DocumentPreviewList files={documentPreviews} keyword={keyword} />
      
      {keyword && 
        <Pagination 
          count={paginationCount}
          pageNumber={currentPage}
          onPageChange={handlePageChange}
        />     
      }

      {!documentPreviews.length && 
        <section className={`${style.emptyIlustration} ${style.show}`}>
          <div className={style.text}>
            <h4>There's nothing to see yet</h4>
            <h3>Search for a keyword!</h3>

            <img src={stars} alt="stars" className={style.stars} />
            <img src={earth} alt="earth" className={`${style.svg} ${style.earth}`} />
            <img src={planet} alt="planet" className={`${style.svg} ${style.planet}`} />
            <img src={saturn} alt="saturn" className={`${style.svg} ${style.saturn}`} />
            <img 
              src={phoebeSad} 
              alt="phoebe sad" 
              className={`${style.svg} ${style.phoebeSad} phoebeAnimation`}
              onClick={() => setShowModal(true)}
            />

          </div>
        </section>
      } 

      <Modal show={showModal} onClose={setShowModal} className={style.modalGame}>
        <iframe 
          src="/phobos-game/index.html" 
          frameBorder="0" 
          title="Phobos game"
        ></iframe>
      </Modal>

    </section>
  )
}

export default Home
