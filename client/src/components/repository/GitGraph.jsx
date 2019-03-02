// git log --all --date-order --pretty="%h|%p|%d|%s"
// empty, but wanted to keep this handy :)

// outputs: "hash | previous commits (parents) | (?) | message"
import React, { Component } from 'react';
import Graph from 'react-graph-vis';
import { gitNodes } from '../../reducers/sampleData'

const options = {
  interaction: {
    dragNodes: false,
    hover: true,
    hoverConnectedEdges: false,
    tooltipDelay: 300,
    selectable: false,
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

const eventListeners = {
  zoom: (node) => {
    console.log(node);
  }
}


class GitGraph extends Component {

  select = (node) => {
    console.log(node);
  }

  render() {
    return (
      <Graph graph={gitNodes} options={options}
      eventListeners={eventListeners}
        >
  
      </Graph>
    );
  }
}

export default GitGraph;