import React, { useState } from "react"

import SearchBar from "./SearchBar"
import SearchLoader from "./SearchLoader"
import SearchResults from "./SearchResults"

const Search = ({ query }) => {
  const [isLoaded, setLoaded] = useState(!!window.FEL)
  const [isReady, setReady] = useState(!!window.FEL)
  const [results, setResults] = useState([])

  const search = query ? query.replace("+", " ") : ""

  return (
    <>
      <SearchBar
        query={search}
        copy={
          search
            ? `Results for "${search}" ${results.length} result${
                results.length > 1 ? "s" : ""
              }`
            : ""
        }
        onResults={setResults}
        onLoaded={setLoaded}
      />
      <SearchLoader isLoaded={isLoaded} onExited={setReady} />
      {isReady && <SearchResults results={results} />}
    </>
  )
}

export default Search
