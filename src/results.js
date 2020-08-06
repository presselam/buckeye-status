import React from 'react';
import Moment from 'moment';

function EventSummary(props){
//  alert(JSON.stringify(props));

  if( props.dataSet == null ){
    return (<div/>);
  }

  return (
    <div>
      <p>Event: {props.dataSet.startDate} through {props.dataSet.endDate}</p>
      <p>Elapsed: {props.dataSet.elapsed} of {props.dataSet.duration} days ({props.dataSet.timePct}%)</p>
      <p>Distance {props.dataSet.miles} of {props.dataSet.goal} Miles ({props.dataSet.milePct}%)</p>
    </div>
  );  
}

function PositionSummary(props) {
  if( props.dataSet == null ){
    return (<div/>);
  }

  return (
    <div className={props.dataSet.clName}>
      {props.dataSet.clName}:  {props.dataSet.mileTogo} miles ({props.dataSet.delta}%)
    </div>
  );
}

function CompleteSummary(props) {
  if( props.dataSet == null ){
    return (<div/>);
  }

  return (
    <div>
      <ul>To Complete:
       <li>Days: {props.dataSet.remainingDays} Remaining</li>
       <li>Miles: {props.dataSet.remainingMiles} Remaining</li>
       <li>Rate: {props.dataSet.completeRate} miles per day</li>
     </ul>  
    </div>
  );
}

function Results(props){
  if( props.dataSet == null ){
    return (
      <div className="Results">
      <div className='tile'>
        <EventSummary dataSet={null}/>
      </div>
      <div className='tile'>
        <PositionSummary dataSet={null}/>
      </div>
      <div className='tile'>
        <CompleteSummary dataSet={null}/>
      </div>
      </div>
      );
  }    

  const now = new Moment();
  const startDate = new Moment(props.dataSet.eventStartDates["402425"]);
  const endDate = new Moment(props.dataSet.eventEndDates["402425"]);
  const duration = endDate.diff(startDate, 'days');
  const elapsed = now.diff(startDate, 'days');
  const timePct = (elapsed/duration*100).toFixed(2);

  const result = props.dataSet.results[0];
  const miles = result.result_tally_value.toString().replace(/[^0-9.]/g, '');
  const goal = result.result_tally_goal.toString().replace(/[^0-9.]/g, '');
  const milePct = (miles/goal*100).toFixed(2);

  const summary = {
     startDate: startDate.format('yyyy-MM-DD'),
     endDate: endDate.format('yyyy-MM-DD'),
     elapsed: elapsed,
     duration: duration,
     timePct: timePct,
     miles: miles,
     goal: goal,
     milePct: milePct,
  };

  var clName = 'Ahead';
  var delta = milePct - timePct;
  if( timePct > milePct ){
    clName= 'Behind';
    delta = timePct - milePct;
  }
//    my $miles = $goal * ($delta / 100);
  const position = {
    clName: clName,
    delta: (delta).toFixed(2),
    mileTogo: (goal * (delta/100)).toFixed(2),
  };

  const completion = {
    remainingDays: (duration - elapsed).toFixed(0),
    remainingMiles: (goal - miles).toFixed(2),
    completeRate:((goal-miles)/(duration-elapsed)).toFixed(2),
  };

    return (
      <div className="Results">
      <div className='tile'>
        <EventSummary dataSet={summary}/>
      </div>
      <div className='tile'>
        <PositionSummary dataSet={position}/>
      </div>
      <div className='tile'>
        <CompleteSummary dataSet={completion}/>
      </div>
      </div>
    );
  }

export default Results;
