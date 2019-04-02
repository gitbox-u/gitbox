import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap'

function MiniCalendar(props) {

  const data = props.data;

  return (
    <ResponsiveHeatMap
      data={data}
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
        "left": 90
      }}
      colors="GnBu"
      forceSquare={true}
      axisLeft={{
        "orient": "left",
        "tickSize": 1,
        "tickPadding": 3,
        "tickRotation": -10,
        "legend": "",
        "legendOffset": 60
      }}
      axisTop={{
        "orient": "top",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
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