import React, { useEffect } from "react";
import Status from "../molecules/StatusBadge";
import Pagination from "../molecules/Pagination";

interface TableProps {
  headers: HeadersType[];
  data: [];
  handleAction: any;
}

export interface HeadersType {
  key: string;
  label: string;
}

export default function Table({ headers, data, handleAction }: TableProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(5);
  const [totalItems, setTotalItems] = React.useState(data.length);
  const [totalPages, setTotalPages] = React.useState(
    totalItems < itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage)
  );
  const [dataToDisplay, setDataToDisplay] = React.useState(
    data.slice(0, itemsPerPage)
  );
  const [sortedData, setSortedData] = React.useState<any>();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setDataToDisplay(
      sortedData
        ? sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage)
        : data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    );
  };

  const toggleMenu = (e?: any): void => {
    if (!e) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById("action-menu")!.style.display = "none";
    } else {
      const el = e.target.parentNode?.querySelector("#action-menu");
      if (el) {
        el.classList.toggle("hidden");
      }
    }
  };

  useEffect(() => {
    setTotalItems(data.length);
    setTotalPages(
      data.length < itemsPerPage ? 1 : Math.ceil(data.length / itemsPerPage)
    );
    handlePageChange(1);
    if (sortedData) {
      setSortedData(sortedData.push(data[data.length - 1]));
    }
  }, [data]);

  return (
    <>
      <table className="border-collapse rounded-xl w-full overflow-x-scroll border border-green-100 text-sm">
        <thead className="bg-green-50">
          <tr className="text-green-700 font-regular text-left">
            <th className="p-3 whitespace-nowrap">#</th>
            {headers.map((header: HeadersType, _i) => (
              <th key={header.key} className="p-3">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gunmetal font-medium">
          {dataToDisplay.map((row, index) => (
            <tr key={index}>
              <td className="p-3">{index + 1}</td>
              {headers.map((header: HeadersType) =>
                header.key === "action" ? (
                  <td
                    key={header.key}
                    className="p-3 relative"
                    onClick={(e) => toggleMenu(e)}
                  >
                    <div className="flex space-x-0.5 justify-start cursor-pointer">
                      <div className="pt-0.5 pl-0.5 rounded border border-black"></div>
                      <div className="pt-0.5 pl-0.5 rounded border border-black"></div>
                      <div className="pt-0.5 pl-0.5 rounded border border-black"></div>
                    </div>
                    <SubMenu
                      verify={
                        row["status"] === "UNVERIFIED"
                          ? () => handleAction("verify", row)
                          : false
                      }
                      view={() => (handleAction("view", row), toggleMenu())}
                    />
                  </td>
                ) : header.key === "status" ? (
                  <td className="p-3 flex">
                    <Status status={row[header.key]} />
                  </td>
                ) : (
                  <td key={header.key} className="p-3">
                    {row[header.key]}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

const SubMenu = ({ verify, view }: { verify: any; view: any }) => (
  <div
    className="absolute bg-gray-50 hidden z-10 rounded border right-3 w-full top-2/3 text-xs"
    id="action-menu"
  >
    {verify && (
      <div
        className="hover:bg-gray-100 pl-3 pr-5 py-2 border-b cursor-pointer"
        onClick={verify}
      >
        Verify
      </div>
    )}
    <div
      className="hover:bg-gray-100 pl-3 pr-5 py-2 border-b cursor-pointer"
      onClick={view}
    >
      View Details
    </div>
  </div>
);
