import React, { useContext, createContext } from 'react';
import { RefTracker } from '../hooks';

const Context = createContext({} as RefTracker);

/**
 * Access parent ref tracker.
 */
export function useRefTrackerContext() {
  return useContext(Context);
}

export interface RefTrackerProviderProps {
  refTracker: RefTracker;
  children?: React.ReactNode;
}

export const RefTrackerProvider: React.FC<RefTrackerProviderProps> = props => {
  return (
    <Context.Provider value={props.refTracker}>
      {props.children}
    </Context.Provider>
  );
};
