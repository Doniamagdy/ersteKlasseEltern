
import React from "react";

export function ColorArticles({ children }) {
  const colors = {
    der: "blue",
    die: "red",
    das: "green",
  };

  const processChildren = (child) => {
    // لو Text Node
    if (typeof child === "string") {
      const parts = child.split(/(der|die|das)/gi);

      return parts.map((part, index) => {
        const article = part.toLowerCase();

        return colors[article] ? (
          <span
            key={index}
            style={{
              color: colors[article],
              fontWeight: "bold",
            }}
          >
            {part}
          </span>
        ) : (
          part
        );
      });
    }

    // لو Number
    if (typeof child === "number") {
      return child;
    }

    // لو React Element
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        children: processChildren(child.props.children),
      });
    }

    // لو Array
    if (Array.isArray(child)) {
      return child.map((item, index) => (
        <React.Fragment key={index}>
          {processChildren(item)}
        </React.Fragment>
      ));
    }

    return child;
  };

  return <>{processChildren(children)}</>;
}
