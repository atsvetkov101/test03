import { ICommand } from '../interfaces/icommand';
import { ErrorLoggingCommand } from './commands/error-logging-command';

type ErrorHandlerFunction = (e: Error) => void;

export class ExceptionHandler {

  static handlers: Map<string, Map<string, ErrorHandlerFunction>>;

  static init() {
    ExceptionHandler.handlers = new Map<string, Map<string, ErrorHandlerFunction>>();
    
    const errorHandler = new Map<string, ErrorHandlerFunction>();
    errorHandler.set(Error.name, (e) => {
      console.log(`Handling error of type ${Error.name} error: ${e.message}`);
    });

    ExceptionHandler.handlers.set('ErrorLoggingCommand', errorHandler);
    ExceptionHandler.handlers.set('RepeaterCommand', errorHandler);
  }

  public static handle( command: ICommand, error: Error) {
    const callback = this.handlers.get(command.getType()).get(error.name);
    if (callback) {
      callback.call(this, error);
    }
  }

  static handlingAnyError(error: Error) {
    new ErrorLoggingCommand(error).execute();
  }
}

ExceptionHandler.init();
