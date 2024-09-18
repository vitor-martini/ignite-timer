import { createContext, ReactNode, useReducer, useState } from 'react';
import { CreateCycleData, Cycle } from '../interfaces/cycle';
import { cyclesReducer } from '../reducers/cycles/reducer';
import { 
  addNewCycleAction, 
  interruptCurrentCycleAction, 
  markCurrentCycleAsFinishedAction 
} from '../reducers/cycles/actions';

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const { cycles, activeCycleId } = cyclesState;
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };
 
    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0 );
  }

  function interruptCurrentCycle() {
   dispatch(interruptCurrentCycleAction());
  }

  const activeCycle = cycles.find(c => c.id === activeCycleId);
  
  return (
    <CyclesContext.Provider 
      value={{  
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      { children }
    </CyclesContext.Provider>
  );
}