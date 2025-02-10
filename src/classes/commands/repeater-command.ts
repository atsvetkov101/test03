import { ICommand } from '../../interfaces/icommand';

const MAX_REPETITIONS = 3;
export class RepeaterCommand implements ICommand {
  commandQueue: ICommand[];
  commandToRepeat: ICommand;
  counter = 0;

  public constructor(commandToRepeat: ICommand, commandQueue: ICommand[]) {
    if (commandToRepeat.getType() === 'RepeaterCommand') {
      throw new Error('Нельзя повторить команду RepeaterCommand');
    }
    this.commandToRepeat = commandToRepeat;
    this.commandQueue = commandQueue;
  }

  public execute(): void {
    if (this.counter < MAX_REPETITIONS) {
      this.counter++;
      this.commandQueue.push(this.commandToRepeat);
    } else {
      console.log(`Достигнуто максимальное количество повторений для команды RepeaterCommand ${MAX_REPETITIONS}`);
    }
  }

  getType(): string {
    return 'RepeaterCommand';
  }
}