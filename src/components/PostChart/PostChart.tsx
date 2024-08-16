import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useGetPostsQuery } from "../../services/postsApi";
import { Post, PostStats } from "../../types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { useTheme } from "../../ThemeContext"; 
import { lightTheme, darkTheme } from "../../styles/themes";  

const PostsChart: React.FC = () => {
  const { data: postsFromApi, isLoading: isLoadingPosts } =
    useGetPostsQuery(undefined);
  const [userStats, setUserStats] = useState<PostStats[]>([]);
  const { t } = useTranslation();
  const postsFromRedux = useSelector((state: RootState) => state.posts.posts);
  const { theme } = useTheme();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;


  useEffect(() => {
    if (postsFromApi || postsFromRedux.length > 0) {
      const combinedPosts = [...(postsFromApi || []), ...postsFromRedux];

      const stats: PostStats[] = combinedPosts.reduce(
        (acc: PostStats[], post: Post) => {
          const userStats = acc.find((stat) => stat.userId === post.userId);

          if (userStats) {
            userStats.postCount += 1;
          } else {
            acc.push({
              userId: post.userId,
              postCount: 1,
            });
          }
          return acc;
        },
        []
      );
      setUserStats(stats);
    }
  }, [postsFromApi, postsFromRedux]);

  const options = {
    chart: {
      type: "column",
      backgroundColor: currentTheme["--background-color-secondary"],
    },
    title: { text: "Posts", style: { color: currentTheme["--text-color"] } },
    xAxis: {
      categories: userStats.map((stat) => `User ${stat.userId}`),
      crosshair: true,
      labels: { style: { color: currentTheme["--text-color"] } },
    },
    yAxis: {
      min: 0,
      labels: { style: { color: currentTheme["--text-color"] } },
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
    ],
    legend: {
      itemStyle: { color: currentTheme["--text-color"] },
    },
  };

  if (isLoadingPosts) return <div>{t("loading")}</div>;

  return (
    <div>
      <h2>{t("postChart")}</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PostsChart;
