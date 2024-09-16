import { HandPalm, Play } from 'phosphor-react';
import { 
  HomeContainer, 
  StartCountdownButton, 
  StopCountdownButton,
} from './styles';
import { FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Cycle } from '../../interfaces/cycle';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  const { handleSubmit, watch, reset } = newCycleForm;

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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };
 
    setCycles(state => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0 );
    reset();
  }

  function handleInterruptCycle() {
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
  const task = watch('task');
  const isSubmitDisabled = !task;

  return ( 
    <CyclesContext.Provider value={{ 
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed,
        setSecondsPassed 
      }}>
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm/>
          </FormProvider>
          <Countdown/>
          {
            activeCycle ? ( 
              <StopCountdownButton 
                type="button"
                onClick={handleInterruptCycle}
              >
                <HandPalm size={24}/>
                Interromper
              </StopCountdownButton>
            ) : (
              <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                <Play size={24}/>
                Começar
              </StartCountdownButton>
            )
          }
        </form>
      </HomeContainer>
    </CyclesContext.Provider>
  );
}