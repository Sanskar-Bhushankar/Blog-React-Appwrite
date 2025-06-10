import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown-light.css"; // GitHub-like Markdown styling

export default function Post() {
  const [post, setPost] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          if (post.content) {
            const fileUrl = appwriteService.getFileView(post.content);
            fetch(fileUrl)
              .then((response) => response.text())
              .then((markdownText) => {
                console.log("Raw Markdown Text from Appwrite:", markdownText);
                setMarkdownContent(markdownText);
              })
              .catch((error) => console.error("Error fetching Markdown file:", error));
          }
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        if (post.content) {
          appwriteService.deleteFile(post.content);
        }
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[400px] bg-gray-900 overflow-hidden">
        {post.featuredimage && (
          <img
            src={appwriteService.getFileView(post.featuredimage)}
            alt={post.title}
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          {post.authorName && (
            <p className="text-lg md:text-xl text-gray-200">
              By <span className="font-semibold text-blue-300">{post.authorName}</span>
            </p>
          )}
        </div>
        {isAuthor && (
          <div className="absolute top-4 right-4 flex space-x-3">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-blue-600 hover:bg-blue-700"
                className="rounded-full px-6 py-2 text-white font-medium shadow-lg transition-all duration-200"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-600 hover:bg-red-700"
              className="rounded-full px-6 py-2 text-white font-medium shadow-lg transition-all duration-200"
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <Container>
        <div className="max-w-4xl mx-auto my-12">
          <div
            className="markdown-body bg-white p-8 rounded-lg shadow-md prose prose-lg max-w-none"
            style={{ color: "#1a202c" }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl text-gray-600">Loading...</p>
    </div>
  );
}