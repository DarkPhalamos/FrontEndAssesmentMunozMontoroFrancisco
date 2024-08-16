import React, { useEffect } from "react";
import PostChart from "../../components/PostChart/PostChart";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetPostsQuery } from "../../services/postsApi";
import { RootState, AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { Post } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../features/posts/postsSlice";
import "./Home.css";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleViewPost = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const posts = useSelector((state: RootState) => state.posts.posts);
  const initialized = useSelector(
    (state: RootState) => state.posts.initialized
  );
  const { data, error, isLoading } = useGetPostsQuery(undefined, {
    skip: initialized,
  });

  const latestPosts: Post[] = posts ? posts.slice(0, 10) : [];

  useEffect(() => {
    if (data && !initialized) {
      dispatch(setPosts(data));
    }
  }, [data, initialized, dispatch]);

  return (
    <div className="home-container">
      <div className="column latest-posts">
        <h2>{t("lastPost")}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>{t("tableTitle")}</th>
            </tr>
          </thead>
          <tbody>
            {latestPosts.map((post: Post) => (
              <tr key={post.id}>
                <td
                  onClick={() => handleViewPost(post.id)}
                  className="post-title"
                >
                  {post.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/posts" className="button-view-all">
          {t("allPost")}
        </Link>
      </div>
      <div className="column user-stats">
        <PostChart />
        <Link to="/charts" className="button-view-all">
          {t("allCharts")}
        </Link>
      </div>
    </div>
  );
};
export default Home;
