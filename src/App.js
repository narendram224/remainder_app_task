import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./page/HomePage"
import { persistor, store } from "./redux/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
