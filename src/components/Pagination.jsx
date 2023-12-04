function Pagination({ currentPage, totalPages }) {
  // const active = "pageSpan"+ ${activePage}

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i}
          value={i + 1}
          className={`pageSpan ${i === currentPage ? "active" : ""}`}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
