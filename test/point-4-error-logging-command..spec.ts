import { expect } from 'chai';
import sinon from 'sinon';
import { main, setQueue, getQueue} from '../src';
import { ErrorLoggingCommand } from '../src/classes/commands/error-logging-command';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerConfig } from '../src/classes/exception-handler-config';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';

const ERROR_MESSAGE = 'test error';

const getHandlers = () => {
  return ExceptionHandlerConfig.getHandlersForPoint4();
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
