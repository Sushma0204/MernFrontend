/* eslint-disable react/prop-types */
import {IF} from '../url'


const HomePosts = ({post}) => {
  return (
    <div className="w-full flex mt-8 space-x-4">
    {/* left */}
    <div className="w-[75%] h-[400px] flex justify-center items-center">
    <img src={IF+post.photo} alt="" className="h-full w-full object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl  text-black">
      {post.title}
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
       
       <div className="flex space-x-2 text-sm">
       <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
       </div>
       <p>Author: @{post.username}</p>
      </div>
      <p className="text-sm md:text-lg">{post.desc.slice(0,550)+"  ....."}&nbsp;
      <button type="button" class="text-black bg-yellow-400 hover:bg-yellow-00 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 d">Read more</button></p>
    </div>

    </div>
  )
}

export default HomePosts
