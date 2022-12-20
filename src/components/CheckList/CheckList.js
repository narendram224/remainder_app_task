import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveOpenMode, saveSelectedNote } from "../../redux/note"
import Button from "../Button/Button"
import ListCard from "../ListCard/ListCard"
import styles from "./CheckList.module.css"

const CheckList = ({ checkListInfo }) => {
  const { noteInfo, isCheckListActive } = useSelector((state) => state.note)
  const [filteredList, setFilteredList] = useState(checkListInfo)

  const filterListData = (status) => {
    if (status) {
      const filterListInfo = noteInfo?.filter((item) => item.status === status)
      setFilteredList(filterListInfo)
      return
    }
    setFilteredList(noteInfo)
  }
  const dispatch = useDispatch()
  const handleTodo = () => {
    // const filterListInfo = checkListInfo?.filter((item) =>item.addCheckList.)
    // console.log("Todomfilter",filterListInfo);
  }
  useEffect(() => {
    if (checkListInfo?.length > 0) {
      setFilteredList(checkListInfo)
    }
  }, [checkListInfo])

  return (
    <div>
      <div className={styles.filter}>
        <Button onClick={handleTodo}>todo</Button>
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

export default CheckList
