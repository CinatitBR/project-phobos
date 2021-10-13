import FilePreviewSidebar from '../../components/FilePreviewSidebar'
import FileList from '../../components/FileList'

import style from './style.module.css'

const files = [
  {
    id: 1,
    filename: 'Probabilidade.pdf',
    tagName: 'Matemática',
    size: '10 MB',
  },
  {
    id: 2,
    filename: 'Friends Script.pdf',
    tagName: 'TV Show',
    size: '16 MB',
  },
  {
    id: 3,
    filename: 'Biggie smalls.pdf',
    tagName: 'Rap',
    size: '5 MB',
  }
]

const Explore = () => {
  return (
    <div className={style.explore}>
      <section className={style.content}>
        <FileList files={files} />
      </section>

      <FilePreviewSidebar />
    </div>
  )
}

export default Explore