import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue, getQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { ExceptionHandlerConfig } from '../src/classes/exception-handler-config';
import { RepeaterCommand } from '../src/classes/commands/repeater-command';
import { TestCommand } from './test-command';

const getHandlers = () => {
  return ExceptionHandlerConfig.getHandlersForPoint6();
};

describe('Тестирование команды, которая повторяет Команду', function() {
  describe('тест на п.6', function() {
    let testCommandSpy: sinon.SinonSpy;
    let repeaterCommandSpy: sinon.SinonSpy;
    this.beforeAll(function() {
      const exceptionHandlerStub = sinon.stub(ExceptionHandler, 'getHandlers');
      exceptionHandlerStub.returns(getHandlers());
      testCommandSpy = sinon.spy(TestCommand.prototype, 'execute');
      repeaterCommandSpy = sinon.spy(RepeaterCommand.prototype, 'execute');
      const queue = getQueue();
      queue.push(new RepeaterCommand(new TestCommand(), queue));
    });
    this.afterAll(function() {
      testCommandSpy.restore();
      repeaterCommandSpy.restore();
      setQueue([]);
      sinon.restore();
    });


    // eslint-disable-next-line max-len
    it('тест на п.6  Реализовать Команду, которая повторяет Команду, выбросившую исключение.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(testCommandSpy.callCount).to.equal(1);
      expect(repeaterCommandSpy.callCount).to.equal(1);
    });
  });
});
