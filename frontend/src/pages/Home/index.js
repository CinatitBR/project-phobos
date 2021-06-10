import DocumentPreviewList from '../../components/DocumentPreviewList'
import Searchbar from '../../components/Searchbar'
import Sidebar from '../../components/Sidebar'

import './index.css'

const documentPreviews = [
  {
    id: 1,
    title: 'The Anatomy of a Large-Scale Hypertextual',
    number: 1,
    body: `
      ...In this paper, we present Google, a prototype of a
      large-scale search engine which makes heavyuse of the structure
      present in hypertext. Google is designed to crawl and index the
      Web efficientlyand produce much more satisfying search results
      than existing systems. The prototype with a fulltext and hyperlink 
      database of at least 24 million pages is available at http://google.stanford.edu/To
      engineer a search engine is a challenging task...
    `,
  },

  {
    id: 2,
    title: 'The Anatomy of a Large-Scale Hypertextual',
    number: 5,
    body: `
      ...Especially well represented is work which canget results by
      post-processing the results of existing commercial search
      engines, or produce small scale"individualized" search engines.
      Finally, there has been a lot of research on information
      retrieval <span className="highlight">systems</span>, especially
      on well controlled collections. In the next two sections, we
      discuss some areas...
    `,
  },
]

const Home = () => {
  return (
    <section id="wrapper">
      <Searchbar />

      <div className="divider"></div>

      <DocumentPreviewList documentPreviews={documentPreviews} />
    </section>
  )
}

export default Home
