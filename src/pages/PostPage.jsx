import "./PostPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createPostComment,
  deletePost,
  getAllPostComments,
  getPost,
  upvotePost,
} from "../services/posts";
import { useNavigate } from "react-router-dom";

export const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [wasUpvoted, setWasUpvoted] = useState(false);

  useEffect(() => {
    getPost(id)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error("Error getting post:", error);
      });

    getAllPostComments(id)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error getting comments:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpvote = async (e) => {
    e.preventDefault();

    if (wasUpvoted) {
      alert("You have already upvoted this post. Refresh to upvote again. :)");
      return;
    }
    setWasUpvoted(true);

    try {
      setPost({ ...post, upvotes: post.upvotes + 1 });
      await upvotePost(id);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    // Implement comment creation here
    if (!post) return;

    const comment = e.target.elements[0].value;
    if (!comment || typeof comment !== "string" || comment.trim() === "") {
      return;
    }

    try {
      await createPostComment(id, comment);
      setPost({ ...post, comments: post.comments + 1 });
      setComments([{ content: comment }, ...comments]);
      e.target.reset();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  if (!post) return <div>Loading...</div>;
  return (
    <div>
      <h1>{post.title}</h1>
      {post.content && <p>{post.content}</p>}
      {post.image_url && <img src={post.image_url} alt={post.title} />}
      <div>
        <button onClick={handleUpvote}>👍 - {post.upvotes}</button>

        <span>Comments: {post.comments}</span>
      </div>

      <button onClick={handleDelete}>Delete Post</button>

      <form onSubmit={handleSubmitComment}>
        <textarea
          placeholder="Write your comment here..."
          rows="4"
          cols="50"
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>

      <div>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
