import { ICommand } from './interfaces/icommand';
import { ConsoleLogCommand } from './classes/commands/console-log-command';
import { StringConcatenationCommand } from './classes/commands/string-concatenation-command';

const register: ICommand[] = [
  new ConsoleLogCommand(),
  new StringConcatenationCommand(),
  new StringConcatenationCommand(),
  new StringConcatenationCommand(),
];
export const main = (): string => {
  while(register.length > 0) {
    const command: ICommand = register.shift();
    command.execute();
  }
  return 'Выполнение завершено'; 
};

console.log(main());
