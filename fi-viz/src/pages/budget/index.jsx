import React, { Component } from "react";
import "./budget.css";
import Plot from "react-plotly.js";
import RidgeChart from "../../components/Ridge.jsx";
import Select from "../../components/Select";
import ExampleSelectChart from "../../components/ExampleSelectChart";
import RadarChart from "./radarChart.jsx";
import * as d3 from "d3";
import ComponentSwitcher from "../../components/ComponentSwitcher";

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
          // console.log(result.data);
          this.setState({
            isLoaded: true,
            data: result.data,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    fetch("/api/club_budgets")
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result.budgets);
          this.setState({
            isLoaded: true,
            clubBudgets: result.budgets,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
          // console.log(result.budgets);
          this.setState({
            isLoaded: true,
            categories: result.budgets,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    fetch("/api/mandatory_transfers")
      .then((res) => res.json())
      .then(
        (result) => {
          // console.log(result.mandatory);
          this.setState({
            isLoaded: true,
            mandatory_transfers: result.mandatory,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  plotlyClickHandler(data) {
    console.log("plotlyClickHandler");
    console.log(data);
  }

  render() {
    console.log(this.state.mandatory_transfers);
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
            // values: [3, 1, 1 , 1],
            values: [
              this.state.data.Total,
              this.state.data["Mandatory Transfers Budget"],
              this.state.data["Club Budget"],
              this.state.data.Other,
            ].concat(this.state.categories.map((a) => a.Total)),
            outsidetextfont: { size: 20, color: "#377eb8" },
            hovertemplate: `Budget: %{value:$,.0f}<extra></extra>`,
            // leaf: { opacity: 0.4 },
            marker: { line: { width: 2 } },
            branchvalues: "total",
          },
        ]}
        layout={{
          margin: { l: 0, r: 0, b: 0, t: 0 },
          sunburstcolorway: [
            "#636efa",
            "#EF553B",
            "#00cc96",
            "#ab63fa",
            "#19d3f3",
            "#e763fa",
            "#FECB52",
            "#FFA15A",
            "#FF6692",
            "#B6E880",
          ],
          extendsunburstcolorway: true,
          title: "A Fancy Plot",
        }}
        useResizeHandler={true}
        onClick={this.plotlyClickHandler}
      />
    );
  }
}

/* We simply can use an array and loop and print each user */
class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      budgets: [],
      options: [],
    };
  }

  componentDidMount() {
    fetch("/api/budgets")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.budgets);
          this.setState({
            isLoaded: true,
            budgets: result.budgets,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    fetch("/api/selection_options")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.options);
          this.setState({
            isLoaded: true,
            options: result.options,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, budgets } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div className="budget-container center-text"></div>;
    }
  }
}

class BudgetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      options: [],
    };
  }

  componentDidMount() {
    fetch("/api/selection_options")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.options);
          var options = result.options.map(function (obj) {
            return {
              name: obj.Name,
              category: obj.Category,
              fiscal_year: obj["Fiscal Year"],
              budget: obj["Total Budget"],
              active_members: parseInt(obj["Active Members"]),
            };
          });
          this.setState({
            isLoaded: true,
            options: options,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
      <div style={{ marginLeft: "15%", marginRight: "15%" }}>
        <Select options={this.state.options}>
          <ComponentSwitcher>
            <ExampleSelectChart displayName={"Test Example Chart"} />
            <ExampleSelectChart
              displayName={"Alternate Example Chart"}
              alt={2}
            />
          </ComponentSwitcher>
        </Select>
        <RadarChart></RadarChart>
        <Budget />
        <SunburstChart />
        <RidgeChart />
        {/*<div className="flourish-embed" data-src="visualisation/1338475"/>/*}
        {/* <div style={{marginLeft: '15%', marginRight: '15%'}} className="flourish-embed" data-src="visualisation/1338248"/> */}
      </div>
    );
  }
}

export default BudgetPage;
