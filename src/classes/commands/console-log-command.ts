import { ICommand } from '../../interfaces/icommand';
export class ConsoleLogCommand implements ICommand {
  execute(): void {
    console.log('Console Log Command');
  } 

  getType(): string {
    return 'ConsoleLogCommand';
  }
}