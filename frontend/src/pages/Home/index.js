import { useState } from 'react'
import authAPI from '../../apis/authAPI'
import Pagination, { usePagination } from '../../components/Pagination'
import DocumentPreviewList from '../../components/DocumentPreviewList'
import Searchbar from '../../components/Searchbar'
import Modal from '../../components/Modal'

import earth from '../../assets/earth.svg'
import planet from '../../assets/planet.svg'
import saturn from '../../assets/saturn.svg'
import phoebeSad from '../../assets/phoebe-sad.svg'
import stars from '../../assets/stars.svg'

import './index.css'

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
    <section id="wrapper">
      <Searchbar onChange={onKeywordChange} keyword={keyword} />

      <div className="divider"></div>

      <DocumentPreviewList files={documentPreviews} keyword={keyword} />
      
      {keyword && 
        <Pagination 
          count={paginationCount}
          pageNumber={currentPage}
          onPageChange={handlePageChange}
        />     
      }

      {!documentPreviews.length && 
        <section className="emptyIlustration show">
          <div className="text">
            <h4>There's nothing to see yet</h4>
            <h3>Search for a keyword!</h3>

            <img src={stars} alt="stars" className="stars" />
            <img src={earth} alt="earth" className="svg earth" />
            <img src={planet} alt="planet" className="svg planet" />
            <img src={saturn} alt="saturn" className="svg saturn" />
            <img 
              src={phoebeSad} 
              alt="phoebe sad" 
              className="svg phoebeSad phoebeAnimation" 
              onClick={() => setShowModal(true)}
            />

          </div>
        </section>
      } 

      <Modal show={showModal} onClose={setShowModal} className="modalGame">
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
