import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { IF, URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"


const Profile = () => {
  const param = useParams().id
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [updated, setUpdated] = useState(false)
  // console.log(user)

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id)
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleUserUpdate = async () => {
    setUpdated(false)
    try {
      const res = await axios.put(URL + "/api/users/" + user._id, { username, email, password }, { withCredentials: true })
      // console.log(res.data)
      setUpdated(true)

    }
    catch (err) {
      console.log(err)
      setUpdated(false)
    }

  }

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true })
      setUser(null)
      navigate("/")
      // console.log(res.data)

    }
    catch (err) {
      console.log(err)
    }
  }
  // console.log(user)
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id)
      // console.log(res.data)
      setPosts(res.data)


    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProfile()

  }, [param])

  useEffect(() => {
    fetchUserPosts()

  }, [param])

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0 ml-4">
          <h1 className="text-xl  bg-yellow-400 h-[5vh] font-bold mb-4">Your posts:</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="md:sticky md:top-12 bg-black w-[70%] h-[80vh] flex text-yellow-400 font-semibold bg-yellow ">
          <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4 mt-4 ml-5">Profile</h1>
            <input onChange={(e) => setUsername(e.target.value)} value={username} className="outline-none px-4 ml-5 w-[25vw] py-2 border-2 border-yellow-400 outline-0 text-gray-500" placeholder="Your username" type="text" />
            <input onChange={(e) => setEmail(e.target.value)} value={email} className="outline-none ml-5 w-[25vw] px-4 py-2 text-gray-500 border-2 border-yellow-400 outline-0" placeholder="Your email" type="email" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 ml-5 w-[25vw] text-gray-500 border-2 border-yellow-400 outline-0" placeholder="Your password" type="password"/>
            <div className="flex items-center space-x-4 mt-8">
              <button onClick={handleUserUpdate} className="text-black ml-5 font-semibold bg-yellow-400 px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
              <button onClick={handleUserDelete} className="text-black font-semibold bg-yellow-400 px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
            </div>
            {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile