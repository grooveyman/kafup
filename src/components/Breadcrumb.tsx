import React from "react";
import { useNavigate } from "react-router-dom";

interface Crumb {
  label: string;
  href?: string; // last crumb may not have a link
}

interface BreadcrumbProps {
  crumbs: Crumb[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs }) => {
  const navigate = useNavigate();
 
  return (
    <nav>
      <ol className="breadcrumb">
        {/* <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li> */}
        {crumbs.map((crumb, index) => (
          <li
            key={index}
            className={`breadcrumb-item`}
            aria-current={index === crumbs.length - 1 ? "page" : undefined}
          >
            {index === crumbs.length - 1 || !crumb.href ? (
              <a className="breadcrumb-active" href="#">{crumb.label}</a>
            ) : (
              <a className="breadcrumb-active" href={crumb.href!}>{crumb.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
