import './index.css'

function DocumentPreview({ title, pageNumber, children }) {
  return (
    <article id="documentPreview">
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
