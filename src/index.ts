import { ICommand } from './interfaces/icommand';
import { ExceptionHandler } from './classes/exception-handler';

let queue: ICommand[] = [
];

export const setQueue = (commands: ICommand[]) => {
  queue = commands;
};

export const getQueue = () => {
  return queue;
};

export const main = (): string => {
  while(queue.length > 0) {
    const command: ICommand = queue.shift();
    try{
      command.execute();
    } catch(e) {
      ExceptionHandler.handle(command, e);
    }
  }
  return 'Выполнение завершено'; 
};

console.log(main());
