import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";
import {
  getTotalPhotos,
  getTotalTopics,
  getUserWithMostUploads,
  getUserWithLeastUploads
} from "helpers/selectors";

const data = [
  {
    id: 1,
    label: "Total Photos",
    getValue: getTotalPhotos
  },
  {
    id: 2,
    label: "Total Topics",
    getValue: getTotalTopics
  },
  {
    id: 3,
    label: "User with the most uploads",
    getValue: getUserWithMostUploads
  },
  {
    id: 4,
    label: "User with the least uploads",
    getValue: getUserWithLeastUploads
  }
];

class Dashboard extends Component {
  /* Initial state */
  state = {
    loading: true,
    focused: null,
    photos: [],
    topics: []
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

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));
    const urlsPromise = [
      "/api/photos",
      "/api/topics"
    ].map(url => fetch(url).then(response => response.json()));

    Promise.all(urlsPromise)
      .then(([photos, topics]) => {
        this.setState({
          loading: false,
          photos: photos,
          topics: topics
        });
      });

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }

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
        value={panel.getValue(this.state)}
        onSelect={event => this.selectPanel(panel.id)}
      />
    ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
