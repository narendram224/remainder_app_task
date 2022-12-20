import { useEffect, useState } from "react"
import { Delete, Edit2, Trash2, XCircle } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { removeNote, saveOpenMode, saveSelectedNote } from "../../redux/note"
import CreateCard from "../CreateCard/CreateCard"
import Model from "../Model/Model"
import Typography from "../Typography/Typography"
import styles from "./ListCard.module.css"

const ListCard = ({ formInfo, onSelect, ind, ...item }) => {
  const { modelIndex } = useSelector((state) => state.note)
  const dispatch = useDispatch()

  const [openModel, setOpenModel] = useState(false)
  const fetched = () => {
    dispatch(saveSelectedNote({ formInfo, ...item }))
  }
  const isOpenModel = () => {
    // setOpenModel((pS) => !pS)
    // fetched()
    onSelect()
  }
  const closeModel = () => {
    dispatch(saveOpenMode(null))
  }
  // useEffect(() => {
  //   if (
  //     Object.keys(selectedNote).length > 0 &&
  //     selectedNote.title === item.title
  //   ) {
  //     setOpenModel((pS) => !pS)
  //   }
  // }, [selectedNote])

  const removeNoteinfo = (index) => {
    dispatch(removeNote(index))
  }

  return (
    <div className={styles.listCardContainer}>
      <div className={styles.content}>{formInfo.title}</div>
      <Edit2
        size={20}
        className={styles.edit}
        onClick={() => {
          isOpenModel()
        }}
      />
      <XCircle
        size={20}
        className={styles.delete}
        onClick={() => removeNoteinfo(ind)}
      />

      <Model
        open={modelIndex === ind}
        onCloseModal={closeModel}
        className={styles.modeContainer}
      >
        <div style={{ height: "240px", width: "400px" }}>
          <Typography type="h2">Update Note</Typography>
          <CreateCard
            isUpdatable
            formInfo={formInfo}
            {...item}
            closeModel={closeModel}
            ind={ind}
          />
        </div>
      </Model>
    </div>
  )
}

export default ListCard
