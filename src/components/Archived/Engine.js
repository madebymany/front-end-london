import React from "react"
import { navigate } from "@reach/router"

import Search from "./Search"
import Results from "./Results"

class Engine extends React.Component {
  state = {
    index: this.props.index,
    active: [],
    search: [],
    done: false,
    query: this.props.defaultQuery || "",
  }

  componentDidMount() {
    this.onLoadMore(false)
  }

  onLoadMore = (shouldNavigate = true) => {
    const { index } = this.state
    const { chunk, talks } = this.props
    const current = index + 1
    const done = current * chunk >= talks.length - 1
    const active = talks.slice(0, current * chunk)
    this.setState({
      index: current,
      active,
      done,
    })

    if (shouldNavigate) {
      // Replace history with the new index to preserve scroll pos
      navigate("/archive/", { replace: true, state: { lazyLoadIndex: index } })
    }
  }

  onQuery = query => {
    this.setState({ query })
  }

  onSearchResults = results => {
    this.setState({ search: results })
  }

  render() {
    const { search, active, done, query } = this.state
    const { talks, defaultQuery } = this.props
    return (
      <>
        <Search
          defaultQuery={defaultQuery}
          talks={talks}
          onResults={this.onSearchResults}
          onQuery={this.onQuery}
          copyInline={!!query}
          copy={
            query
              ? `Results for "${query}" ${search.length} result${
                  search.length > 1 ? "s" : ""
                }`
              : `${talks.length} talks`
          }
        />
        <Results
          items={query ? search : active}
          onLoadMore={this.onLoadMore}
          done={query || done}
          immediate={!query}
        />
      </>
    )
  }
}

export default Engine
