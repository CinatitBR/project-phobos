import viewSDKClient from '../../apis/viewSDKClient'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import useAuth from '../../hooks/useAuth'
import './index.css'

function DocumentPreview({ pdfId, filename, title, pageNumber, children }) {
  const auth = useAuth()
  const userId = auth.user.id
  const fileUrl = `http://localhost:5000/storage/user${userId}/pdf/${filename}`

  // Open PDF using Adobe PDF Embed API
  const previewFile = async () => {
    await viewSDKClient.ready()

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
        <Document file={fileUrl}>
          <Page pageNumber={pageNumber} width={150} />
        </Document>

        <p>
          {children}
        </p>
      </div>
    </article>
  )
}

export default DocumentPreview
