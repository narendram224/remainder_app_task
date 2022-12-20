import { useDispatch, useSelector } from "react-redux"
import { saveOpenMode, saveSelectedNote } from "../../redux/note"
import Button from "../Button/Button"
import ListCard from "../ListCard/ListCard"
import styles from "./Notes.module.css"

const Notes = () => {
  const { noteInfo } = useSelector((state) => state.note)

  const dispatch = useDispatch()
  return (
    <div>
      <div className={styles.listItemContainer}>
        {noteInfo?.map((item, ind) => {
          return (
            <ListCard
              key={ind}
              ind={ind}
              {...item}
              onSelect={() => {
                dispatch(saveSelectedNote(item))
                dispatch(saveOpenMode(ind))
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Notes
