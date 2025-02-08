import { ICommand } from '../../interfaces/icommand';

export class ErrorLoggingCommand implements ICommand {
  error: Error;

  public constructor(error: Error) {
    this.error = error;
  }

  public execute(): void {
    console.log(`${this.error.message} stack:${this.error?.stack}`);
  }

  getType(): string {
    return 'ErrorLoggingCommand';
  }
}