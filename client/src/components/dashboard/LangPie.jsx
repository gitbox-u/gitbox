import React from 'react';
import {ResponsivePie} from "@nivo/pie";
import repositories from "./RepoGrid"

function LangPie() {
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
        "top": 55,
        "right": 55,
        "bottom": 55,
        "left": 55
      }}
      innerRadius={0.7}
      padAngle={0.7}
      // cornerRadius={3}
      colors="red_yellow_blue"
      colorBy="id"
      // borderWidth={1}
      borderColor="inherit:darker(0.2)"
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={4}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={5}
      radialLabelsLinkHorizontalLength={5}
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

export default LangPie;