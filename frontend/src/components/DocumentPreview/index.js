import { useState } from 'react'
import viewSDKClient, { openFile } from '../../apis/viewSDKClient'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { ChevronIcon } from '../Buttons'
import Collapse from '../Collapse'

import style from './style.module.css'

const highlightPattern = (text, pattern) => {
  const splitText = text.split(pattern)

  if (splitText.length <= 1) {
    return text
  }

  const matches = text.match(pattern)

  return splitText.reduce((arr, element, index) => (matches[index] ? [
    ...arr,
    element,
    <mark className={style.highlight} key={index}>
      {matches[index]}
    </mark>,
  ] : [...arr, element]), [])
}

function DocumentPreview({ keyword, fileUrl, text, pdfId, filename, title, pageNumber }) {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  return (
    <article className={style.documentPreview}>
      <header>
        <div className={style.top}>
          <ChevronIcon 
            isOpen={isCollapseOpen}
            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
            size="30px"
          />

          <h3 className={style.title}>
            {title}
          </h3>
        </div>

        <span className={style.pageNumber}>page {pageNumber}</span>
      </header>

      <div className={style.body}>
        {!isCollapseOpen && 
          <Document 
            className={style.document} 
            file={fileUrl} 
            onClick={() => openFile(title, fileUrl, pageNumber)}
            loading={<div style={{ width: '150px', height: '150px' }}></div>}
          >
            <Page 
              pageNumber={pageNumber} 
              width={150} 
              loading={<div style={{ width: '150px', height: '150px' }}></div>}
              customTextRenderer={textItem => highlightPattern(textItem.str, keyword)}
            />
          </Document>
        }

        <p>
          {highlightPattern(text, keyword)}
        </p>
      </div>

      <Collapse 
        isOpen={isCollapseOpen}
      >
        <div className={style.collapseContent}>
          <Document 
            className={style.document}
            file={fileUrl} 
            onClick={() => openFile(title, fileUrl, pageNumber)}
          >
            <div>
              <Page 
                pageNumber={pageNumber} 
                width={700} 
                customTextRenderer={textItem => highlightPattern(textItem.str, keyword)}
              />
            </div>
          </Document>
        </div>
      </Collapse>
    </article>
  )
}

export default DocumentPreview
