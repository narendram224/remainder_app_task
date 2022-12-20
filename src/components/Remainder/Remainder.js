import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveOpenMode, saveSelectedNote } from "../../redux/note"
import Button from "../Button/Button"
import ListCard from "../ListCard/ListCard"
import styles from "./Remainder.module.css"

const Remainder = ({ remainderInfo }) => {
  const { noteInfo } = useSelector((state) => state.note)
  const [filteredList, setFilteredList] = useState(remainderInfo)

  const dispatch = useDispatch()
  useEffect(() => {
    if (remainderInfo?.length > 0) {
      setFilteredList(remainderInfo)
    }
  }, [remainderInfo])
  return (
    <div>
      <div className={styles.filter}>
        <Button>todo</Button>
        <Button>partial</Button>
        <Button>finished</Button>
      </div>
      <div className={styles.listItemContainer}>
        {filteredList?.map((item, ind) => {
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

export default Remainder
