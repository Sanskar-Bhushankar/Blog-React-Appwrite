import React, {useEffect, useState} from 'react'
import appwriteService from "../../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-20 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="p-2 w-full">
                            <h1 className="text-4xl font-extrabold text-gray-700 hover:text-gray-900 transition-colors duration-300">
                                Login to read posts
                            </h1>
                            <p className="mt-4 text-lg text-gray-600">Discover amazing content by logging in.</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-3'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home