import { useState } from 'react'
import { openFile } from '../../apis/viewSDKClient'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { ChevronIcon } from '../Buttons'
import Collapse from '../Collapse'
import FileTag from '../FileTag'

import style from './style.module.css'

const highlightPattern = (text, pattern) => {
  const splitText = text.split(pattern)

  if (splitText.length <= 1) {
    return text
  }

  const matches = text.toLowerCase().match(pattern.toLowerCase())

  return splitText.reduce((arr, element, index) => (matches[index] ? [
    ...arr,
    element,
    <em>
      {matches[index]}
    </em>,
  ] : [...arr, element]), [])
}

function DocumentPreview({ file, keyword }) {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  return (
    <article className={style.documentPreview}>
      <header>
        <div className={style.left}>
          <ChevronIcon 
            isOpen={isCollapseOpen}
            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
            size="30px"
          />

          <h3 className={style.title}>
            {file.title}
          </h3>
        </div>

        <div className={style.right}>
          <span className={style.pageNumber}>page {file.page_number}</span>
          <FileTag>{file.tag_name}</FileTag>
        </div>
      </header>

      <div className={style.body}>
        {!isCollapseOpen && 
          <Document 
            className={style.document} 
            file={file.fileUrl} 
            onClick={() => openFile(file.title, file.fileUrl, file.page_number)}
            loading={<div style={{ width: '150px', height: '150px' }}></div>}
          >
            <Page 
              pageNumber={file.page_number} 
              width={150} 
              loading={<div style={{ width: '150px', height: '150px' }}></div>}
              customTextRenderer={textItem => highlightPattern(textItem.str, keyword)}
            />
          </Document>
        }

        <p dangerouslySetInnerHTML={{__html: file.text }} />
      </div>

      <Collapse 
        open={isCollapseOpen}
      >
        <div className={style.collapseContent}>
          <Document 
            className={style.document}
            file={file.fileUrl} 
            onClick={() => openFile(file.title, file.fileUrl, file.page_number)}
          >
            <div>
              <Page 
                pageNumber={file.page_number} 
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
