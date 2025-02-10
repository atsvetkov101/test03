import { ICommand } from '../src/interfaces/icommand';
import { ApplicationError } from '../src/classes/application-error';
export class ErrorGenerationTestCommand implements ICommand {
  errorNumber: number;

  constructor() {
    this.errorNumber = 0;
  }

  execute(): void {
    this.errorNumber++;
    const error = new ApplicationError('This is a generated error');
    error.errorNumber = this.errorNumber;
    throw error;
  } 

  getType(): string {
    return 'ErrorGenerationTestCommand';
  }
}