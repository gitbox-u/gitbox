import React from 'react';
import {ResponsiveLine} from '@nivo/line'


function AddDelete(props) {

  const data = props.data;

  return (
    <ResponsiveLine
      data={[
        {
          "id": "additions",
          "color": "green",
          "data": [
            {
              "x": 1,
              "y": 297
            },
            {
              "x": 2,
              "y": 168
            },
            {
              "x": 3,
              "y": 57
            },
            {
              "x": 4,
              "y": 259
            },
            {
              "x": 5,
              "y": 221
            },
            {
              "x": 6,
              "y": 144
            },
            {
              "x": 7,
              "y": 149
            }
          ]
        },
        {
          "id": "deletions",
          "color": "red",
          "data": [
            {
              "x": 1,
              "y": -29
            },
            {
              "x": 2,
              "y": -20
            },
            {
              "x": 3,
              "y": -57
            },
            {
              "x": 4,
              "y": -259
            },
            {
              "x": 5,
              "y": -21
            },
            {
              "x": 6,
              "y": -244
            },
            {
              "x": 7,
              "y": -300
            }
          ]
        }
      ]}
      margin={{
        "top": 50,
        "right": 20,
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
      axisBottom={{
        "orient": "bottom",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "time",
        "legendOffset": 36,
        "legendPosition": "middle"
      }}
      dotSize={10}
      dotColor="inherit:darker(0.3)"
      dotBorderWidth={2}
      dotBorderColor="#ffffff"
      enableGridY={false}
      enableDotLabel={true}
      dotLabel="y"
      colorBy={function(e){return e.color}}
      dotLabelYOffset={-12}
      animate={true}
      motionStiffness={90}
      motionDamping={15}

    />
  );
}

export default AddDelete;