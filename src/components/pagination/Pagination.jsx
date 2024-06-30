import { useEffect, useState } from "react";

export default function Pagination(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = props.pageTotal ? props.pageTotal : 5;
  const total = props.data.length;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const nPage = Math.ceil(total / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    updateRecordTodo();
  }, [props.data, currentPage]);

  const updateRecordTodo = () => {
    if (props.data.slice(firstIndex, lastIndex) == 0) {
      prevPag();
    } else {
      props.setRecordToDo(props.data.slice(firstIndex, lastIndex));
    }
  };

  const prevPag = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPag = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{currentPage}</span> to{" "}
            <span className="font-medium">{nPage}</span> de{" "}
            <span className="font-medium">{total}</span> resultados
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={prevPag}
              className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-4 w-4 text-slate-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="5" y1="12" x2="19" y2="12" />{" "}
                <line x1="5" y1="12" x2="9" y2="16" />{" "}
                <line x1="5" y1="12" x2="9" y2="8" />
              </svg>
            </a>
            {numbers.map((n, i) => (
              <a
                onClick={() => changePage(n)}
                key={i}
                aria-current="page"
                className={
                  "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 " +
                  (currentPage === n
                    ? " text-white bg-cyan-600"
                    : "cursor-pointer text-black hover:bg-gray-200")
                }
              >
                {n}
              </a>
            ))}

            <a
              onClick={nextPag}
              className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>

              <svg
                className="h-4 w-4 text-slate-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="5" y1="12" x2="19" y2="12" />{" "}
                <line x1="15" y1="16" x2="19" y2="12" />{" "}
                <line x1="15" y1="8" x2="19" y2="12" />
              </svg>

            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
