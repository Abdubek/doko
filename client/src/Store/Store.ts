import {Action, AnyAction, combineReducers} from 'redux';
import {groupsReducer as groups} from './Groups';
import {Ui, uiReducer as ui} from './Ui';
import {Groups} from '@doko/common/Entities/Groups';

export interface LoguxDispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T;

  crossTab: <T extends A>(action: T, meta?: object) => Promise<void>;
  local: <T extends A>(action: T, meta?: object) => Promise<void>;
  sync: <T extends A>(action: T, meta?: object) => Promise<void>;
}

export interface State {
  groups: Groups;
  ui: Ui;
}

export const storeReducer = combineReducers<State>({
  groups,
  ui,
});
