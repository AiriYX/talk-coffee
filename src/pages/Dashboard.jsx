import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../services/posts";
import { Post } from "../components/Post";
import Navbar from "../components/NavBar";

export default function Dashboard() {
  // Either created_at or upvotes
  const [sortBy, setSortBy] = useState("created_at");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("Dashboard page loaded");

    const doGetPosts = () => {
      getPosts()
        .then((data) => {
          setPosts(data);
        })
        .catch((error) => {
          console.error("Error getting posts:", error);
        });
    };

    doGetPosts();
  }, []);

  const sortedPosts = useMemo(() => {
    if (sortBy === "created_at") {
      return [...posts].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
    } else if (sortBy === "upvotes") {
      return [...posts].sort((a, b) => b.upvotes - a.upvotes);
    }

    return posts;
  }, [posts, sortBy]);

  const filteredPosts = useMemo(() => {
    if (search === "") return sortedPosts;

    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [sortedPosts, search]);

  return (
    <div>
      <Navbar />
      <h1>Talk Coffee</h1>
      <h3 style={{ padding: "none" }}>Dashboard page</h3>

      <div>
        <label htmlFor="search">Search: </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="sortBy">Sort By: </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="created_at">Created At</option>
          <option value="upvotes">Upvotes</option>
        </select>
      </div>

      <div>
        {filteredPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      <button onClick={() => alert("you created a btn")}></button>
    </div>
  );
}
