// git log --all --date-order --pretty="%h|%p|%d|%s"
// empty, but wanted to keep this handy :)

// outputs: "hash | previous commits (parents) | (?) | message"
import React, { Component } from 'react';
import Graph from 'react-graph-vis';
import { gitNodes } from '../../reducers/sampleData'

const options = {
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

function GitGraph() {
  return (
    <Graph graph={gitNodes} options={options}>

    </Graph>
  );
}

export default GitGraph;