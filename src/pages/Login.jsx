import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/login", { email, password }, { withCredentials: true })
      // console.log(res.data)
      setUser(res.data)
      navigate("/")

    }
    catch (err) {
      setError(true)
      console.log(err)

    }

  }
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-bold text-black"><Link to="/">ReportSphere</Link></h1>
        <h3><Link to="/register"><button type="button" class="text-black bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button></Link></h3>
      </div>
      <div className=" flex justify-center items-center w-full h-[80vh] bg-black">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left text-yellow-400">Log in to your account</h1>
          <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-yellow-400 outline-0" type="text" placeholder="Enter your email" />
          <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-yellow-400 outline-0" type="password" placeholder="Enter your password" />
          <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-yellow-400 rounded-lg ">Log in</button>
          {error && <h3 className="text-red-500 text-sm font-semibold">Enter correct credentials please!</h3>}
          <div className="flex justify-center items-center space-x-3">
          <p className="text-white">Don't have an account?</p>
            <p className="text-yellow-400"><Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>

      <Footer />
    </>

  )
}

export default Login