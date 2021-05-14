const preparePdfData = (pdfData) => {
  const preparedData = { pages: [] }
  
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
    preparedData.pages.push(pageData)
  }

  return preparedData
}

export default preparePdfData