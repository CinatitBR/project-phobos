import viewSDKClient from '../../apis/viewSDKClient'
import './index.css'

function DocumentPreview({ pdfId, filename, title, pageNumber, children }) {

  // Open PDF using Adobe PDF Embed API
  const previewFile = async () => {
    await viewSDKClient.ready()
    const fileUrl = `http://localhost:5000/storage/user1/pdf/${filename}`

    viewSDKClient.previewFile({ 
      fileName: `${title}.pdf`, 
      fileUrl, 
      pageNumber,
      viewerConfig: { embedMode: 'LIGHT_BOX' }
    })
  }

  return (
    <article 
      id="documentPreview" 
      onClick={previewFile}
    >
      <header>
        <h3 id="title">
          {title}
        </h3>
        <span id="pageNumber">page {pageNumber}</span>
      </header>

      <div id="body">
        <p>
          {children}
        </p>
      </div>
    </article>
  )
}

export default DocumentPreview
