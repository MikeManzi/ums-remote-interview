interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: any;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div>
      <ul className="flex justify-end space-x-2 items-center mx-auto list-none w-full my-4 rounded text-xs font-semibold">
        <li
          className={`${
            currentPage === 1 && "disabled"
          } rounded-sm p-1 cursor-pointer border border-slate-500`}
          onClick={() =>
            currentPage !== 1 ? onPageChange(currentPage - 1) : null
          }
        >
          Previous
        </li>
        {totalPages < 5 ? (
          [...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`rounded-sm py-0.5 px-1.5 cursor-pointer border ${
                currentPage === i + 1
                  ? "text-slate-900 border-slate-600 bg-slate-100"
                  : "text-slate-400 border-slate-400"
              }`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </li>
          ))
        ) : (
          <>
            <li
              className={`rounded-sm py-0.5 px-1.5 cursor-pointer border ${
                currentPage === 1
                  ? "text-slate-900 border-slate-600 bg-slate-100"
                  : "text-slate-400 border-slate-400"
              }`}
              onClick={() => onPageChange(1)}
            >
              1
            </li>
            <li
              className={`rounded-sm py-0.5 px-1.5 cursor-pointer border ${
                currentPage === 2
                  ? "text-slate-900 border-slate-600 bg-slate-100"
                  : "text-slate-400 border-slate-400"
              }`}
              onClick={() => onPageChange(2)}
            >
              2
            </li>
            <li
              className={`rounded-sm py-0.5 px-1.5 cursor-pointer border ${
                currentPage !== 2 &&
                currentPage !== 1 &&
                currentPage !== totalPages - 1 &&
                currentPage !== totalPages
                  ? "text-slate-900 border-slate-600 bg-slate-100"
                  : "text-slate-400 border-slate-400"
              }`}
            >
              ...
            </li>
            <li
              className={`rounded-sm py-0.5 px-1.5 cursor-pointer border ${
                currentPage === totalPages - 1
                  ? "text-slate-900 border-slate-600 bg-slate-100"
                  : "text-slate-400 border-slate-400"
              }`}
              onClick={() => onPageChange(totalPages - 1)}
            >
              {totalPages - 1}
            </li>
            <li
              className={`rounded-sm py-0.5 px-1.5 cursor-pointer border ${
                currentPage === totalPages
                  ? "text-slate-900 border-slate-600 bg-slate-100"
                  : "text-slate-400 border-slate-400"
              }`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </li>
          </>
        )}
        <li
          className={`${
            currentPage === totalPages && "disabled"
          } rounded-sm p-1 cursor-pointer border border-slate-500`}
          onClick={() =>
            currentPage !== totalPages ? onPageChange(currentPage + 1) : null
          }
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
