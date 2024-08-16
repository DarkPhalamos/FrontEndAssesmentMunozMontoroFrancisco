import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditPostMutation, useGetPostQuery } from "../../services/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { updatePost as updatePostAction } from "../../features/posts/postsSlice";
import { AppDispatch, RootState } from "../../store";
import { useTranslation } from "react-i18next";
import ProgressBar from "components/ProgressBar/ProgressBar";
import "./EditPost.css";

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const postId = Number(id);
  const postFromState = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post.id === postId)
  );
  const {
    data: postFromApi,
    error,
    isLoading,
  } = useGetPostQuery(postId, {
    skip: !!postFromState,
  });
  const [editPostApi, { isLoading: isUpdating }] = useEditPostMutation();
  const [title, setTitle] = useState(postFromState?.title || "");
  const [body, setBody] = useState(postFromState?.body || "");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);


  useEffect(() => {
    if (postFromApi) {
      setTitle(postFromApi.title);
      setBody(postFromApi.body);
    }
  }, [postFromApi]);

  const handleEdit = async () => {
    if (!title.trim()) {
      setValidationError(t("titleRequired"));
      return;
    }
    if (postFromState) {
      dispatch(updatePostAction({ ...postFromState, title, body }));
      setSuccessMessage(t("postUpdateSuccess"));
    } else {
      try {
        const updatedPost = await editPostApi({
          id: postId,
          title,
          body,
        }).unwrap();
        dispatch(updatePostAction(updatedPost));
        setSuccessMessage(t("postUpdateSuccess"));
        navigate("/posts");
      } catch (error) {
      setErrorMessage(t("postUpdateError"));
      }
    }
  };

  const hadleClose = () => {
    navigate("/posts");
  };

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("postUpdateError")}</div>;

  return (
    <div className="edit-post-container">
      <h2>{t("editPost")}</h2>
      <form className="edit-post-form">
        <div className="form-group">
          <label>{t("titlePost")}</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {validationError && (
            <div className="error-message">{validationError}</div>
          )}
        </div>
        <div className="form-group">
          <label>{t("content")}</label>
          <textarea
            value={body}
            name="body"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button
            className="editButton"
            type="button"
            onClick={handleEdit}
            disabled={isUpdating}
          >
            {isUpdating ? t("updating") : t("update")}
          </button>
          <button type="button" onClick={hadleClose}>
            {t("cancel")}
          </button>
        </div>
      </form>
      {successMessage && (
        <div className="success-message">
          {successMessage}
          <ProgressBar duration={2000} onComplete={() => navigate("/posts")} />
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default EditPost;
