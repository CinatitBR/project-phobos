import { useState } from 'react'
import viewSDKClient from '../../apis/viewSDKClient'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import useAuth from '../../hooks/useAuth'
import { ChevronIcon } from '../Buttons'
import Collapse from '../Collapse'

import style from './style.module.css'

function DocumentPreview({ pdfId, filename, title, pageNumber, children }) {
  const auth = useAuth()
  const userId = auth.user.id
  const fileUrl = `http://localhost:5000/storage/user${userId}/pdf/${filename}`
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

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
      className={style.documentPreview} 
      onClick={previewFile}
    >
      <ChevronIcon 
        isOpen={isCollapseOpen}
        onClick={() => setIsCollapseOpen(!isCollapseOpen)}
        size="30px"
      />

      <header>
        <h3 className={style.title}>
          {title}
        </h3>
        <span className={style.pageNumber}>page {pageNumber}</span>
      </header>

      <div className={style.body}>
        <Document file={fileUrl}>
          <Page pageNumber={pageNumber} width={150} />
        </Document>

        <p>
          {children}
        </p>
      </div>

      <Collapse 
        isOpen={isCollapseOpen} 
      >
        <div className={style.collapseContent}>
          <Document file={fileUrl}>
            <Page pageNumber={pageNumber} width={700} />
          </Document>
        </div>
      </Collapse>
    </article>
  )
}

export default DocumentPreview
