import EventEmitter from 'events'

const pdfDataPreparer = new EventEmitter()

const prepareData = (pdfData) => {
  const { Pages } = pdfData.formImage

  for (const [index, page] of Pages.entries()) {
    const { Texts } = page
    const pageData = {number: index + 1, body: ''}

    for (const textBlock of Texts) {
      const { R } = textBlock
  
      for (const textRun of R) {
        const { T } = textRun
  
        pageData.body += `${T} `
      }
    }

    pageData.body = decodeURIComponent(pageData.body)

    const preparedData = { page: pageData }
    pdfDataPreparer.emit('dataReady', preparedData)
  }
}

pdfDataPreparer.prepareData = prepareData

export default pdfDataPreparer