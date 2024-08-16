import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPostMutation } from "../../services/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { addPost as addPostAction } from "../../features/posts/postsSlice";
import { AppDispatch, RootState } from "../../store";
import { useTranslation } from "react-i18next";
import ProgressBar from "components/ProgressBar/ProgressBar";
import "./AddPost.css";

const AddPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addPostApi, { isLoading }] = useAddPostMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { t } = useTranslation();

  const handleAdd = async () => {
    if (!userId) {
      alert(t("userNotAuthenticated"));
      return;
    }
    if (!title.trim()) {
      setValidationError(t("titleRequired"));
      return;
    }

    try {
      const newPost = await addPostApi({ title, body, userId }).unwrap();
      dispatch(addPostAction(newPost));
      setSuccessMessage(t("postAddSuccess"));
    } catch (error) {
      setErrorMessage(t("postAddError"));
    }
  };

  const handleClose = () => {
    navigate("/posts");
  };

  return (
    <div className="add-post-container">
      <h2>{t("addPost")}</h2>
      <form className="add-post-form">
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
          {" "}
          <label>{t("content")}</label>
          <textarea
            value={body}
            name="body"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button
            className="addButton"
            type="button"
            onClick={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? t("adding") : t("add")}
          </button>
          <button type="button" onClick={handleClose}>
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

export default AddPost;
