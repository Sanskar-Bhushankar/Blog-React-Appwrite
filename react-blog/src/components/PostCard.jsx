import React from 'react'
import appwriteService from "../../appwrite/config";
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredimage}) {
  console.log("PostCard - featuredimage:", featuredimage);
  if (featuredimage) {
      console.log("PostCard - Image URL:", appwriteService.getFileView(featuredimage));
  }
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 transition-all duration-300 h-60 flex flex-col justify-between'>
            <div className='w-full aspect-w-16 aspect-h-9 overflow-hidden rounded-lg mb-2'>
                {featuredimage && (
                    <img src={appwriteService.getFileView(featuredimage)} alt={title}
                    className='rounded-xl h-fit w-fit object-cover' />
                )}

            </div>
            <h2
            className='text-xl font-bold text-gray-900 mt-3'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard