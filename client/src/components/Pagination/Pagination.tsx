import "./Pagination.scss";
import {
  getAllPagination,
  setCurrentPage,
} from "../../store/PaginationSlice/PaginationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface PaginationPropsType {
  length: number;
}

const Pagination = ({ length }: PaginationPropsType) => {
  const dispatch = useAppDispatch();
  const { currentPage, postsPerPage } = useAppSelector(getAllPagination);
  const pages: number[] = Array.from(
    { length: postsPerPage > 1 ? Math.ceil(length / postsPerPage) : 0 },
    (_, i) => i + 1
  );

  return (
    <section className="pagination">
      <div className="buttons">
        <button
          disabled={currentPage === 1}
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
          {"<"}
        </button>
        {pages.map((elm) => {
          return (
            <button
              className={currentPage === elm ? "activePage" : "normal"}
              key={elm}
              onClick={() => dispatch(setCurrentPage(elm))}
            >
              {elm}
            </button>
          );
        })}
        <button
          disabled={currentPage === Math.ceil(length / postsPerPage)}
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default Pagination;
