import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue, getQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ErrorGenerationTestCommand } from './error-generation-test-command';
import { ErrorLoggingCommand } from '../src/classes/commands/error-logging-command';
import { ExceptionHandlerDefaultConfig } from '../src/classes/exception-handler-default-config';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { BASE_COMMAND_TYPE } from '../src/classes/commands/command-helper';

const getHandlers = () => {
  const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
  const errorHandler = new Map<string, ExceptionHandlerFunction>();
  errorHandler.set(Error.name, (command, e) => {
    console.log(`Handling error of type ${Error.name} error: ${e.message}`);
    getQueue().push(new ErrorLoggingCommand(e));
  });
  handlers.set(BASE_COMMAND_TYPE, errorHandler); 
  return handlers;
};

describe('Тестирование очереди команд', function() {
  describe('тест на п.5', function() {
   
    let errorLoggingCommandSpy;
    this.beforeAll(function() {
      const exceptionHandlerStub = sinon.stub(ExceptionHandler, 'getHandlers');
      exceptionHandlerStub.returns(getHandlers());

      errorLoggingCommandSpy = sinon.spy(ErrorLoggingCommand.prototype, 'execute');
      setQueue([
        new ErrorGenerationTestCommand(),
      ]);
    });
    this.afterAll(function() {
      errorLoggingCommandSpy.restore();
      setQueue([]);
      sinon.restore();
    });


    // eslint-disable-next-line max-len
    it('тест на п.5 Реализовать обработчик исключения, который ставит Команду, пишущую в лог в очередь Команд.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(errorLoggingCommandSpy.callCount).to.equal(1);
    });
  });
});
