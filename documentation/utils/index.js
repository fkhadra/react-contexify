import { theme, animation } from '../../src';

export const selector = {
  events: ['onContextMenu', 'onClick', 'onDoubleClick'],
  themes: ['none', ...Object.values(theme)],
  animations: ['none', ...Object.values(animation)]
};

export const square = {
  x: 50,
  y: 50,
  width: 100,
  height: 100
};

export const menuIds = {
  table: 'tableMenu',
  canvas: 'canvasMenu',

};

export const demoData = [{
  "id": 1,
  "avatar": "https://robohash.org/quisquoodit.jpg?size=50x50&set=set1",
  "firstName": "Roseanna",
  "lastName": "Savil",
  "email": "rsavil0@state.gov",
  "company": "Hoppe, Schoen and Boyle"
}, {
  "id": 2,
  "avatar": "https://robohash.org/blanditiisetquisquam.jpg?size=50x50&set=set1",
  "firstName": "Cara",
  "lastName": "Duddan",
  "email": "cduddan1@merriam-webster.com",
  "company": "Kunze-Monahan"
}, {
  "id": 3,
  "avatar": "https://robohash.org/quiautet.bmp?size=50x50&set=set1",
  "firstName": "Tobias",
  "lastName": "Maughan",
  "email": "tmaughan2@prnewswire.com",
  "company": "Casper, Schulist and Ryan"
}, {
  "id": 4,
  "avatar": "https://robohash.org/assumendaharumpossimus.bmp?size=50x50&set=set1",
  "firstName": "Sammie",
  "lastName": "Mackness",
  "email": "smackness3@discuz.net",
  "company": "Hirthe Group"
}]
