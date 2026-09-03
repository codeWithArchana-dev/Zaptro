import React from "react";

const getPages = (current, total) => {
  const pages = [];
  if (total <=2) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, "...", total);
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total);
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
  }
  return pages;
};

const Pagination = ({ page, dynamicPage, pageHandler }) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button onClick={()=>pageHandler(page-1)}
        disabled={page === 1}
        className={`${page === 1 ? "bg-red-400" : "bg-red-500"} text-white rounded-md cursor-pointer
        px-3 py-1`}
      >
        Prev
      </button>

      {getPages(page, dynamicPage)?.map((item, index) => {
        return (
          <span
            key={index}
            onClick={() => typeof item === "number" && pageHandler(item)}
            className={` cursor-pointer ${item === page ? "font-bold text-red-600" : ""}`}
          >
            {item}
          </span>
        );
      })}

      <button onClick={()=>pageHandler(page+1)}
        disabled={page === dynamicPage}
        className={`${page === dynamicPage ? "bg-red-400" : "bg-red-500"} text-white rounded-md cursor-pointer
        px-3 py-1`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
