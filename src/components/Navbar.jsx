import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"


const Navbar = () => {

  const [prompt, setPrompt] = useState("")
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const path = useLocation().pathname

  // console.log(prompt)

  const showMenu = () => {
    setMenu(!menu)
  }

  const { user } = useContext(UserContext)

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-bold text-black"><Link to="/">ReportSphere</Link></h1>
      {path === "/" && <div className="flex justify-center items-center space-x-0">
        <button
          type="button"
          class="flex items-center text-black bg-white border border-yellow-400 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
        >
          <p
            onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
            className="cursor-pointer"
          >
            <BsSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 flex-grow"
            placeholder="Search an article "
            type="text"
          />
        </button>




      </div>}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? <h3><Link to="/write">Menu</Link></h3> : <h3><Link to="/login"><button type="button" class="text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></Link></h3>}
        {user ? <div onClick={showMenu}>
          <p className="cursor-pointer relative"><FaBars /></p>
          {menu && <Menu />}
        </div> : <h3><Link to="/register"><button type="button" class="text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button></Link></h3>}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative"><FaBars /></p>
        {menu && <Menu />}
      </div>

    </div>
  )
}

export default Navbar 