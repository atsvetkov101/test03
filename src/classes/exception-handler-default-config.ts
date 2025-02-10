
import { ExceptionHandlerFunction } from './exception-handler-function';
import { getQueue } from '../index';
import { ErrorLoggingCommand } from './commands/error-logging-command';
import { BASE_COMMAND_TYPE } from './commands/command-helper';
import { RepeaterCommand } from './commands/repeater-command';

export class ExceptionHandlerDefaultConfig {
  public static getHandlers() {
    const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
        
    const errorHandler = new Map<string, ExceptionHandlerFunction>();
    errorHandler.set(Error.name, (command, e) => {
      console.log(`Handling error of type ${Error.name} error: ${e.message}`);
      const queue = getQueue();
      queue.push(new RepeaterCommand(command, queue));
    });

    handlers.set('ErrorLoggingCommand', errorHandler);
    handlers.set('RepeaterCommand', errorHandler);
    handlers.set(BASE_COMMAND_TYPE, errorHandler);

    return handlers;
  }
}