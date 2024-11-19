import { supabase } from "../config";

export const getPost = async (id) => {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id);
  if (error) throw error;
  if (!data || data.length === 0) throw new Error("Post not found.");
  return data[0];
};

export const getPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) throw error;
  return data;
};

export const createPost = async ({ title, content, image_url }) => {
  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new Error("Title is required and must be a non-empty string.");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, image_url }]);
  if (error) throw error;
  return data;
};

export const upvotePost = async (id) => {
  const currentCount = await supabase
    .from("posts")
    .select("upvotes")
    .eq("id", id)
    .single();

  if (!currentCount.data) throw new Error("Post not found.");

  const { data, error } = await supabase
    .from("posts")
    .update({ upvotes: currentCount.data.upvotes + 1 })
    .eq("id", id);

  if (error) throw error;
  return data;
};

export const searchPostByTitle = async (title) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .textSearch("title", title);
  if (error) throw error;
  return data;
};

export const editPost = async (id, { title, content, image_url }) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content, image_url })
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deletePost = async (id) => {
  // Delete all the comments first
  await deleteAllCommentsForPost(id);

  const { data, error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  return data;
};

export const createPostComment = async (postId, content) => {
  const { data, error } = await supabase
    .from("post_comments")
    .insert([{ post_id: postId, content }]);
  if (error) throw error;
  return data;
};

export const getAllPostComments = async (postId) => {
  // Order the comments by created_at in descending order
  const { data, error } = await supabase
    .from("post_comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const deleteAllCommentsForPost = async (postId) => {
  const { data, error } = await supabase
    .from("post_comments")
    .delete()
    .eq("post_id", postId);
  if (error) throw error;
  return data;
};
