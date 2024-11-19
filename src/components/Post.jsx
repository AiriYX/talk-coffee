import { Link } from "react-router-dom";
import "./Post.css";

export const Post = ({
  id,
  title,
  content,
  image_url,
  upvotes,
  created_at,
  comments,
}) => {
  return (
    <Link className="root-post-link" to={`/post/${id}`}>
      <div className="post">
        <h2>{title}</h2>
        <p>{content}</p>
        <img src={image_url} alt={title} />
        <div>{upvotes} upvotes</div>
        <div>{comments} comments</div>
        <div>{created_at}</div>
      </div>
    </Link>
  );
};
