import React, { Component } from "react";
import "./story.css";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Sankey from "./sankey/sankey.jsx";
import SLFLineChart from "./slfLineChart.jsx";

/**
 * The story page, it shows an explanation and breakdown of the student life fee.
 *
 * @component
 * @example
 * return (
 *   <Story />
 * )
 */
class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // budget breakdown
      fiscal_year: 2020,
      MT_total: 273302.0,
      CB_total: 823527.27,
      Other_total: 400000.0,
      SLF: 316,
      total: 1400000,
      // SLF Trend Data
      organizations: 39,
      tuition_inc: 0.007, // %
      budget_cuts: 25, // %
      new_clubs: 80,
      // counting up values on proper position
      didViewCountUp: false,
      pHeight: 50,
      pWidth: 50,
      particle_speed: 2, // speed of sankey particles
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await fetch("/api/budget_breakdown");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({
      fiscal_year: body.budgets[0]["Fiscal Year"],
      MT_total: body.budgets[0]["Mandatory Transfers Budget"],
      CB_total: body.budgets[0]["Club Budget"],
      Other_total: body.budgets[0]["Other"],
      total: body.budgets[0]["Total"],
    });
  };

  // Used to engage number countup when the section is visible
  onVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.setState({ didViewCountUp: true });
    }
  };

  render() {
    return (
      <div>
        {/* Intro Section - Contains SLF Summary and Video */}

        <div className="story-intro">
          <div className="intro-card box border">
            <div>
              <h1 className="title">
                What is the <span className="red">Student Life Fee</span>?
              </h1>
              <p>
                Every WPI Student pays a small fee, through their tuition, so
                that the clubs on campus have funds to be run and mantained. The
                Student Goverment Association (SGA), handles these funds in
                order to give each club a budget, as well as to fulfill certain
                funding requests if they deem the club has an acceptable need.
              </p>
            </div>
          </div>
          <div className="video">
            <video width="1000" height="500" controls>
              <source src="/Videos/fivizvideo.mp4" type="video/mp4"></source>
            </video>
          </div>
        </div>

        {/* SLF Section - Header */}

        <div className="story-slf slanted light-red-bg">
          <div className="box border-black margin-slf">
            <h1 className="title">
              <span className="red">Raising</span> the Student Life Fee
            </h1>
            <p>
              The student life fee increases routinely in order to satisfy to
              the rapid expansion of WPI's underguate student body and
              proportionate increase of student clubs and expenses.
            </p>
          </div>

          {/* SLF Section - Columns */}

          <div className="slf-padding columns">
            <div className="column">
              <div className="box border-black max-height align-text">
                <p>
                  <span className="red">{this.state.organizations}</span> more
                  organizations since 2015{" "}
                </p>
              </div>
            </div>
            <div className="column">
              <div className="box border-black max-height align-text">
                <p>
                  <span className="red">{this.state.tuition_inc}%</span>{" "}
                  increase in tuition from {this.state.fiscal_year - 1}
                </p>
              </div>
            </div>
            <div className="column">
              <div className="box border-black max-height align-text">
                <p>
                  {" "}
                  <span className="red">{this.state.budget_cuts}%</span> of
                  total budgets had to be cut in {this.state.fiscal_year - 1}{" "}
                </p>
              </div>
            </div>
            <div className="column">
              <div className="box border-black max-height align-text">
                <p>
                  {" "}
                  <span className="red">{this.state.new_clubs}</span> new clubs
                  since 2010{" "}
                </p>
              </div>
            </div>
            <div className="column">
              <div className="box border-black max-height align-text">
                <p>
                  {" "}
                  SLF made <span className="red">{this.state.SLF}</span> to
                  account for inflation{" "}
                </p>
              </div>
            </div>
          </div>

          {/* SLF Section - LineChart */}

          <div className="box border-black" id="lineChartBox">
            <SLFLineChart />
          </div>
        </div>

        {/* Story Budget Breakdown Section - Header */}

        <div className="story-budget-break slanted red-bg">
          <div className="center">
            <h1 className="white title">Where Does That Money Go?</h1>
            <h1 className="white subtitle is-4">The Budget Breakdown</h1>
            <div className="box">
              <div className="columns">
                <div className="column">
                  <h1 className="subtitle is-4 align-text black bold">
                    Current SLF:{" "}
                  </h1>
                  <h1 className="title red">
                    <VisibilitySensor
                      onChange={this.onVisibilityChange}
                      offset={{
                        top: 10,
                      }}
                      delayedCall
                    >
                      <CountUp
                        end={this.state.didViewCountUp ? this.state.SLF : 0}
                        duration={1.5}
                        prefix="$"
                        decimals={2}
                        decimal="."
                        ref={(countUp) => {
                          this.myCountUp = countUp;
                        }}
                      />
                    </VisibilitySensor>
                  </h1>
                </div>
                <div className="is-divider-vertical"></div>
                <div className="column">
                  <h1 className="subtitle is-4 align-text black bold">
                    Total SGA Budget:{" "}
                  </h1>
                  <h1 className="title red">
                    <CountUp
                      end={this.state.didViewCountUp ? this.state.total : 0}
                      duration={1.5}
                      prefix="$"
                      separator=","
                      decimals={0}
                      decimal="."
                    ></CountUp>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>

          {/* Story Budget Breakdown Section - Columns */}

          <div className="columns">
            <div className="column">
              <div className="box align-text max-height">
                <h1 className="subtitle is-3 black">Mandatory Transfers</h1>
                <h1 className="subtitle is-4">
                  <CountUp
                    className="red"
                    end={this.state.didViewCountUp ? this.state.MT_total : 0}
                    duration={1.5}
                    prefix="$"
                    separator=","
                    decimals={2}
                    decimal="."
                  ></CountUp>
                </h1>
                <div>
                  <p>
                    Covers a variety of campus services such as Snap, Speakers,
                    Club Sports, Coaches, and Campus Labs. This budget also
                    allows sports to get gym credit!
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box align-text max-height">
                <h1 className="subtitle is-3 black">Organization Budgets</h1>
                <h1 className="subtitle is-4">
                  <CountUp
                    className="red"
                    end={this.state.didViewCountUp ? this.state.CB_total : 0}
                    duration={1.5}
                    prefix="$"
                    separator=","
                    decimals={2}
                    decimal="."
                  ></CountUp>
                </h1>
                <div>
                  Organizations, such as clubs, can request an annual budget.
                  SGA reviews and approves these budgets annually.
                </div>
                <br></br>
              </div>
            </div>
            <div className="column">
              <div className="box align-text max-height">
                <h1 className="subtitle is-3 black">Other</h1>
                <h1 className="subtitle is-4">
                  <CountUp
                    className="red"
                    end={this.state.didViewCountUp ? this.state.Other_total : 0}
                    duration={1.5}
                    prefix="$"
                    separator=","
                    decimals={2}
                    decimal="."
                  ></CountUp>
                </h1>
                <div>
                  This budget is used for Funding Requests (FR). FRs are meants
                  to supplement club budgets, or provide funds for organizations
                  that do not receive an annual budget.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sankey */}

        <div className="story-slf slanted light-red-bg">
          <div className="box border-black margin-slf">
            <h1 className="title">Overall Budget Breakdown</h1>
            <p>
              Using this visualization you can see where your personal $316 goes
              within the overall budget and see what the different sections of
              the budget actually are. Hover over the lines to see each amount
              and click and drag the segements for ease of viewing.
            </p>
          </div>
          <br></br>
          <div className="box border-black" id="sankeyBox">
            <Sankey particle_speed={this.state.particle_speed} />
          </div>
        </div>
      </div>
    );
  }
}

export default Story;
