import { ICommand } from '../../interfaces/icommand';

export class RepeaterCommand implements ICommand {
  commandToRepeat: ICommand;

  public constructor(commandToRepeat: ICommand) {
    this.commandToRepeat = commandToRepeat;
  }

  public execute(): void {
    this.commandToRepeat.execute();
  }

  getType(): string {
    return 'RepeaterCommand';
  }
}