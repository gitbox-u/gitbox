import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap'

function MiniCalendar() {
  return (
    <ResponsiveHeatMap
      data={[
        {
          name: "Murad",
          "1": 20,
          "2": 20,
          "3": 55,
          "4": 20,
          "5": 33,
        },{
          name: "Linwen",
          "1": 34,
          "2": 20,
          "3": 20,
          "4": 20,
          "5": 3,
        },{
          name: "Eric",
          "1": 20,
          "2": 20,
          "3": 21,
          "4": 20,
          "5": 20,
        },{
          name: "Howard",
          "1": 20,
          "2": 33,
          "3": 21,
          "4": 4,
          "5": 33,
        },{
          name: "Mark",
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 1,
        }
      ]}
      keys={[
        "1",
        "2",
        "3",
        "4",
        "5"
      ]}
      indexBy="name"
      margin={{
        "top": 20,
        "right": 10,
        "bottom": 10,
        "left": 60
      }}
      colors="GnBu"
      forceSquare={true}
      axistLeft={{
        "orient": "left",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": -90,
        "legendOffset": -40
      }}
      axisTop={{
        "orient": "top",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": -90,
        "legend": "",
        "legendOffset": 36
      }}
      cellOpacity={1}
      cellBorderColor="inherit:darker(0.4)"
      labelTextColor="inherit:darker(1.8)"
      defs={[
        {
          "id": "lines",
          "type": "patternLines",
          "background": "inherit",
          "color": "rgba(0, 0, 0, 0.1)",
          "rotation": -45,
          "lineWidth": 4,
          "spacing": 7
        }
      ]}
      fill={[
        {
          "id": "lines"
        }
      ]}
      animate={true}
      motionStiffness={80}
      motionDamping={9}
      hoverTarget="cell"
      cellHoverOthersOpacity={0.25}
    />
  );
}

export default MiniCalendar;