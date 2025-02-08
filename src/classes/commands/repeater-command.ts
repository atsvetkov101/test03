import { ICommand } from '../../interfaces/icommand';

export class RepeaterCommand implements ICommand {
  commandsQueue: ICommand[];
  commandToRepeat: ICommand;

  public constructor(commandsQueue: ICommand[], commandToRepeat: ICommand) {
    this.commandsQueue = commandsQueue;
    this.commandToRepeat = commandToRepeat;
  }

  public execute(): void {
    this.commandsQueue.push(this.commandToRepeat);
  }

  getType(): string {
    return 'RepeaterCommand';
  }
}