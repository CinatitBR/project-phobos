import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import Pagination, { usePagination } from '../../components/Pagination'
import DocumentPreviewList from '../../components/DocumentPreviewList'
import Searchbar from '../../components/Searchbar'

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
  const { currentPage, handlePageChange } = usePagination()

  const onKeywordChange = async (keyword) => {
    setKeyword(keyword)

    const response = await authAPI.search(keyword, currentPage, queryLimit)
    setDocumentPreviews(response.data)
  }

  return (
    <section id="wrapper">
      <Searchbar onChange={onKeywordChange} keyword={keyword} />

      <div className="divider"></div>

      <DocumentPreviewList files={documentPreviews} keyword={keyword} />
      
      {keyword && 
        <Pagination 
          count={6}
          pageNumber={currentPage}
          onPageChange={handlePageChange}
        />     
      }

      {!keyword && 
        <section className="emptyIlustration show">
          <div className="text">
            <h4>There's nothing to see yet</h4>
            <h3>Search for a keyword!</h3>

            <img src={stars} alt="stars" className="stars" />
            <img src={earth} alt="earth" className="svg earth" />
            <img src={planet} alt="planet" className="svg planet" />
            <img src={saturn} alt="saturn" className="svg saturn" />
            <img src={phoebeSad} alt="phoebe sad" className="svg phoebeSad phoebeAnimation" />
          </div>
        </section>
      } 
    </section>
  )
}

export default Home
