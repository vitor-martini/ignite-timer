import { createContext } from 'react';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date; 
  finishedDate?: Date; 
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
}

export const CyclesContext = createContext({} as CyclesContextType);