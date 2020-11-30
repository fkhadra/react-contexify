import * as React from 'react';

import { Select } from './Select';
import { DATA_TEST, MENU_ID } from '../constants';

import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
  theme as builtInTheme,
  animation as builtInAnimation,
  ItemParams,
} from '../../src';

const selector = {
  events: ['onContextMenu', 'onClick', 'onDoubleClick'],
  themes: [
    'none',
    ...Object.keys(builtInTheme).map(
      k => builtInTheme[k as keyof typeof builtInTheme]
    ),
  ],
  animations: [
    'none',
    ...Object.keys(builtInAnimation).map(
      k => builtInAnimation[k as keyof typeof builtInAnimation]
    ),
  ],
};

interface SelectorState {
  theme: string;
  animation: string | false;
  event: string;
  hideItems: boolean;
  customPosition: boolean;
  disableEnterAnimation: boolean;
  disableExitAnimation: boolean;
}

function selectorReducer(
  state: SelectorState,
  nextState: Partial<SelectorState>
) {
  return { ...state, ...nextState };
}

function singularize(s: string) {
  return s.slice(0, -1);
}

function getDataTestSelector(key: string) {
  switch (key) {
    case 'animations':
      return DATA_TEST.ANIMATION_SELECTOR;
    case 'events':
      return DATA_TEST.EVENT_SELECTOR;
    case 'themes':
      return DATA_TEST.THEME_SELECTOR;
  }
}

export function App() {
  const [state, setState] = React.useReducer(selectorReducer, {
    theme: selector.themes[0],
    animation: false,
    event: selector.events[0],
    hideItems: false,
    customPosition: false,
    disableEnterAnimation: false,
    disableExitAnimation: false,
  });
  const [payload, setPayload] = React.useState({
    x: 0,
    y: 0,
    data: null,
    props: null,
  });
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleSelector({
    target: { name, value },
  }: React.ChangeEvent<HTMLSelectElement>) {
    setState({
      [singularize(name)]: value === 'none' ? false : value,
    });
  }

  function handleCheckboxes(e: React.ChangeEvent<HTMLInputElement>) {
    setState({
      [e.target.name]: !state[e.target.name],
    });
  }

  function handleContextMenu(e: React.MouseEvent) {
    show(e, {
      props: {
        key: 'value',
      },
      position: state.customPosition
        ? {
            x: 0,
            y: 0,
          }
        : null,
    });
  }

  function handleItemClick(params: ItemParams) {
    console.log(params.triggerEvent);

    setPayload({
      x: params.triggerEvent.clientX,
      y: params.triggerEvent.clientY,
      data: params.data,
      props: params.props,
    });
  }

  function getAnimation() {
    const { disableEnterAnimation, disableExitAnimation, animation } = state;
    if (!animation) {
      return false;
    } else if (disableEnterAnimation || disableExitAnimation) {
      return {
        enter: disableEnterAnimation ? false : animation,
        exit: disableExitAnimation ? false : animation,
      };
    }

    return animation;
  }

  return (
    <main>
      <section>
        <h3>Settings</h3>
        <ul>
          {Object.keys(selector).map(key => (
            <li key={key}>
              <label htmlFor={key}>{key}</label>
              <Select
                id={key}
                name={key}
                data-test={getDataTestSelector(key)}
                value={state[singularize(key)]}
                data={selector[key]}
                onChange={handleSelector}
              />
            </li>
          ))}
          <li>
            <label htmlFor="customPosition">Use custom position</label>
            <input
              type="checkbox"
              id="customPosition"
              name="customPosition"
              checked={state.customPosition}
              onChange={handleCheckboxes}
              data-test={DATA_TEST.TOGGLE_CUSTOM_POSITION}
            />
          </li>
          <li>
            <label htmlFor="hideItems">Hide items</label>
            <input
              id="hideItems"
              type="checkbox"
              name="hideItems"
              checked={state.hideItems}
              onChange={handleCheckboxes}
              data-test={DATA_TEST.TOGGLE_HIDE_ITEMS}
            />
          </li>
          <li>
            <label htmlFor="disableEnterAnimation">
              Disable enter animation
            </label>
            <input
              id="disableEnterAnimation"
              type="checkbox"
              name="disableEnterAnimation"
              checked={state.disableEnterAnimation}
              onChange={handleCheckboxes}
              data-test={DATA_TEST.TOGGLE_DISABLE_ENTER_ANIMATION}
            />
          </li>
          <li>
            <label htmlFor="disableExitAnimation">Disable exit animation</label>
            <input
              id="disableExitAnimation"
              type="checkbox"
              name="disableExitAnimation"
              checked={state.disableExitAnimation}
              onChange={handleCheckboxes}
              data-test={DATA_TEST.TOGGLE_DISABLE_EXIT_ANIMATION}
            />
          </li>
        </ul>
      </section>
      <section>
        <h3>Item payload</h3>
        <div>
          <span>On click payload</span>
          <span data-test={DATA_TEST.ONCLICK_PAYLOAD}>
            {JSON.stringify(payload, null, 2)}
          </span>
        </div>
      </section>
      <section>
        <div
          className="box"
          {...{ [`${state.event}`]: handleContextMenu }}
          data-test={DATA_TEST.CONTEXT_MENU_TRIGGER}
        >
          event is triggered everywhere in the box
        </div>
      </section>
      <Menu
        id={MENU_ID}
        theme={state.theme}
        animation={getAnimation()}
        data-test={DATA_TEST.CONTEXT_MENU}
      >
        <Item
          onClick={handleItemClick}
          data={{ id: 1 }}
          data-test={DATA_TEST.MENU_FIRST_ITEM}
          hidden={state.hideItems}
        >
          Item 1
        </Item>
        <Item
          data-test={DATA_TEST.MENU_SECOND_ITEM}
          hidden={() => state.hideItems}
        >
          Item 2
        </Item>
        <Item>Item 3</Item>
        <Item disabled data-test={DATA_TEST.DISABLED_ITEM_VIA_BOOLEAN}>
          Disabled
        </Item>
        <Item
          disabled={() => true}
          data-test={DATA_TEST.DISABLED_ITEM_VIA_FUNCTION}
        >
          Disabled via function
        </Item>
        <Separator />
        <Item>Item 4</Item>
        <Submenu label="Submenu" data-test={DATA_TEST.SUBMENU}>
          <Item data-test={DATA_TEST.SUBMENU_FIRST_ITEM}>Submenu Item 1</Item>
          <Item>Submenu Item 2</Item>
          <Separator />
          <Item>Submenu Item 3</Item>
          <Item>Submenu Item 4</Item>
        </Submenu>
        <Separator />
        <Item data-test={DATA_TEST.MENU_LAST_ITEM}>Item 5</Item>
      </Menu>
      <div data-test={DATA_TEST.MOUNT_NODE} />
    </main>
  );
}
