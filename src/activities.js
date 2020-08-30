import Moment from 'moment';
import React from 'react';
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';

function Activities(props) {
  if (props.dataSet == null) {
    return (<div />);
  }

  const activities = props.dataSet.results[0].vrActivityData.activities;

  var summary = {};
  for (var run of activities) {
    var date = new Moment(run.date);
    var key = date.format('MM/DD');
    var miles = run.type.toString().replace(/[^0-9.]/g, '');
    miles = parseFloat(miles);

    if (!summary.hasOwnProperty(key)) {
      summary[key] = 0;
    }
    summary[key] += miles;
  }

  const data = [];
  var total = 0;
  for (var i = 4; i >= 0; i--) {
    var now = new Moment().subtract(i, 'days');
    key = now.format('MM/DD');
    miles = 0;
    if (summary.hasOwnProperty(key)) {
      miles = summary[key];
      total += miles;
    }

    if (key === "1") {
      key = now.format('MM/DD');
    }
    data.push(
        {date : key, mileage : miles.toFixed(2), 'total' : total.toFixed(2)});
  }

  if (props.dataSet) {
    return (
      <LineChart width={400} height={400} data={data}
                 margin={{
      top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis type="number" domain={
      [0, parseInt(total + 1)]} />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="total" stroke="#387908"  />
        <Line type="monotone" dataKey="mileage" stroke="#ff7300" />
        <Tooltip />
      </LineChart>
    );
  }
}

export default Activities;
