
import React from 'react';
import { Transition } from 'react-spring';
import styled from "styled-components";

import Emoji from "./Emoji";

const Ul = styled.ul`
color: white;
box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
padding: 0;
`;
const Li = styled.li`
display: flex;
background-color: space-grey;
margin: 0;
border-left: 3px solid purple;
transition: background-color 0.3s ease;
&:nth-child(odd) {
  background-color: #323232;
}
&:nth-child(even){
  background-color: #4b4b4b;
}
 & img, & article {
   padding: 10px;
 }
`;

export default ({ event, eventHandler, rows }) => (
  <Ul>
    <Transition
      keys={rows.map(row => row.id)}
      from={{ transform: 'scale(0)', height: 0 }}
      enter={{ transform: 'scale(1)', height: 100 }}
      leave={{ transform: 'scale(0)', height: 0, pointerEvents: 'none' }}
    >
      {rows.map(row => styles => (
        <Li
          id={row.id}
          style={styles}
          {...{ [`${event}`]: eventHandler }}
          data-id={row.id}
        >
          <img src={row.avatar} alt="avatar" />
          <article>
            <div><Emoji>📇</Emoji>{row.firstName} {row.lastName}</div>
            <div><Emoji>📧</Emoji>{row.email}</div>
            <div><Emoji>🏢</Emoji>{row.company}</div>
          </article>
        </Li>
      ))}
    </Transition>
  </Ul>
);
