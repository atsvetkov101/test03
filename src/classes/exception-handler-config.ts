
import { ExceptionHandlerFunction } from './exception-handler-function';
import { getQueue } from '../index';
import { ErrorLoggingCommand } from './commands/error-logging-command';
import { BASE_COMMAND_TYPE } from './commands/command-helper';
import { RepeaterCommand } from './commands/repeater-command';

const errorHandlerPoint4 = (command, e) => {
  console.log(`Handling error of type ${e.name} error: ${e.message}`);
};

const errorHandlerPoint5 = (command, e) => {
  console.log(`Handling error of type ${e.name} error: ${e.message}`);
  getQueue().push(new ErrorLoggingCommand(e));
};

const errorHandlerPoint6 = (command, e) => {
  console.log(`Handling error of type ${e.name} error: ${e.message}`);
  const queue = getQueue();
  queue.push(new RepeaterCommand(command, queue));
};

const errorHandlerRepeatOnceFunction: ExceptionHandlerFunction = (command, e) => {
  console.log(`Command:'${command.getType()}'. Handling error of type '${e.name}' error: '${e.message}'`);
  const queue = getQueue();
  if (e?.errorNumber == 1) {
    queue.push(new RepeaterCommand(command, queue) );
  }
};

const errorHandlerPoint8 = (command, e) => {
  console.log(`Command:'${command.getType()}'. Handling error of type '${e.name}' error: '${e.message}'`);
  const queue = getQueue();
  if (e?.errorNumber == 1) {
    queue.push(new RepeaterCommand(command, queue) );
  } else if (e?.errorNumber == 2) {
    queue.push(new ErrorLoggingCommand(e) );
  } else {
    // ничего не делать 
  }
};

const errorHandlerPoint9 = (command, e) => {
  console.log(`Command:'${command.getType()}'. Handling error of type '${Error.name}' error: '${e.message}'`);
  const queue = getQueue();
  if (e?.errorNumber == 1) {
    queue.push(new RepeaterCommand(command, queue) );
  } else if (e?.errorNumber == 2) {
    queue.push(new RepeaterCommand(command, queue) );
  } else if (e?.errorNumber == 3) {
    queue.push(new ErrorLoggingCommand(e) );
  } else {
    // ничего не делать 
  }
};

export class ExceptionHandlerConfig {
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

  public static getHandlersForPoint4() {
    return ExceptionHandlerConfig.getAllHandlers(errorHandlerPoint4);
  }


  public static getHandlersForPoint5() {
    return ExceptionHandlerConfig.getAllHandlers(errorHandlerPoint5);
  }

  public static getHandlersForPoint6() {
    return ExceptionHandlerConfig.getAllHandlers(errorHandlerPoint6);
  }

  public static getHandlersForPoint7 = () => {
    const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
    const errorHandler = new Map<string, ExceptionHandlerFunction>();
    errorHandler.set(Error.name, errorHandlerRepeatOnceFunction);
    handlers.set(BASE_COMMAND_TYPE, errorHandler); 
    
    const repeaterCommandErrorHandler = new Map<string, ExceptionHandlerFunction>();
    repeaterCommandErrorHandler.set(Error.name, (command, e) => {
      console.log(`Command:'${command.getType()}'. Handling error of type '${e.name}' error: '${e.message}'`);
      console.log('Не будем пытаться повторять команду RepeaterCommand');
    });
    handlers.set('RepeaterCommand', repeaterCommandErrorHandler);
  
    return handlers;
  };

  public static getHandlersForPoint8 = () => {
    const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
    const errorHandler = new Map<string, ExceptionHandlerFunction>();
    errorHandler.set(Error.name, errorHandlerPoint8);
    handlers.set(BASE_COMMAND_TYPE, errorHandler); 
    
    const repeaterCommandErrorHandler = new Map<string, ExceptionHandlerFunction>();
    repeaterCommandErrorHandler.set(Error.name, (command, e) => {
      console.log(`Command:'${command.getType()}'. Handling error of type '${Error.name}' error: '${e.message}'`);
      console.log('Не будем пытаться повторять команду RepeaterCommand');
    });
    handlers.set('RepeaterCommand', repeaterCommandErrorHandler);
  
    return handlers;
  };

  public static getHandlersForPoint9 = () => {
    const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
    const errorHandler = new Map<string, ExceptionHandlerFunction>();
    errorHandler.set(Error.name, errorHandlerPoint9);
    handlers.set(BASE_COMMAND_TYPE, errorHandler); 
    
    const repeaterCommandErrorHandler = new Map<string, ExceptionHandlerFunction>();
    repeaterCommandErrorHandler.set(Error.name, (command, e) => {
      console.log(`Command:'${command.getType()}'. Handling error of type '${Error.name}' error: '${e.message}'`);
      console.log('Не будем пытаться повторять команду RepeaterCommand');
    });
    handlers.set('RepeaterCommand', repeaterCommandErrorHandler);
  
    return handlers;
  };

  public static getAllHandlers(defaultHandler: ExceptionHandlerFunction) {
    const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
    const errorHandler = new Map<string, ExceptionHandlerFunction>();
    errorHandler.set(Error.name, defaultHandler);
    handlers.set(BASE_COMMAND_TYPE, errorHandler); 
    return handlers;
  }
}