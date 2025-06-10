import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts([])
      .then((response) => {
        if (response) {
          setPosts(response.documents);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Container>
        {/* <h1 className="text-4xl font-bold text-gray-900 text-center mb-12 tracking-tight">
          Explore Our Blog
        </h1> */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No posts found. Check back soon!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="transform transition-transform duration-300 hover:scale-105"
              >
                <PostCard {...post} featuredimage={post.featuredimage} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;