import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useNavigate } from "react-router-dom";
import { useGetPostsQuery, useGetCommentsQuery } from "../services/postsApi";
import { Post, Comment } from "../types";
import "./UserStatsChartVertical.css";

const UserStatsChartVertical: React.FC = () => {
  const { data: posts } = useGetPostsQuery(undefined);
  const { data: comments } = useGetCommentsQuery(undefined);
  const navigate = useNavigate();

  const userStats = posts?.reduce((acc: any, post: Post) => {
    if (!acc[post.userId]) {
      acc[post.userId] = { postCount: 0, commentCount: 0 };
    }
    acc[post.userId].postCount += 1;
    acc[post.userId].commentCount +=
      comments?.filter((comment: Comment) => comment.postId === post.id)
        .length || 0;
    return acc;
  }, {});

  const data = Object.keys(userStats || {}).map((userId) => ({
    userId: Number(userId),
    ...userStats[userId],
  }));

  const options = {
    chart: {
      type: "bar",
      height: "100%",   
    },
    title: {
      text: "Estadísticas de Usuarios",
    },
    xAxis: {
      categories: data.map((d) => `Usuario ${d.userId}`),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Cantidad",
      },
    },
    series: [
      {
        name: "Posts",
        data: data.map((d) => d.postCount),
      },
      {
        name: "Comentarios",
        data: data.map((d) => d.commentCount),
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: "50%",
            },
            xAxis: {
              labels: {
                style: {
                  fontSize: "10px", 
                },
              },
            },
            yAxis: {
              labels: {
                style: {
                  fontSize: "10px",
                },
              },
            },
          },
        },
      ],
    },
  };

  return (
    <div className="user-stats-chart-vertical">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <button onClick={() => navigate("/charts")} className="button-view-all">
        Ver Gráficas
      </button>
    </div>
  );
};

export default UserStatsChartVertical;
