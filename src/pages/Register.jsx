import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import { URL } from '../url'


const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {

    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password })
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")

    }
    catch (err) {
      setError(true)
      console.log(err)
    }

  }

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-bold"><Link to="/">ReportSphere</Link></h1>
        <h3><Link to="/login"><button type="button" class="text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button></Link></h3>
      </div>
      <div className="flex justify-center items-center w-full h-[80vh] bg-black">
        <div className="w-full flex justify-center items-center h-[80vh] ">
          <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
            <h1 className="text-xl font-bold text-left text-yellow-400">Create an account</h1>
            <input onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-yellow-400 outline-0" type="text" placeholder="Enter your username" />
            <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-yellow-400 outline-0" type="text" placeholder="Enter your email" />
            <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-yellow-400 outline-0" type="password" placeholder="Enter your password" />
            <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-yellow-400 rounded-lg ">Register</button>
            {error && <h3 className="text-red-500 text-sm font-semibold">Enter correct credentials please!</h3>}
            <div className="flex justify-center items-center space-x-3">
              <p className="text-white">Already have an account?</p>
              <p className="text-yellow-400"><Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </>

  )
}

export default Register