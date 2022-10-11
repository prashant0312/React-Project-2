import axios from "axios";
import { useEffect, useState } from "react";
import CharacterGrid from "./components/Characters/CharacterGrid";
import Pagination from "./components/Pagination/Pagination";
import Header from "./components/UI/Header";
import Search from "./components/UI/Search";
import "./styles.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [charsPerPage] = useState(8);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );

      // console.log(result.data);
      setItems(result.data);
      setIsLoading(false);
    };
    fetchItems();
  }, [query]);

  //Get Current Characters

  const indexOfLastChars = currentPage * charsPerPage;
  const indexOfFirstChars = indexOfLastChars - charsPerPage;
  const currentCharacters = items.slice(indexOfFirstChars, indexOfLastChars);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={currentCharacters} />
      <Pagination
        charsPerPage={charsPerPage}
        totatCharacters={items.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
