import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import "./flexboxgrid.min.css"
import BrushableScatterplot from "./BrushableScatterplot"
import Legend from "./Legend"
import TypeBars from "./TypeBars"
import pokedata from "./data/pokemon.json"
import { typeColors } from "./settings/color"
import { XYFrame } from "semiotic"
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
    this.scatterBrush = this.scatterBrush.bind(this)

    this.state = {
      filteredData: [],
      filters: {
        heightRange: [-Infinity, Infinity],
        weightRange: [-Infinity, Infinity]
      }
    }
  }

  changeFilters(newFilter) {
    this.setState({ filters: { ...this.state.filters, ...newFilter } })
  }

  scatterBrush(e) {
    if (e === null) {
      this.changeFilters({
        heightRange: [-Infinity, Infinity],
        weightRange: [-Infinity, Infinity]
      })
      this.setState({
        filteredData: []
      })
      return
    }
    const bbox = e
    const [[x1, y1], [x2, y2]] = bbox

    if (!isNaN(x1)) {
      const xMin = Math.min(x1, x2)
      const yMin = Math.min(y1, y2)
      const xMax = Math.max(x1, x2)
      const yMax = Math.max(y1, y2)
      this.changeFilters({
        heightRange: [xMin, xMax],
        weightRange: [yMin, yMax]
      })
      this.setState({
        filteredData: pokedata.filter(p => {
          return (
            +p.height_m >= xMin &&
            +p.height_m <= xMax &&
            +p.weight_kg >= yMin &&
            +p.weight_kg <= yMax
          )
        })
      })
    }
  }

  render() {
    console.log("this.state", this.state)
    const { filteredData } = this.state
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
            <div className="box">
              <BrushableScatterplot
                brushFunction={this.scatterBrush}
                data={filteredData.length > 0 ? filteredData : pokedata}
                fullData={pokedata}
                color={typeColors}
              />
            </div>
          </div>
          <div className="col-xs-6">
            <div className="row">
              <Legend color={typeColors} />
            </div>
            <div className="row">
              <div className="box">
                <TypeBars
                  color={typeColors}
                  data={filteredData.length > 0 ? filteredData : pokedata}
                />
              </div>
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
