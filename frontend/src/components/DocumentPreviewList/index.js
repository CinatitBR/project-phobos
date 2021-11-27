import DocumentPreview from '../DocumentPreview'

import './index.css'

function DocumentPreviewList({ files, keyword }) {
  return (
    <section id="documentPreviewList">
      {files.map(file => (
        <DocumentPreview 
          key={file.id} 
          file={file}
          keyword={keyword}
        />
      ))}
    </section>
  )
}

export default DocumentPreviewList
