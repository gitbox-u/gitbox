// git log --all --date-order --pretty="%h|%p|%d|%s"
// empty, but wanted to keep this handy :)

// outputs: "hash | previous commits (parents) | (?) | message"
import React, {Component} from 'react';
import Graph from 'react-graph-vis';
import {connect} from "react-redux";

const options = {
  interaction: {
    dragNodes: false,
    hover: true,
    hoverConnectedEdges: false,
    tooltipDelay: 300,
    selectable: true,
  },
  physics: {
    enabled: false,
  },
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000",
    arrows: {
      to: {
        enabled: false,
      }
    },
    smooth: {
      enabled: true,
      type: "cubicBezier",
      forceDirection: "horizontal",
    }
  }
};


class GitGraph extends Component {




  render() {
    const {graph, commits} = this.props;
    console.log(commits);
    const events = {
      click: properties => {
        const node = properties.nodes.pop();
        if (node) {
          console.log(node);
          console.log(commits[node])
        }
      }
    };

    return (
      <Graph graph={graph} events={events} options={options}>
      </Graph>
    );
  }
}


export default (GitGraph);