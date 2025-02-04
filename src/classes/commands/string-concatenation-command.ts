import { ICommand } from '../../interfaces/icommand';
export class StringConcatenationCommand implements ICommand {

  execute(): void {
    console.log('String Concatenation Command');
  }

  getType(): string {
    return 'StringConcatenationCommand';
  }
}

