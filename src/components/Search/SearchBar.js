import React from "react"
import { navigate } from "@reach/router"
import axios from "axios"
import * as JsSearch from "js-search"
import chrono from "chrono-node"
import { getMonth, getYear } from "date-fns"

import SearchHeader from "./SearchHeader"

/**
 * Because Gatsby Transition plugin always re-mounts components based on pathname
 * we cannot avoid remounting the client only page.
 * So we need to keep a reference of the js-search engine in the window to
 * prevent redownloading eachtime a query is performed.
 *
 * Gatsby's Reach Router doesn't listen for state changes only on querystrings.
 * So we need the query in the pathname, which results in the above being problematic.
 *
 * This can be refactored if this issue is resolved:
 * https://github.com/TylerBarnes/gatsby-plugin-transition-link/issues/140
 */
class Search extends React.Component {
  state = {
    talks: [],
    search: window.FEL,
    results: [],
    isLoading: !window.FEL,
    query: "",
  }

  componentDidMount = async () => {
    const { isLoading } = this.state
    const { query } = this.props

    this.setState({ query })

    if (isLoading) {
      let events = window.FEL

      try {
        const results = await axios.get("/search.json")
        events = results.data
      } catch (e) {
        // TODO Fail
        return
      }

      // Extract speaker's talks into idividual items
      const talks = events.reduce((accum = [], event) => {
        event.speakers.forEach(speaker => {
          accum.push({
            ...speaker,
            date: event.date,
            timestamp: new Date(event.fields.timestamp),
          })
        })
        return accum
      }, [])

      this.rebuildIndex(talks)
    }

    if (query) {
      this.searchData(query)
    }
  }

  componentDidUpdate(prevProps) {
    // If query updates for incoming search parameter change
    // Perform the search.
    const { query } = this.props
    if (query !== prevProps.query) {
      this.setState({
        query,
      })
      this.searchData(query)
    }
  }

  rebuildIndex = documents => {
    const { onLoaded } = this.props
    const search = new JsSearch.Search("name")

    search.indexStrategy = new JsSearch.PrefixIndexStrategy()
    search.sanitizer = new JsSearch.LowerCaseSanitizer()
    search.searchIndex = new JsSearch.TfIdfSearchIndex("name")

    search.addIndex("name")
    search.addIndex("topic")
    search.addIndex("description")
    search.addDocuments(documents)

    this.setState({ search, isLoading: false })
    window.FEL = search

    if (onLoaded) {
      onLoaded(true)
    }
  }

  onChange = event => {
    const query = event.target.value
    this.setState({
      query,
    })
  }

  onSearch = event => {
    event.preventDefault()
    const { query } = this.state
    navigate(`/search/${query.replace(" ", "+")}/`, {
      state: { preventTransition: true },
    })
  }

  searchData = input => {
    const { onResults } = this.props
    const { search } = this.state

    const timeAwareQuery = chrono.parse(input)
    // We only interested in looking after a single date/range otherwise it's too complicated
    const query =
      timeAwareQuery.length >= 1
        ? input.replace(timeAwareQuery[0].text, "").trim()
        : input

    let queryResult
    // Filter results by parsed Date
    if (timeAwareQuery.length >= 1) {
      queryResult = query === "" ? search._documents : search.search(query)
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
      queryResult = search.search(query)
    }

    this.setState({ query, results: queryResult })

    if (onResults) {
      onResults(queryResult)
    }
  }

  render() {
    const { query, copy } = this.props
    return (
      <SearchHeader
        heading="Search"
        onSubmit={this.onSearch}
        onChange={this.onChange}
        defaultValue={query}
        copy={copy}
        copyInline
      />
    )
  }
}

export default Search
