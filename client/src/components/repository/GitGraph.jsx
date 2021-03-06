// git log --all --date-order --pretty="%h|%p|%d|%s"
// empty, but wanted to keep this handy :)

// outputs: "hash | previous commits (parents) | (?) | message"
import React, {Component} from 'react';
import Graph from 'react-graph-vis';

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
    const {graph, commits, classes} = this.props;
    console.log(commits);
    const events = {
      click: properties => {
        const node = properties.nodes.pop();
        if (node) {
          this.props.commitChange({sha: node, ...commits[node]});
        }
      }
    };

    return (
      <Graph graph={graph} events={events} options={options}/>
    );
  }
}


export default (GitGraph);