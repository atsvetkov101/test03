import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue, getQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { RepeaterCommand } from '../src/classes/commands/repeater-command';
import { TestCommand } from './test-command';
import { BASE_COMMAND_TYPE } from '../src/classes/commands/command-helper';

const errorHandlerFunction: ExceptionHandlerFunction = (command, e) => {
  console.log(`Handling error of type ${Error.name} error: ${e.message}`);
  const queue = getQueue();
  queue.push(new RepeaterCommand(command, queue));
};

const getHandlers = () => {
  const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
  const errorHandler = new Map<string, ExceptionHandlerFunction>();
  errorHandler.set(Error.name, errorHandlerFunction);
  handlers.set(BASE_COMMAND_TYPE, errorHandler); 
  return handlers;
};

describe('Тестирование команды, которая повторяет Команду', function() {
  describe('тест на п.6', function() {
    let errorHandlerFunctionSpy: sinon.SinonSpy;
    let testCommandSpy: sinon.SinonSpy;
    this.beforeAll(function() {
      const exceptionHandlerStub = sinon.stub(ExceptionHandler, 'getHandlers');
      exceptionHandlerStub.returns(getHandlers());

      errorHandlerFunctionSpy = sinon.spy(errorHandlerFunction);

      testCommandSpy = sinon.spy(TestCommand.prototype, 'execute');
      const queue = getQueue();
      queue.push(new RepeaterCommand(new TestCommand(), queue));
    });
    this.afterAll(function() {
      testCommandSpy.restore();
      setQueue([]);
      sinon.restore();
    });


    // eslint-disable-next-line max-len
    it('тест на п.6  Реализовать Команду, которая повторяет Команду, выбросившую исключение.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(testCommandSpy.callCount).to.equal(1);
      expect(errorHandlerFunctionSpy.callCount).to.equal(0);
    });
  });
});
