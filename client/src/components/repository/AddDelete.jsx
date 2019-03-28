import React from 'react';
import {ResponsiveLine} from '@nivo/line'


function AddDelete(props) {

  const data = props.data;

  return (
    <ResponsiveLine
      data={data}
      margin={{
        "top": 30,
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
        "tickPadding": 15,
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