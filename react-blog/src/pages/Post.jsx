import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-6 relative rounded-xl p-0">
                    {post.featuredimage && (
                        <img
                            src={appwriteService.getFileView(post.featuredimage)}
                            alt={post.title}
                            className="w-1/2 h-1/2 object-cover rounded-lg shadow-xl"
                        />
                    )}
                    
                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex space-x-3 z-10">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-700" className="rounded-lg px-4 py-2 text-white font-semibold shadow-md transition-colors duration-200">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600 hover:bg-red-700" className="rounded-lg px-4 py-2 text-white font-semibold shadow-md transition-colors duration-200" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-black- mb-6 text-center leading-tight">{post.title}</h1>
                </div>
                <div className=" text-xl max-w-2xl text-center mx-auto text-black-300">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}