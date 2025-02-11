import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue, getQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { ErrorGenerationTestCommand } from './error-generation-test-command';
import { ExceptionHandlerConfig } from '../src/classes/exception-handler-config';
import { RepeaterCommand } from '../src/classes/commands/repeater-command';
import { TestCommand } from './test-command';

describe('Тестирование команды, которая повторяет Команду', function() {
  describe('тест на п.7', function() {

    const getHandlers = () => {
      return ExceptionHandlerConfig.getHandlersForPoint7();
    };

    let errorGenerationTestCommandSpy: sinon.SinonSpy;
    this.beforeAll(function() {
      const exceptionHandlerStub = sinon.stub(ExceptionHandler, 'getHandlers');
      exceptionHandlerStub.returns(getHandlers());

      errorGenerationTestCommandSpy = sinon.spy(ErrorGenerationTestCommand.prototype, 'execute');
      setQueue([
        new ErrorGenerationTestCommand(),
      ]);
    });
    this.afterAll(function() {
      errorGenerationTestCommandSpy.restore();
      setQueue([]);
      sinon.restore();
    });


    // eslint-disable-next-line max-len
    it('тест на п.7  Реализовать обработчик исключения, который ставит в очередь Команду - повторитель команды, выбросившей исключение.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(errorGenerationTestCommandSpy.callCount).to.equal(2);
    });
  });
});
