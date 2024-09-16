import { createContext, ReactNode, useState } from 'react';
import { CreateCycleData, Cycle } from '../interfaces/cycle';

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

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(cycle => {
      if(cycle.id === activeCycleId) {
        return { ...cycle, finishedDate: new Date() };
      } else {
        return cycle;
      }
    }));
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
 
    setCycles(state => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0 );
  }

  function interruptCurrentCycle() {
    setCycles(state => state.map(cycle => {
      if(cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() };
      } else {
        return cycle;
      }
    }));
    setActiveCycleId(null);
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