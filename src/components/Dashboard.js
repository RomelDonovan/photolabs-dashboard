import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";

const data = [
  {
    id: 1,
    label: "Total Photos",
    value: 10
  },
  {
    id: 2,
    label: "Total Topics",
    value: 4
  },
  {
    id: 3,
    label: "User with the most uploads",
    value: "Allison Saeng"
  },
  {
    id: 4,
    label: "User with the least uploads",
    value: "Lukas Souza"
  }
];

class Dashboard extends Component {
  /* Initial state */
  state = {
    loading: false,
    focused: null
  }

  /* Instance Method */
  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  }

  /* Class Property with Arrow Function */
  // selectPanel = id => {
  //   this.setState({
  //     focused: id
  //   });
  // };

  /*
  The following code would not work because it does not use an arrow function, so the binding of this remains dynamic.
  */
  /* Class Property with Function expression */
  //  selectPanel = function(id) {
  //   this.setState({
  //    focused: id
  //   });
  // };

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    if (this.state.loading) {
      return <Loading data={data} />;
    }

    const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data).map(panel => (
      <Panel
        key={panel.id}
        label={panel.label}
        value={panel.value}
        onSelect={event => this.selectPanel(panel.id)}
      />
    ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
