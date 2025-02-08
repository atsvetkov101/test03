import { ICommand } from './interfaces/icommand';
import { ConsoleLogCommand } from './classes/commands/console-log-command';
import { StringConcatenationCommand } from './classes/commands/string-concatenation-command';
import { ExceptionHandler } from './classes/exception-handler';

let queue: ICommand[] = [
];

export const setQueue = (commands: ICommand[]) => {
  queue = commands;
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
