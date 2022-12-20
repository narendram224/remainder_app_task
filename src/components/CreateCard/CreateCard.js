import { useEffect, useRef } from "react"
import { useState } from "react"
import { Bell, Clock, Delete, X } from "react-feather"
import Button from "../Button/Button"
import Model from "../Model/Model"
import Spacer from "../Spacer/Spacer"
import TextField from "../TextField/TextField"
import styles from "./CreateCard.module.css"
import DateTimePicker from "react-datetime-picker"
import CheckboxLabel from "../CheckboxLabel/CheckboxLabel"
import { useDispatch, useSelector } from "react-redux"
import {
  saveNoteData,
  saveOpenMode,
  saveSelectedNote,
  saveUpdateNote,
} from "../../redux/note"
import { toast } from "react-toastify"

const CreateCard = ({ isUpdatable, closeModel, ind }) => {
  const { noteInfo, selectedNote } = useSelector((state) => state.note)
  const notify = () => toast.success("Successfully Added one note")
  const updateNotify = () => toast.success("Successfully updated ")

  const [addCheckList, setAddCheckList] = useState([
    // { checked: false, label: "info" },
  ])
  const [isOpenCheck, setIsOpenCheck] = useState(false)

  const [openModel, setopenModel] = useState(false)
  const [label, setLabel] = useState("")
  const [value, onChange] = useState(new Date())
  const labelRef = useRef()
  const [formInfo, setFormInfo] = useState({
    title: "",
    description: "",
  })
  const dispatch = useDispatch()
  const handleLabel = (e) => {
    setLabel(e.target.value)
  }
  const handleopenModel = () => {
    setopenModel(true)
    labelRef.current?.focus()
  }
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormInfo({ ...formInfo, [name]: value })
  }
  const submitForm = () => {}
  const handleRemainder = () => {
    handleopenModel()
  }
  const handleCloseModel = () => {
    setopenModel(false)
  }
  const createRemainder = () => {
    handleCloseModel()
  }
  const cleanUpFunction = () => {
    setLabel("")
    setAddCheckList([])
    onChange(new Date())
    setFormInfo({
      title: "",
      description: "",
    })
  }
  const createNote = () => {
    const saveNote = {
      formInfo,
      value,
      label,
      addCheckList,
    }
    if (isUpdatable) {
      dispatch(saveUpdateNote({ saveNote, ind }))
      // dispatch(saveOpenMode(null))
      updateNotify()
    } else {
      dispatch(saveNoteData(saveNote))
      notify()
    }
    if (closeModel) closeModel()
    // cleanUpFunction()
  }
  const insertTickBox = () => {
    const newitems = [...addCheckList]
    const item = {
      checked: false,
      label: "",
    }
    newitems.push(item)
    setAddCheckList(newitems)
  }
  const handleChangeCheckList = (event, index) => {
    const { checked } = event.target

    const newArr = addCheckList.map((el, ind) => {
      if (ind === index) return Object.assign({}, el, { checked })
      return el
    })
    setAddCheckList(newArr)
  }
  const handleCheckListLabel = (event, index) => {
    const { name, value } = event.target

    const newArr = addCheckList.map((el, ind) => {
      if (ind === index) return Object.assign({}, el, { label: value })
      return el
    })
    setAddCheckList(newArr)
  }
  const openCheckList = () => {
    setIsOpenCheck(true)
    insertTickBox()
  }
  const closeCheckList = () => {
    setIsOpenCheck(false)
  }
  const removeCheckboxList = (index) => {
    const filteredItems = addCheckList.filter((item, ind) => ind !== index)
    setAddCheckList(filteredItems)
  }
  const clearRemainder = () => {
    setLabel("")
  }
  useEffect(() => {
    if (Object.keys(selectedNote).length > 0 && isUpdatable) {
      setLabel(selectedNote.label)
      setAddCheckList(selectedNote.addCheckList)
      onChange(selectedNote.value)
      setFormInfo(selectedNote.formInfo)
    }
  }, [isUpdatable, selectedNote])

  return (
    <div className={styles.createCardContainer}>
      <TextField
        name="title"
        id="title"
        value={formInfo.title}
        onChange={(e) => handleFormChange(e)}
        className={styles.inputfield}
        placeholder="Title"
      />
      <Spacer size={10} />
      <textarea
        name="description"
        id="description"
        value={formInfo.description}
        onChange={(e) => handleFormChange(e)}
        className={styles.description}
        placeholder="Description"
        rows={3}
      />
      <Button
        type="button"
        className={styles.checkList}
        onClick={openCheckList}
      >
        + checkList
      </Button>
      <div>
        {addCheckList?.map((checkList, ind) => {
          return (
            <div className={styles.checkListContent} key={ind}>
              <CheckboxLabel
                checked={checkList.checked}
                label={checkList.label}
                handleLabel={(e) => handleCheckListLabel(e, ind)}
                handleChange={(e) => handleChangeCheckList(e, ind)}
              />
              <Delete
                size={20}
                onClick={() => removeCheckboxList(ind)}
                className={styles.deleteCheckbox}
              />
            </div>
          )
        })}
        {label ? (
          <div>
            <div className={styles.remainder}>
              <Clock size={14} />
              <span>{label}</span>
              <X
                size={14}
                className={styles.crossIcon}
                onClick={clearRemainder}
              />
            </div>
          </div>
        ) : null}
      </div>

      <Spacer size={10} />
      <Bell size={20} className={styles.bellIcon} onClick={handleRemainder} />
      <Button
        type="button"
        className={styles.btnStyles}
        disabled={!formInfo.title}
        onClick={createNote}
      >
        save
      </Button>
      <Model
        open={openModel}
        onCloseModal={handleCloseModel}
        className={styles.modeContainer}
      >
        <div style={{ height: "240px" }}>
          <h1>Create Remainder</h1>
          <TextField
            name="label"
            id="label"
            className={styles.inputfield}
            placeholder="Label"
            value={label}
            onChange={handleLabel}
            ref={labelRef}
          />
          <Spacer size={20} />
          <DateTimePicker input={false} onChange={onChange} value={value} />
          <Button
            type="button"
            className={styles.btnStyles}
            onClick={createRemainder}
            disabled={!label.length}
          >
            save
          </Button>
        </div>
      </Model>
    </div>
  )
}

export default CreateCard
