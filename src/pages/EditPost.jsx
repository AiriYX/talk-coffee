import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPost } from "../services/posts";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  useEffect(() => {
    getPost(id)
      .then((data) => {
        setPost(data);
        setCurrentTitle(data.title);
        setCurrentContent(data.content);
        setCurrentImageUrl(data.image_url);
      })
      .catch((error) => {
        console.error("Error getting post:", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await editPost(id, {
        title: currentTitle,
        content: currentContent,
        image_url: currentImageUrl,
      });
      setPost({
        ...post,
        title: currentTitle,
        content: currentContent,
        image_url: currentImageUrl,
      });

      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  if (!post) return <p>Loading...</p>;
  return (
    <div>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div>
        <label>Content</label>
        <input
          type="text"
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
          placeholder="Content"
        />
      </div>
      <div>
        <label>Image URL</label>
        <input
          type="text"
          value={currentImageUrl}
          onChange={(e) => setCurrentImageUrl(e.target.value)}
          placeholder="Image URL"
        />
      </div>

      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditPost;
