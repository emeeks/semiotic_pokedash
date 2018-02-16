import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import "./flexboxgrid.min.css"
import pokedata from "./data/pokemon.json"
import { typeColors } from "./settings/color"
console.log("pokedata", pokedata)

const pokeGenerations = []
const pokeGenerationHash = {}
pokedata.filter(d => d.family).forEach(pokemon => {
  if (!pokeGenerationHash[pokemon.family]) {
    pokeGenerationHash[pokemon.family] = {
      label: pokemon.family,
      color: typeColors[pokemon.type1],
      coordinates: []
    }
  }
  pokeGenerationHash[pokemon.family].coordinates.push(pokemon)
})

console.log("pokeGenerations", pokeGenerations)

class App extends Component {
  constructor(props) {
    super(props)

    this.changeFilters = this.changeFilters.bind(this)

    this.state = {
      filteredData: [],
      filters: {}
    }
  }

  changeFilters(newFilter) {
    this.setState({ filters: { ...this.state.filters, ...newFilter } })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pokemon Dashboard</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="row">
          <div className="col-xs-6">
            <div className="box">Some viz</div>
          </div>
          <div className="col-xs-6">
            <div className="row">
              <div className="box">Some other viz</div>
            </div>
            <div className="row">
              <div className="box">Some other other viz</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
