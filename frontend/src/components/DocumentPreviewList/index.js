import DocumentPreview from '../DocumentPreview'

import './index.css'

function DocumentPreviewList({ documentPreviews }) {
  return (
    <section id="documentPreviewList">
      {documentPreviews.map(({ id, pdf_title, number, text }) => (
        <DocumentPreview key={id} title={pdf_title} pageNumber={number}>
          {text}
        </DocumentPreview>
      ))}
    </section>
  )
}

export default DocumentPreviewList
