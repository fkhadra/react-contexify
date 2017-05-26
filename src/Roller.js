import React from 'react';

export default ({ theme, animation, event, eventList, themeList, animationList, onChange })  => (
  <div className="roller">
    <label>Theme:
    <select id="theme" value={theme} onChange={onChange}>
      {themeList.map( item => <option key={item} value={item}>{item}</option>)}
    </select>
    </label>

    <label>Animation:
    <select id="animation" value={animation} onChange={onChange}>
      {animationList.map( item => <option key={item} value={item}>{item}</option>)}
    </select>
    </label>
    <label>Event:
      <select id="event" value={event} onChange={onChange}>
        {eventList.map( item => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  </div>
)