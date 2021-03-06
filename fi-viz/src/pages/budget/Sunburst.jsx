import React, { Component } from "react";
import Plot from "react-plotly.js";

/**
 * Component for a plotly sunburst chart that displays where the budget goes.
 *
 * @component
 * @example
 * return (
 *   <SunburstChart />
 * )
 */
class SunburstChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {},
      clubBudgets: [],
      categories: [],
      mandatory_transfers: [],
    };
  }

  componentDidMount() {
    fetch("/api/sunburst")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    fetch("/api/categories_budgets")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result.budgets,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <Plot
        className="fill-space"
        data={[
          {
            type: "sunburst",
            labels: ["FY 20", "Mandatory Transfers", "Clubs", "Other"].concat(
              this.state.categories.map((a) => a.Category)
            ),
            parents: ["", "FY 20", "FY 20", "FY 20"].concat(
              this.state.categories.map((a) => "Clubs")
            ),
            values: [
              this.state.data.Total,
              this.state.data["Mandatory Transfers Budget"],
              this.state.data["Club Budget"],
              this.state.data.Other,
            ].concat(this.state.categories.map((a) => a.Total)),
            outsidetextfont: { size: 20, color: "black" },
            hovertemplate: `Budget: %{value:$,.0f}<extra></extra>`,
            marker: { line: { width: 2 } },
            branchvalues: "total",
          },
        ]}
        layout={{
          margin: { l: 0, r: 0, b: 0, t: 0 },
          title: "Sunburst Chart",
          plot_bgcolor: "rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)",
          colorway: ["#ac2b37", "#9d1212", "#d3d3d3"],
        }}
        useResizeHandler={true}
        onClick={this.plotlyClickHandler}
      />
    );
  }
}

export default SunburstChart;
