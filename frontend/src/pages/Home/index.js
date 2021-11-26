import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import authAPI from '../../apis/authAPI'
import DocumentPreviewList from '../../components/DocumentPreviewList'
import Searchbar from '../../components/Searchbar'

import './index.css'

const Home = () => {
  const userId = useAuth().user.id
  const [keyword, setKeyword] = useState('')
  const [documentPreviews, setDocumentPreviews] = useState([])

  const onKeywordChange = async (keyword) => {
    setKeyword(keyword)

    const response = await authAPI.search(keyword, userId)
    setDocumentPreviews(response.data)
  }

  return (
    <section id="wrapper">
      <Searchbar onChange={onKeywordChange} keyword={keyword} />

      <div className="divider"></div>

      <DocumentPreviewList documentPreviews={documentPreviews} keyword={keyword} />
    </section>
  )
}

export default Home
