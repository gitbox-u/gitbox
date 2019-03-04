import React from 'react';
import {ResponsiveLine} from '@nivo/line'


function AddDelete(props) {

  const data = props.data;

  return (
    <ResponsiveLine
      data={[]}
      margin={{
        "top": 50,
        "right": 110,
        "bottom": 50,
        "left": 60
      }}
      xScale={{
        "type": "point"
      }}
      yScale={{
        "type": "linear",
        "stacked": true,
        "min": "auto",
        "max": "auto"
      }}
      axisTop
      axisRight
      axisBottom={{
        "orient": "bottom",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "transportation",
        "legendOffset": 36,
        "legendPosition": "middle"
      }}
      axisLeft={{
        "orient": "left",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "count",
        "legendOffset": -40,
        "legendPosition": "middle"
      }}
      dotSize={10}
      dotColor="inherit:darker(0.3)"
      dotBorderWidth={2}
      dotBorderColor="#ffffff"
      enableDotLabel={true}
      dotLabel="y"
      colors="red_yellow_blue"
      colorBy="id"
      dotLabelYOffset={-12}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          "anchor": "bottom-right",
          "direction": "column",
          "justify": false,
          "translateX": 100,
          "translateY": 0,
          "itemsSpacing": 0,
          "itemDirection": "left-to-right",
          "itemWidth": 80,
          "itemHeight": 20,
          "itemOpacity": 0.75,
          "symbolSize": 12,
          "symbolShape": "circle",
          "symbolBorderColor": "rgba(0, 0, 0, .5)",
          "effects": [
            {
              "on": "hover",
              "style": {
                "itemBackground": "rgba(0, 0, 0, .03)",
                "itemOpacity": 1
              }
            }
          ]
        }
      ]}
    />
  );
}

export default AddDelete;