import DocumentPreview from '../DocumentPreview'

import './index.css'

function DocumentPreviewList({ documentPreviews }) {
  return (
    <section id="documentPreviewList">
      {documentPreviews.map(({ id, title, number, body }) => (
        <DocumentPreview key={id} title={title} pageNumber={number}>
          {body}
        </DocumentPreview>
      ))}
    </section>
  )
}

export default DocumentPreviewList
