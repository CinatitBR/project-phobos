import FileBox from '../../components/FileBox'
import FilePreviewSidebar from '../../components/FilePreviewSidebar'

import style from './style.module.css'

const Explore = () => {
  return (
    <div className={style.explore}>
      
      <section className={style.content}>
        <div className={style.fileList}>
          <FileBox 
            filename="Probabilidade.pdf" 
            tagName="Matemática"
            fileSize="10 MB"
          />

          <FileBox 
            filename="Friends Script.pdf" 
            tagName="TV Show"
            fileSize="16 MB"
          />

          <FileBox 
            filename="Biggie smalls.pdf" 
            tagName="Rap"
            fileSize="5 MB"
          />

          <FileBox 
            filename="Constituição.pdf" 
            tagName="Law school"
            fileSize="15 MB"
          />

          <FileBox 
            filename="Licence.pdf" 
            tagName="Car agency"
            fileSize="8 MB"
          />

          <FileBox 
            filename="Agreement.pdf" 
            tagName="Tech company"
            fileSize="24 MB"
          />
        </div>
      </section>

      <FilePreviewSidebar />

    </div>
  )
}

export default Explore