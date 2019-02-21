import React, {Component} from 'react';
import {ResponsiveCalendar} from '@nivo/calendar'

class Calendar extends Component {
  render() {
    return (
      <ResponsiveCalendar
        data={[
          {
            "day": "2016-05-11",
            "value": 141
          }
        ]
        }
        from="2016-01-1"
        to="2016-07-12"
        emptyColor="#eeeeee"
        colors={[
          "#0727b5",
          "#4469ca",
          "#4d96e8",
          "#87c0f4"
        ]}
        margin={{
          "top": 20,
          "right": 30,
          "bottom": 60,
          "left": 30
        }}
        monthBorderColor="#ffffff"
        monthLegendOffset={10}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    );
  }
}

export default Calendar;