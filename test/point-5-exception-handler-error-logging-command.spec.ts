import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { ErrorGenerationTestCommand } from './error-generation-test-command';
import { ErrorLoggingCommand } from '../src/classes/commands/error-logging-command';

describe('Тестирование очереди команд', function() {
  describe('тест на п.5', function() {
   
    let errorLoggingCommandSpy;
    this.beforeAll(function() {
      errorLoggingCommandSpy = sinon.spy(ErrorLoggingCommand.prototype, 'execute');
      setQueue([
        new ErrorGenerationTestCommand(),
      ]);
    });
    this.afterAll(function() {
      errorLoggingCommandSpy.restore();
      setQueue([]);
    });


    // eslint-disable-next-line max-len
    it('тест на п.5 Реализовать обработчик исключения, который ставит Команду, пишущую в лог в очередь Команд.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(errorLoggingCommandSpy.callCount).to.equal(1);
    });
  });
});
