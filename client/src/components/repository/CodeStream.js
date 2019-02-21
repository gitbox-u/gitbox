import React, {Component} from 'react';
import {ResponsiveStream} from '@nivo/stream'

class CodeStream extends Component {


  render() {
    const data = this.props.stats;

    return (
      <ResponsiveStream
        data={data}
        keys={this.props.contributors}
        margin={{
          "top": 50,
          "right": 110,
          "bottom": 50,
          "left": 60
        }}

        axisBottom={{
          "orient": "bottom",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": "",
          "legendOffset": 36
        }}
        axisLeft={{
          "orient": "left",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": "",
          "legendOffset": -40
        }}
        offsetType="none"
        fillOpacity={0.85}
        borderColor="#000"
        defs={[
          {
            "id": "dots",
            "type": "patternDots",
            "background": "inherit",
            "color": "#2c998f",
            "size": 4,
            "padding": 2,
            "stagger": true
          },
          {
            "id": "squares",
            "type": "patternSquares",
            "background": "inherit",
            "color": "#e4c912",
            "size": 6,
            "padding": 2,
            "stagger": true
          }
        ]}
        fill={[
          {
            "match": {
              "id": "Paul"
            },
            "id": "dots"
          },
          {
            "match": {
              "id": "Marcel"
            },
            "id": "squares"
          }
        ]}
        dotSize={8}
        dotBorderWidth={2}
        dotBorderColor="inherit:brighter(0.7)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            "anchor": "bottom-right",
            "direction": "column",
            "translateX": 100,
            "itemWidth": 80,
            "itemHeight": 20,
            "itemTextColor": "#999",
            "symbolSize": 12,
            "symbolShape": "circle",
            "effects": [
              {
                "on": "hover",
                "style": {
                  "itemTextColor": "#000"
                }
              }
            ]
          }
        ]}
      />
    );
  }
}

CodeStream.propTypes = {};

export default CodeStream;
