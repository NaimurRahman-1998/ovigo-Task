import { Outlet } from "react-router-dom"
import Navbar from "../Pages/Shared/Navbar"
import Header from "../Pages/Header"

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Main
