export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date; 
  finishedDate?: Date; 
}

export interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}