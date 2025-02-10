import { expect } from 'chai';
import sinon from 'sinon';
import { main, setQueue, getQueue} from '../src';
import { ErrorLoggingCommand } from '../src/classes/commands/error-logging-command';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerDefaultConfig } from '../src/classes/exception-handler-default-config';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { BASE_COMMAND_TYPE } from '../src/classes/commands/command-helper';

const ERROR_MESSAGE = 'test error';

const getHandlers = () => {
  const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
  const errorHandler = new Map<string, ExceptionHandlerFunction>();
  errorHandler.set(Error.name, (command, e) => {
    console.log(`Handling error of type ${Error.name} error: ${e.message}`);
  });
  handlers.set(BASE_COMMAND_TYPE, errorHandler); 
  return handlers;
};

describe('Тестирование очереди команд', function() {
  describe('тест на п.4', function() {
    let spy;
    let errorLoggingCommandSpy;
    this.beforeAll(function() {
      const exceptionHandlerStub = sinon.stub(ExceptionHandler, 'getHandlers');
      exceptionHandlerStub.returns(getHandlers());

      spy = sinon.spy(console, 'log');
      errorLoggingCommandSpy = sinon.spy(ErrorLoggingCommand.prototype, 'execute');
      setQueue([
        new ErrorLoggingCommand(new Error(ERROR_MESSAGE)),
      ]);
    });
    this.afterAll(function() {
      spy.restore();
      errorLoggingCommandSpy.restore();
      setQueue([]);
      sinon.restore();
    });

    // eslint-disable-next-line max-len
    it('тест на п.4 Реализовать Команду, которая записывает информацию о выброшенном исключении в лог.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(errorLoggingCommandSpy.callCount).to.equal(1);
      expect(spy.callCount).to.equal(1);
      const args = spy.getCalls()[0].args;
      const message = args[0];
      expect(message.startsWith(ERROR_MESSAGE)).to.equal(true);
      
    });
  });
});
