import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue, getQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { ErrorGenerationTestCommand } from './error-generation-test-command';
import { RepeaterCommand } from '../src/classes/commands/repeater-command';
import { TestCommand } from './test-command';
import { BASE_COMMAND_TYPE } from '../src/classes/commands/command-helper';
import { ErrorLoggingCommand } from '../src/classes/commands/error-logging-command';


describe('Тестирование обработки исключений п.9', function() {
  describe('тест на п.9', function() {

    const errorHandlerFunction: ExceptionHandlerFunction = (command, e) => {
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
    
    const getHandlers = () => {
      const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
      const errorHandler = new Map<string, ExceptionHandlerFunction>();
      errorHandler.set(Error.name, errorHandlerFunction);
      handlers.set(BASE_COMMAND_TYPE, errorHandler); 
      
      const repeaterCommandErrorHandler = new Map<string, ExceptionHandlerFunction>();
      repeaterCommandErrorHandler.set(Error.name, (command, e) => {
        console.log(`Command:'${command.getType()}'. Handling error of type '${Error.name}' error: '${e.message}'`);
        console.log('Не будем пытаться повторять команду RepeaterCommand');
      });
      handlers.set('RepeaterCommand', repeaterCommandErrorHandler);
    
      return handlers;
    };

    
    let errorGenerationTestCommandSpy: sinon.SinonSpy;
    let errorLoggingCommandSpy: sinon.SinonSpy;
    let repeaterCommandSpy: sinon.SinonSpy;
    this.beforeAll(function() {
      const exceptionHandlerStub = sinon.stub(ExceptionHandler, 'getHandlers');
      exceptionHandlerStub.returns(getHandlers());

      errorGenerationTestCommandSpy = sinon.spy(ErrorGenerationTestCommand.prototype, 'execute');
      errorLoggingCommandSpy = sinon.spy(ErrorLoggingCommand.prototype, 'execute');
      repeaterCommandSpy = sinon.spy(RepeaterCommand.prototype, 'execute');
      setQueue([
        new ErrorGenerationTestCommand(),
      ]);
    });
    this.afterAll(function() {
      errorGenerationTestCommandSpy.restore();
      errorLoggingCommandSpy.restore();
      repeaterCommandSpy.restore();
      setQueue([]);
      sinon.restore();
    });

    // eslint-disable-next-line max-len
    it('тест на п.9  Реализовать стратегию обработки исключения - повторить два раза, потом записать в лог.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(errorGenerationTestCommandSpy.callCount).to.equal(3);
      expect(repeaterCommandSpy.callCount).to.equal(2);
      expect(errorLoggingCommandSpy.callCount).to.equal(1);
    });
  });
});
