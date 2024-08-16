import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGetPostsQuery, useGetCommentsQuery } from "../../services/postsApi";
import { Post, Comment, UserStats } from "../../types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { useTheme } from "../../ThemeContext";
import { darkTheme, lightTheme } from "../../styles/themes"; 
import "./UserStatsChart.css";


const UserStatsChart: React.FC = () => {
  const { data: postsFromApi, isLoading: isLoadingPosts } =
    useGetPostsQuery(undefined);
  const { data: comments, isLoading: isLoadingComments } =
    useGetCommentsQuery(undefined);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const { t } = useTranslation();
  const postsFromRedux = useSelector((state: RootState) => state.posts.posts);
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    if ((postsFromApi || postsFromRedux.length > 0) && comments) {
      const combinedPosts = [...(postsFromApi || []), ...postsFromRedux];

      const stats: UserStats[] = combinedPosts.reduce(
        (acc: UserStats[], post: Post) => {
          const userStats = acc.find((stat) => stat.userId === post.userId);
          const postCommentCount = comments.filter(
            (comment: Comment) => comment.postId === post.id
          ).length;

          if (userStats) {
            userStats.postCount += 1;
            userStats.commentCount += postCommentCount;
          } else {
            acc.push({
              userId: post.userId,
              postCount: 1,
              commentCount: postCommentCount,
            });
          }
          return acc;
        },
        []
      );
      setUserStats(stats);
    }
  }, [postsFromApi, postsFromRedux, comments]);

  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const backgroundColor = theme === "dark" ? "#070F2B" : "#ffffff";

  const commonChartOptions = {
    chart: {
      type: "column",
      backgroundColor: currentTheme["--background-color-secondary"],
    },
    xAxis: {
      categories: userStats.map((stat) => `User ${stat.userId}`),
      crosshair: true,
      labels: { style: { color: currentTheme["--text-color"] } },
    },
    yAxis: {
      min: 0,
      labels: { style: { color: currentTheme["--text-color"] } },
    },
    legend: {
      itemStyle: { color: currentTheme["--text-color"] }, 
    },
  };

  const postChartOptions = {
    ...commonChartOptions,
    title: {
      text: t("postByUser"),
      style: { color: currentTheme["--text-color"] },
    },
    yAxis: {
      ...commonChartOptions.yAxis,
      title: { text: "Posts", style: { color: currentTheme["--text-color"] } },
    },
    series: [
      {
        name: "Posts",
        data: userStats.map((stat) => stat.postCount),
        color: "#2caffe",
      },
    ],
  };

  const commentChartOptions = {
    ...commonChartOptions,
    title: {
      text: t("commentsByUser"),
      style: { color: currentTheme["--text-color"] },
    },
    yAxis: {
      ...commonChartOptions.yAxis,
      title: {
        text: t("comments"),
        style: { color: currentTheme["--text-color"] },
      },
    },
    series: [
      {
        name: t("comments"),
        data: userStats.map((stat) => stat.commentCount),
        color: "#800080",
      },
    ],
  };

  const combinedChartOptions = {
    ...commonChartOptions,
    title: {
      text: t("postsAndCommentsByUser"),
      style: { color: currentTheme["--text-color"] },
    },
    yAxis: {
      ...commonChartOptions.yAxis,
      title: {
        text: t("quantity"),
        style: { color: currentTheme["--text-color"] },
      },
    },
    series: [
      {
        name: "Posts",
        data: userStats.map((stat) => stat.postCount),
        color: "#2caffe",
      },
      {
        name: t("comments"),
        data: userStats.map((stat) => stat.commentCount),
        color: "#800080",
      },
    ],
  };

  if (isLoadingPosts || isLoadingComments) return <div>Cargando</div>;

  return (
    <div className="user-stats-container">
      <h2>{t("Posts Chart")}</h2>
      <HighchartsReact highcharts={Highcharts} options={postChartOptions} />
      <h2>{t("Comments Chart")}</h2>
      <HighchartsReact highcharts={Highcharts} options={commentChartOptions} />
      <h2>{t("Combined Chart")}</h2>
      <HighchartsReact highcharts={Highcharts} options={combinedChartOptions} />
    </div>
  );
};
export default UserStatsChart;
