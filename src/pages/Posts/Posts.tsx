import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import { useGetPostsQuery } from "../../services/postsApi";
import { Post } from "../../types";
import { setPosts } from "../../features/posts/postsSlice";
import { useTranslation } from "react-i18next";
import "./Posts.css";

const Posts: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const posts = useSelector((state: RootState) => state.posts.posts);
  const initialized = useSelector(
    (state: RootState) => state.posts.initialized
  );
  const { data, error, isLoading } = useGetPostsQuery(undefined, {
    skip: initialized,
  });

  useEffect(() => {
    if (data && !initialized) {
      dispatch(setPosts(data));
    }
  }, [data, initialized, dispatch]);

  const handleEdit = (postId: number) => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleDelete = (postId: number) => {
    navigate(`/posts/${postId}/delete`);
  };

  const handleAddPost = () => {
    navigate("/posts/create");
  };

  const handleViewPost = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  if (isLoading) return <div>{t("loading")}...</div>;
  if (error) return <div>{t("postLoadError")}</div>;

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      {isAuthenticated && (
        <button className="button-add" onClick={handleAddPost}>
          {t("addPost")}
        </button>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>{t("titlePost")}</th>
            {isAuthenticated && <th>{t("actions")}</th>}
          </tr>
        </thead>
        <tbody>
          {posts?.map((post: Post) => (
            <tr key={post.id}>
              <td
                onClick={() => handleViewPost(post.id)}
                className="post-title"
              >
                {post.title}
              </td>
              {isAuthenticated && (
                <td>
                  <button
                    className="button-edit"
                    onClick={() => handleEdit(post.id)}
                  >
                    {t("edit")}
                  </button>
                  <button
                    className="button-delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    {t("delete")}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
