import React, { Component } from "react";

export default class Panel extends Component {
  render() {
    const { label, value } = this.props;

    return (
      <section className="dashoard__panel">
        <h1 className="dashboard__panel-header"> {label}</h1>
        <p className="dashbord__panel-value">{value}</p>
      </section>
    )
  }
}