import React from "react"
import { navigate } from "@reach/router"
import * as JsSearch from "js-search"
import chrono from "chrono-node"
import { getMonth, getYear } from "date-fns"

import SearchHeader from "./SearchHeader"

class Search extends React.Component {
  state = {
    talks: [],
    results: [],
    query: "",
  }

  componentDidMount() {
    const { talks, defaultQuery } = this.props

    this.rebuildIndex(talks)
    if (defaultQuery) {
      this.searchData(defaultQuery)
    }
  }

  rebuildIndex = documents => {
    const search = new JsSearch.Search("name")

    search.indexStrategy = new JsSearch.PrefixIndexStrategy()
    search.sanitizer = new JsSearch.LowerCaseSanitizer()
    search.searchIndex = new JsSearch.TfIdfSearchIndex("name")

    search.addIndex("name")
    search.addIndex("topic")
    search.addIndex("description")
    search.addDocuments(documents)

    this.search = search
  }

  onChange = event => {
    const { onQuery } = this.props
    const query = event.target.value
    this.setState({
      query,
    })

    if (query === "") {
      onQuery(query)
      navigate("/archive/", { replace: true, state: { query } })
    }
  }

  onSearch = event => {
    const { query } = this.state
    event.preventDefault()
    this.searchData(query)
  }

  searchData = input => {
    if (!this.search) {
      return
    }
    const { onResults, onQuery, talks } = this.props

    const timeAwareQuery = chrono.parse(input)
    // We only interested in looking after a single date/range otherwise it's too complicated
    const query =
      timeAwareQuery.length >= 1
        ? input.replace(timeAwareQuery[0].text, "").trim()
        : input

    let queryResult
    // Filter results by parsed Date
    if (timeAwareQuery.length >= 1) {
      queryResult = query === "" ? talks : this.search.search(query)
      const date = timeAwareQuery[0]
      const isRange =
        date.end && (date.end.knownValues.month || date.end.knownValues.year)
      queryResult = queryResult.filter(item => {
        let month = null
        let year = null

        if (isRange) {
          if (date.end.knownValues.month) {
            month =
              getMonth(item.timestamp) + 1 <= date.end.knownValues.month &&
              getMonth(item.timestamp) + 1 >= date.start.knownValues.month
          }
          if (date.end.knownValues.year) {
            year =
              getYear(item.timestamp) <= date.end.knownValues.year &&
              getYear(item.timestamp) >= date.start.knownValues.year
          }

          return (month === null || month) && (year === null || year)
        } else {
          let month = null
          let year = null
          if (date.start.knownValues.month) {
            month =
              getMonth(item.timestamp) + 1 === date.start.knownValues.month
          }
          if (date.start.knownValues.year) {
            year = getYear(item.timestamp) === date.start.knownValues.year
          }

          return (month === null || month) && (year === null || year)
        }
      })
    } else {
      queryResult = this.search.search(query)
    }

    navigate("/archive/", { replace: true, state: { query: input } })
    this.setState({ query: input, results: queryResult })

    if (onResults) {
      onResults(queryResult)
    }

    if (onQuery) {
      onQuery(input)
    }
  }

  render() {
    const { defaultQuery, copy, copyInline } = this.props
    return (
      <SearchHeader
        heading="Search"
        onSubmit={this.onSearch}
        onChange={this.onChange}
        defaultValue={defaultQuery}
        copy={copy}
        copyInline={copyInline}
      />
    )
  }
}

export default Search
