import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const isPostId = !isNaN(Number(value));
                const formattedValue = isPostId
                  ? `Post #${value}`
                  : capitalize(value);


          return isLast ? (
            <li key={to} className="breadcrumb-item active" aria-current="page">
              {formattedValue}
            </li>
          ) : (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>{formattedValue}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
