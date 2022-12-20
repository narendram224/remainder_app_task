import { useDispatch, useSelector } from "react-redux"
import {
  activeCheckList,
  activeNoteList,
  activeRemainderList,
} from "../../redux/note"
import Button from "../Button/Button"
import Spacer from "../Spacer/Spacer"
import styles from "./Sidemenu.module.css"
const SideMenu = () => {
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
    <aside className={styles.sideMenuContainer}>
      <Button
        type="button"
        className={`${styles.downloadPdf} ${
          isListActive === "note" ? styles.selected : null
        }`}
        onClick={noteList}
      >
        Notes
      </Button>
      <Spacer size={20} />
      <Button
        type="button"
        className={`${styles.downloadPdf} ${
          isListActive === "checklist" ? styles.selected : null
        }`}
        onClick={checkList}
      >
        CheckLists
      </Button>
      <Spacer size={20} />
      <Button
        className={`${styles.downloadPdf} ${
          isListActive === "remainder" ? styles.selected : null
        }`}
        onClick={toggleViewInvoice}
      >
        Remainder
      </Button>
    </aside>
  )
}

export default SideMenu
