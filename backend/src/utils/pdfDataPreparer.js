import EventEmitter from 'events'

const pdfDataPreparer = new EventEmitter()

const prepareData = (pdfData) => {
  const { Pages } = pdfData.formImage

  for (const [index, page] of Pages.entries()) {
    const { Texts } = page
    const pageData = {number: index + 1, text: ''}

    for (const textBlock of Texts) {
      const { R } = textBlock
  
      for (const textRun of R) {
        const { T } = textRun
  
        pageData.text += `${T} `
      }
    }

    pageData.text = decodeURIComponent(pageData.text)
    pdfDataPreparer.emit('dataReady', pageData)
  }
}

pdfDataPreparer.prepareData = prepareData

export default pdfDataPreparer