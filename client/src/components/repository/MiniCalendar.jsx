import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap'

function MiniCalendar() {
  return (
    <ResponsiveHeatMap
      data={[
        {
          "name": "Murad",
          "1": 20,
          "2": 20,
          "3": 20,
          "4": 20,
          "5": 20,
        },{
          name: "Linwen",
          "1": 20,
          "2": 20,
          "3": 20,
          "4": 20,
          "5": 20,
        },{
          name: "Eric",
          "1": 20,
          "2": 20,
          "3": 20,
          "4": 20,
          "5": 20,
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
        "top": 100,
        "right": 60,
        "bottom": 60,
        "left": 60
      }}
      forceSquare={true}
      axisTop={{
        "orient": "top",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": -90,
        "legend": "",
        "legendOffset": 36
      }}
      axisRight
      axisBottom
      axisLeft={{
        "orient": "left",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "contributor",
        "legendPosition": "middle",
        "legendOffset": -40
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