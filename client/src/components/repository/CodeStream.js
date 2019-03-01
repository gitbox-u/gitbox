import React from 'react';
import {ResponsiveStream} from '@nivo/stream'

function CodeStream(props) {
  const data = props.stats;

  return (
    <ResponsiveStream
      data={data}
      keys={props.contributors}
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
          "id": "dots0",
          "type": "patternDots",
          "background": "#1c897f",
          "color": "#2c998f",
          "size": 4,
          "padding": 2,
          "stagger": true
        },
        {
          "id": "squares0",
          "type": "patternSquares",
          "background": "#d4b902",
          "color": "#e4c912",
          "size": 6,
          "padding": 2,
          "stagger": true
        },
        {
          "id": "dots1",
          "type": "patternDots",
          "background": "#8c91b3",
          "color": "#9ca1c3",
          "size": 4,
          "padding": 2,
          "stagger": true
        },
        {
          "id": "squares1",
          "type": "patternSquares",
          "background": "#2b8ac9",
          "color": "#3b9ad9",
          "size": 6,
          "padding": 2,
          "stagger": true
        }
      ]}
      fill={[
        {
          "match": {
            "id": "Howard"
          },
          "id": "dots0"
        },
        {
          "match": {
            "id": "Lin"
          },
          "id": "squares0"
        },
        {
          "match": {
            "id": "Eric"
          },
          "id": "dots1"
        },
        {
          "match": {
            "id": "Murad"
          },
          "id": "squares1"
        },
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

CodeStream.propTypes = {};

export default CodeStream;
