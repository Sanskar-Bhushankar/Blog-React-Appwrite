import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then(async (post) => {
                if (post) {
                    if (post.content) {
                        const fileUrl = appwriteService.getFileView(post.content);
                        try {
                            const response = await fetch(fileUrl);
                            const markdownText = await response.text();
                            setPosts({...post, content: markdownText});
                        } catch (error) {
                            console.error('Error fetching or converting Markdown for editing:', error);
                            setPosts(post);
                        }
                    } else {
                        setPosts(post);
                    }
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost