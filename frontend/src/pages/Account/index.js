import useAuth from '../../hooks/useAuth'
import { EditButton } from '../../components/Buttons'

import style from './style.module.css'

const SettingsContainer = ({ title, children }) => (
  <section className={style.settingsContainer}>
    <h2 className={style.containerTitle}>{title}</h2>

    <div className={style.settingsBoxList}>
      {children}
    </div>
  </section>
)

const SettingsBox = ({ title, accountData, imageSrc, button }) => (
  <div className={style.settingsBox}>
    <div className={style.content}>
      <h3 className={style.title}>{title}</h3>

      <div className={style.data}>
        {accountData && 
          <span className={style.accountData}>{accountData}</span>
        }

        {imageSrc &&
          <div 
            className={style.imageWrapper} 
            style={{ backgroundImage: `url(${imageSrc})` }}
          >
          </div>
        }

        {<EditButton>{button}</EditButton>}
      </div>
    </div>
    
    <div className={style.divider}></div>
  </div>
)

const Account = () => {
  const { user } = useAuth()

  return (
    <section className={style.wrapper}>
      <h1 className={style.pageTitle}>Personal Account</h1>

      <div className={style.settingsContainerList}>
        <SettingsContainer title="Account data">
          <SettingsBox 
            title="Photo"
            imageSrc="https://randomuser.me/api/portraits/women/23.jpg"
            button="Edit"
          />

          <SettingsBox 
            title="Name"
            accountData={user.username}
            button="Edit"
          />

          <SettingsBox
            title="Email"
            accountData={user.email}
            button="Edit"
          />
        </SettingsContainer>

        <SettingsContainer title="Delete account">
          <SettingsBox 
            title="Delete Phobos account"
            button="Delete account"
          />
        </SettingsContainer>
      </div>
    </section>
  )
}

export default Account