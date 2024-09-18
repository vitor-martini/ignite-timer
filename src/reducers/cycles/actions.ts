import { Cycle } from '../../interfaces/cycle';

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export interface AddNewCycleAction {
  type: ActionTypes.ADD_NEW_CYCLE;
  payload: {
    newCycle: Cycle;
  };
}

export interface InterruptCurrentCycleAction {
  type: ActionTypes.INTERRUPT_CURRENT_CYCLE;
}

export interface MarkCurrentCycleAsFinishedAction {
  type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED;
}

// Union type of all possible actions
export type CycleAction =
  | AddNewCycleAction
  | InterruptCurrentCycleAction
  | MarkCurrentCycleAsFinishedAction;

export function addNewCycleAction(newCycle: Cycle): AddNewCycleAction {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function markCurrentCycleAsFinishedAction(): MarkCurrentCycleAsFinishedAction {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  };
}

export function interruptCurrentCycleAction(): InterruptCurrentCycleAction {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  };
}
