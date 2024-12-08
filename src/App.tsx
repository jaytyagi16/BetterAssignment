import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Home from "./Home"


function App() {

  return (
    <div className="w-max h-full flex items-center justify-center mx-auto">
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Login/>} path="/login"/>
      </Routes>

    </div>
  )
}

export default App
