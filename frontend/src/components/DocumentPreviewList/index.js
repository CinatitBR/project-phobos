import DocumentPreview from '../DocumentPreview'

import './index.css'

function DocumentPreviewList({ documentPreviews, keyword }) {
  return (
    <section id="documentPreviewList">
      {documentPreviews.map(({ id, filename, pdf_title, number, text }) => (
        <DocumentPreview 
          key={id} 
          keyword={keyword} 
          text={text} 
          filename={filename} 
          pdfId={id} 
          title={pdf_title} 
          pageNumber={number}
        />
      ))}
    </section>
  )
}

export default DocumentPreviewList
