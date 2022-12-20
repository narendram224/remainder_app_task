import { useDispatch, useSelector } from "react-redux"
import {
  activeCheckList,
  activeNoteList,
  activeRemainderList,
} from "../../redux/note"
import Button from "../Button/Button"
import styles from "./Header.module.css"

const Header = () => {
  const { isListActive } = useSelector((state) => state.note)
  const dispatch = useDispatch()

  const noteList = () => {
    dispatch(activeNoteList(true))
  }
  const checkList = () => {
    dispatch(activeCheckList(true))
  }
  const toggleViewInvoice = () => {
    dispatch(activeRemainderList(true))
  }
  return (
    <header className={styles.headerContainer}>
      <img
        src="https://photos.angel.co/startups/i/4389578-24c1052ecf295e077aff861887dd0c72-medium_jpg.jpg"
        width="32"
        height="32"
        alt="logo"
        border="0"
      />
      <div className={styles.right}>
        <Button
          type="button"
          className={`${styles.downloadPdf} ${
            isListActive === "note" ? styles.selected : null
          }`}
          onClick={noteList}
        >
          Notes
        </Button>
        <Button
          type="button"
          className={`${styles.downloadPdf} ${
            isListActive === "checklist" ? styles.selected : null
          }`}
          onClick={checkList}
        >
          CheckList
        </Button>
        <Button
          type="button"
          className={`${styles.downloadPdf} ${
            isListActive === "remainder" ? styles.selected : null
          }`}
          onClick={toggleViewInvoice}
        >
          Remainder
        </Button>
      </div>
    </header>
  )
}

export default Header
