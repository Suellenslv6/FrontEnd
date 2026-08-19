import styles from './page.module.css'
import MiniBio from '../componentes/MiniBio'

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Seja bem-vindo, essa sou eu:</h1>
      <MiniBio />
    </div>
  )
}