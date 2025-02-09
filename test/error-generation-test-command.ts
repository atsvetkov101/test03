import { ICommand } from '../src/interfaces/icommand';
export class ErrorGenerationTestCommand implements ICommand {
  execute(): void {
    throw new Error('This is a generated error');
  } 

  getType(): string {
    return 'ErrorGenerationTestCommand';
  }
}