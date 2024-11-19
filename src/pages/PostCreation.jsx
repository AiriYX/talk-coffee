import { useState } from "react";
import { createPost } from "../services/posts";

export default function PostCreation() {
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);

      await createPost({
        title,
        content: content === "" ? undefined : content,
        image_url: imageUrl === "" ? undefined : imageUrl,
      });

      setTitle("");
      setContent("");
      setImageUrl("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
