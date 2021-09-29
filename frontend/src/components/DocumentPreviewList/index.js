import DocumentPreview from '../DocumentPreview'

import './index.css'

function DocumentPreviewList({ documentPreviews, keyword }) {
  return (
    <section id="documentPreviewList">
      {documentPreviews.map(({ id, filename, pdf_title, number, text }) => {
        // Highlight searched keyword
        const highlightedText = text.split(' ').map((word, index) => {
          if (keyword.toLowerCase().split(' ').includes(word.toLowerCase())) {
            return <span key={index} className="highlight">{word} </span>
          }

          return <span key={index}>{word} </span>
        })

        return (
          <DocumentPreview key={id} filename={filename} pdfId={id} title={pdf_title} pageNumber={number}>
            {highlightedText}
          </DocumentPreview>
        )
      })}
    </section>
  )
}

export default DocumentPreviewList
