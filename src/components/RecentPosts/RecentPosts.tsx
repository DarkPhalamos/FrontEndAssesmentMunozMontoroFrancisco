import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "../../services/postsApi";
import { Post } from "../../types";
import { useTranslation } from "react-i18next";
import "./RecentPosts.css";

const RecentPosts: React.FC = () => {
  const { t } = useTranslation();
  const { data: posts, error, isLoading } = useGetPostsQuery(undefined);
  const navigate = useNavigate();

  const handleViewAllPosts = () => {
    navigate("/posts");
  };

  if (isLoading) return <div>{t("loading")}...</div>;
  if (error) return <div>{t("postLoadError")}</div>;

  const recentPosts = posts ? posts.slice(0, 10) : [];

  return (
    <div className="recent-posts">
      <h2>{t("lastPost")}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>{t("titlePost")}</th>
          </tr>
        </thead>
        <tbody>
          {recentPosts.map((post: Post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleViewAllPosts} className="button-view-all">
        Ver Todos los Posts
      </button>
    </div>
  );
};

export default RecentPosts;
