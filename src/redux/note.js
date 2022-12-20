import { createSlice } from "@reduxjs/toolkit"

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    noteInfo: [],
    selectedNote: {},
    isListActive: "note",
    isCheckListActive: false,
    isRemainderActive: false,
    selectedStatus: "",
    toggleView: false,
    modelIndex: null,
  },
  reducers: {
    saveNoteData: (state, action) => {
      state.noteInfo.push(action.payload)
    },
    saveSelectedNote: (state, action) => {
      state.selectedNote = action.payload
    },
    activeNoteList: (state, action) => {
      state.isListActive = "note"
    },
    activeCheckList: (state, action) => {
      state.isListActive = "checklist"
    },
    activeRemainderList: (state, action) => {
      state.isListActive = "remainder"
    },
    removeNote: (state, action) => {
      state.noteInfo = state.noteInfo.filter(
        (note, ind) => ind !== action.payload
      )
    },
    saveSelectedFilter: (state, action) => {
      state.selectedStatus = action.payload
    },
    saveUpdateNote: (state, action) => {
      state.selectedNote = action.payload.saveNote
      state.noteInfo[action.payload.ind] = action.payload.saveNote
    },
    saveOpenMode: (state, action) => {
      state.modelIndex = action.payload
    },
    toggleNote: (state, action) => {
      if (action.payload) {
        state.toggleView = action.payload
      } else {
        state.toggleView = !state.toggleView
      }
    },
  },
})

// this is for dispatch
export const {
  saveNoteData,
  saveSelectedNote,
  saveUpdateNote,
  activeNoteList,
  activeCheckList,
  activeRemainderList,
  saveSelectedFilter,
  toggleNote,
  saveOpenMode,
  removeNote,
} = noteSlice.actions

// this is for configureStore
export default noteSlice.reducer
