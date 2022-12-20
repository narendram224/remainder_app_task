import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header/Header"
import SideMenu from "../components/SideMenu/SideMenu"
import MainLayout from "../Layout/MainLayout/MainLayout"
import styles from "./homePage.module.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CreateCard from "../components/CreateCard/CreateCard"
import { PlusSquare } from "react-feather"
import Spacer from "../components/Spacer/Spacer"
import Notes from "../components/Notes/Notes"
import CheckList from "../components/CheckList/CheckList"
import Remainder from "../components/Remainder/Remainder"
import Typography from "../components/Typography/Typography"

const DummyPage = () => {
  const { noteInfo, isCheckListActive, isListActive, isRemainderActive } =
    useSelector((state) => state.note)
  const dispatch = useDispatch()
  const [dbData, setDbData] = useState([])
  const [filteredList, setFilteredList] = useState([])

  const filterListData = (status) => {
    if (status) {
      const filterListInfo = noteInfo?.filter((item) => item.status === status)
      setFilteredList(filterListInfo)
      return
    }
    setFilteredList(noteInfo)
  }

  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos")
    const json = await res.json()
    setDbData(json)
  }

  useEffect(() => {
    fetchData()
  }, [])
  const ListNote = () => {
    return (
      <div>
        <Typography type="h2" className={styles.heading}>
          Add a new Note
          <PlusSquare size={20} style={{ marginLeft: "0.2rem" }} />
        </Typography>
        <div className={styles.addContainer}>
          <CreateCard />
        </div>
        <Spacer size={10} />
        <Notes />
      </div>
    )
  }
  useEffect(() => {
    if (isListActive === "remainder") {
      const filterListInfo = noteInfo?.filter((item) => item.label?.length)
      setFilteredList(filterListInfo)
    }
    if (isListActive === "checklist") {
      const filterListInfo = noteInfo?.filter(
        (item) => item.addCheckList?.length
      )
      setFilteredList(filterListInfo)
    }
  }, [isListActive, noteInfo])

  const renderItem = {
    note: <ListNote />,
    checklist: <CheckList checkListInfo={filteredList} />,
    remainder: <Remainder remainderInfo={filteredList} />,
  }

  return (
    <div>
      {/* <Invoice /> */}
      <Header />
      <SideMenu />
      <MainLayout className={styles.mainContainer}>
        {renderItem[isListActive]}
      </MainLayout>
      <ToastContainer />
    </div>
  )
}

export default DummyPage
