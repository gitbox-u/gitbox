import React, {Component} from 'react';
import {ResponsivePie} from "@nivo/pie";

class LangPie extends Component {
  render() {
    return (
      <ResponsivePie
        data={[
          {
            "id": "elixir",
            "label": "elixir",
            "value": 298,
            "color": "hsl(231, 70%, 50%)"
          },
          {
            "id": "javascript",
            "label": "javascript",
            "value": 109,
            "color": "hsl(265, 70%, 50%)"
          },
          {
            "id": "erlang",
            "label": "erlang",
            "value": 460,
            "color": "hsl(92, 70%, 50%)"
          },
          {
            "id": "css",
            "label": "css",
            "value": 208,
            "color": "hsl(30, 70%, 50%)"
          },
          {
            "id": "ruby",
            "label": "ruby",
            "value": 387,
            "color": "hsl(105, 70%, 50%)"
          }
        ]
        }
        margin={{
          "top": 40,
          "right": 80,
          "bottom": 80,
          "left": 80
        }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors="nivo"
        colorBy="id"
        borderWidth={1}
        borderColor="inherit:darker(0.2)"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}

      />
    );
  }
}

export default LangPie;