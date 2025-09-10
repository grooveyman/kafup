import React from "react";

interface Crumb {
  label: string;
  href?: string; // last crumb may not have a link
}

interface BreadcrumbProps {
  crumbs: Crumb[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs }) => {
  return (
    <nav
      style={{
        ["--bs-breadcrumb-divider" as any]:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
      }}
      aria-label="breadcrumb"
    >
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        {crumbs.map((crumb, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === crumbs.length - 1 ? "active" : ""
            }`}
            aria-current={index === crumbs.length - 1 ? "page" : undefined}
          >
            {index === crumbs.length - 1 || !crumb.href ? (
              crumb.label
            ) : (
              <a href={crumb.href}>{crumb.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
