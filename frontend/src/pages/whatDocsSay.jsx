import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const CommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState({});
  const [visibleCount, setVisibleCount] = useState(10);

  const { backendUrl } = useContext(AppContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/community/all-posts`);
        if (!res.data.success) {
          toast.error("Failed to fetch posts");
        }
        const data = res.data.data;

        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setPosts(sorted);
        const likeData = {};
        sorted.forEach((post) => (likeData[post._id] = 0));
        setLikes(likeData);
      } catch (err) {
        setError("Error loading posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [backendUrl]);

  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleShare = async (post) => {
    const postUrl = `${window.location.origin}/community/${post._id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.docName,
          text: post.contents.substring(0, 100) + "...",
          url: postUrl,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(postUrl);
      alert("Post link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#42839b" }}>
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f9fb",
        padding: "40px 20px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#42839b",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        Welcome! Have a look at what the our docs are saying
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {posts.slice(0, visibleCount).map((post) => (
          <div
            key={post._id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              overflow: "hidden",
              width: "100%",
              maxWidth: "500px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.docName}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ padding: "20px", flex: "1" }}>
              <h3
                style={{
                  color: "#42839b",
                  marginBottom: "10px",
                  fontSize: "20px",
                }}
              >
                {post.docName}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "15px",
                }}
              >
                {post.createdTime}
              </p>
              <p style={{ color: "#333", lineHeight: "1.5", fontSize: "15px" }}>
                {post.contents.length > 200
                  ? post.contents.substring(0, 200) + "..."
                  : post.contents}
              </p>
            </div>

            {/* Like & Share Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 20px",
                borderTop: "1px solid #eee",
              }}
            >
              <button
                onClick={() => handleLike(post._id)}
                style={{
                  backgroundColor: "#42839b",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ❤️ ({likes[post._id] || 0})
              </button>

              <button
                onClick={() => handleShare(post)}
                style={{
                  backgroundColor: "#fff",
                  color: "#42839b",
                  border: "1px solid #42839b",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ➤
              </button>
            </div>

            <div
              style={{
                padding: "10px 20px",
                backgroundColor: "#f0f6f8",
                fontSize: "12px",
                color: "#555",
              }}
            >
              Last updated:{" "}
              {new Date(post.modified_at).toLocaleDateString("en-GB")}
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < posts.length && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            style={{
              backgroundColor: "#42839b",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityPosts;
