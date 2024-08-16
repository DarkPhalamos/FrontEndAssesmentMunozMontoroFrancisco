import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeletePostMutation } from "../../services/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { deletePost as deletePostAction } from "../../features/posts/postsSlice";
import { AppDispatch, RootState } from "../../store";
import { useTranslation } from "react-i18next";
import ProgressBar from "components/ProgressBar/ProgressBar";
import "./DeletePost.css";

const DeletePost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const postId = Number(id);
  const postFromState = useSelector((state: RootState) =>
    state.posts.posts.find((post) => post.id === postId)
  );
  const [deletePostApi, { isLoading }] = useDeletePostMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      if (postFromState) {
        dispatch(deletePostAction(postFromState.id));
      } else {
        await deletePostApi(postId).unwrap();
        dispatch(deletePostAction(postId));
      }
      setSuccessMessage(t("postDeleteSuccess"));
    } catch (error) {
      setErrorMessage(t("postDeleteError"));
    }
  };

  const handleClose = () => {
    navigate("/posts");
  };

  return (
    <div className="delete-post-container">
      <h2>{t("deletePost")}</h2>
      <p>{t("deletePostQuestion")}</p>
      <div className="form-actions">
        <button
          className="deleteButton"
          type="button"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? "Eliminando..." : "Eliminar"}
        </button>
        <button onClick={handleClose}>{t("cancel")}</button>
      </div>
      {successMessage && (
        <div className="success-message">
          {successMessage}
          <ProgressBar duration={1400} onComplete={() => navigate("/posts")} />
        </div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default DeletePost;
