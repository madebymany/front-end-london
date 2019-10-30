import React from "react"
import { navigate } from "@reach/router"

import Search from "./Search"
import Results from "./Results"

class Engine extends React.Component {
  state = {
    index: this.props.index,
    active: this.props.talks.slice(
      0,
      (this.props.index + 1) * this.props.chunk
    ),
    search: [],
    done: false,
    query: this.props.defaultQuery || "",
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
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
      navigate("/archive/", {
        replace: true,
        state: { lazyLoadIndex: index },
      })
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
    const { talks, defaultQuery, placeholder } = this.props

    let copy = `${talks.length} talks`
    if (query) {
      copy = search.length
        ? `Results for "${query}" ${search.length} result${
            search.length > 1 ? "s" : ""
          }`
        : "Sorry, no results found."
    }
    return (
      <>
        <Search
          defaultQuery={defaultQuery}
          talks={talks}
          onResults={this.onSearchResults}
          onQuery={this.onQuery}
          copyInline={!!query}
          copy={copy}
        />
        <Results
          items={query ? search : active}
          onLoadMore={this.onLoadMore}
          animate={!!query}
          done={!!query || done}
          placeholder={placeholder}
        />
      </>
    )
  }
}

export default Engine
