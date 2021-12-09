// Receive pdf2json json file and get PDF pages
const getPages = pdfData => {
  const pages = []
  
  const { Pages } = pdfData.formImage

  for (const [index, page] of Pages.entries()) {
    const { Texts } = page
    const pageData = {number: index + 1, body: ''}

    for (const textBlock of Texts) {
      const { R } = textBlock
  
      for (const textRun of R) {
        const { T } = textRun
  
        pageData.body += `${T}`
      }
    }

    pageData.body = decodeURIComponent(pageData.body)
    pages.push(pageData)
  }

  return pages
}

export default getPages