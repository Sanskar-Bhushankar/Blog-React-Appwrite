import React, {useEffect, useState} from 'react'
import appwriteService from "../../appwrite/config";
import {Container, PostCard} from '../components'
import LandingPage from './LandingPage'
import Slider from '../components/Slider'

function Home() {
    const [posts, setPosts] = useState([])
    const [sliderContent, setSliderContent] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((fetchedPosts) => {
            if (fetchedPosts) {
                setPosts(fetchedPosts.documents)

                const latestPosts = fetchedPosts.documents
                    .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
                    .slice(0, 3);

                const preparedSliderData = latestPosts.map(post => ({
                    id: post.$id,
                    title: post.title,
                    imageUrl: post.featuredimage ? appwriteService.getFileView(post.featuredimage) : null,
                    slug: `/post/${post.$id}`
                }));
                setSliderContent(preparedSliderData);
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            // <div className="w-full py-20 mt-4 text-center">
            //     <Container>
            //         <div className="flex flex-wrap justify-center items-center">
            //             <div className="p-2 w-full">
            //                 <h1 className="text-4xl font-extrabold text-gray-700 hover:text-gray-900 transition-colors duration-300">
            //                     Login to read posts
            //                 </h1>
            //                 <p className="mt-4 text-lg text-gray-600">Discover amazing content by logging in.</p>
            //             </div>
            //         </div>
            //     </Container>
            // </div>
            <LandingPage />
        )
    }
    return (
        <div className='w-full'>
            <Container>
                {sliderContent.length > 0 && <Slider slides={sliderContent} />}
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