import SearchBar from "./../components/SearchBar";
import SearchFilter from "./../components/SearchFilter";
import JobCard from "./../components/JobCard";
import Navigator from "./../components/Navigator";
import { useState, useContext, useEffect } from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import { Link } from "react-router-dom";
import { GlobalState } from "./../GlobalState";

function Home() {
  const { state } = useContext(GlobalState);

  useEffect(() => {
    setItems(state.data);
  }, [state.data]);

  useEffect(() => {
    if (state.isLoading) {
      setItems([1, 2, 3, 4, 5]);
    }
  }, [state.isLoading]);

  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Gets current Projects
  var indexOfLastItem = currentPage * itemsPerPage;
  var indexOfFirstItem = indexOfLastItem - itemsPerPage;
  var currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const { items: pageItems } = usePagination({
    count: Math.ceil(items.length / itemsPerPage),
    onChange: (e, value) => setCurrentPage(value),
  });

  return (
    <div>
      <SearchBar />
      <div className="lg:flex mt-5 ">
        <div className="lg:w-3/12 lg:mr-10">
          <SearchFilter />
        </div>
        <div className="mt-5 lg:m-0 lg:w-9/12">
          {/* Checks if the user is searching for data and it is not found */}
          {(state.searchTerm !== "" || state.location !== "") &&
            state.isLoading === false &&
            state.data.length === 0 && (
              <div className="flex justify-center items-center h-full text-xl font-medium text-gray-800 dark:text-gray-300">
                No Jobs Found
              </div>
            )}
          {/* Removes the link when it is loading */}
          {state.isLoading &&
            currentItems.map((data) => <JobCard key={data.id} job={data} />)}
          {!state.isLoading &&
            currentItems.map((data) => (
              <Link key={data.id} to={`/${data.id}`}>
                <JobCard key={data.id} job={data} />
              </Link>
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-end">
        <Navigator items={pageItems} />
      </div>
    </div>
  );
}

export default Home;
