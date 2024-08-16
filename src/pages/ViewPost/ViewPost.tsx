import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetPostQuery,
  useGetCommentsByPostIdQuery,
} from "../../services/postsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from "react-i18next";
import "./ViewPost.css";

const ViewPost: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  ); 

  const postFromState = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post.id === postId)
  );

  const {
    data: postFromApi,
    error: postError,
    isLoading: postLoading,
  } = useGetPostQuery(postId, {
    skip: !!postFromState,
  });

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useGetCommentsByPostIdQuery(postId);

  const [title, setTitle] = useState(postFromState?.title || "");
  const [body, setBody] = useState(postFromState?.body || "");

  useEffect(() => {
    if (postFromApi) {
      setTitle(postFromApi.title);
      setBody(postFromApi.body);
    }
  }, [postFromApi]);

  if (postLoading || commentsLoading) return <div>{t("loading")}...</div>;
  if (postError) return <div>{t("postLoadError")}</div>;
  if (commentsError) return <div>{t("commentsLoadError")}</div>;

  return (
    <div className="view-post-container">
      <h2>{title}</h2>
      <p>{body}</p>
      <h3>{t("comments")}</h3>
      <ul>
        {isAuthenticated ? (
          commentsLoading ? (
            <div>{t("loadingComments")}...</div>
          ) : commentsError ? (
            <div>{t("commentsLoadError")}</div>
          ) : (
            comments?.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.name}</strong>
                <p>{comment.body}</p>
              </li>
            ))
          )
        ) : (
          <li className="comment-placeholder">
            <strong>{t("authRequiredToViewComments")}</strong>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ViewPost;
