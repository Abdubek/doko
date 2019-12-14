import {AnyAction} from 'redux';
import {mergeStates} from 'doko-common';

export interface Ui {
  currentGroupId: string | null;
}

const syncKeys = ['currentGroupId'];

function syncToLocalStorage(oldState: Ui, newState: Ui): void {
  Object.entries(oldState).forEach(([key, oldValue]) => {
    const newValue = newState[key as keyof Ui];
    if (oldValue !== newValue && syncKeys.includes(key)) {
      localStorage.setItem(`ui.${key}`, JSON.stringify(newValue));
    }
  });
}

function syncFromLocalStorage(state: Ui): Ui {
  let newState = state;
  syncKeys.forEach((key) => {
    const storeValue = localStorage.getItem(`ui.${key}`);
    if (storeValue !== null) {
      const parsedValue = JSON.parse(storeValue);
      newState = {...newState, [key]: parsedValue};
    }
  });
  return newState;
}

const initial: Ui = {
  currentGroupId: null,
};

export function reducer(state?: Ui, action: AnyAction = {type: ''}): Ui {
  let newState = state;
  if (typeof state === 'undefined') {
    newState = syncFromLocalStorage(initial);
  } else if (action.type === 'ui/set') {
    newState = mergeStates(state, action.ui);
    syncToLocalStorage(state, newState);
  }
  return newState!;
}

