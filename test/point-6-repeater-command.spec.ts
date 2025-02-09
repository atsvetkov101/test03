import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { ErrorGenerationTestCommand } from './error-generation-test-command';
import { RepeaterCommand } from '../src/classes/commands/repeater-command';
import { TestCommand } from './test-command';

describe('Тестирование команды, которая повторяет Команду', function() {
  describe('тест на п.6', function() {
   
    let testCommandSpy: sinon.SinonSpy;
    this.beforeAll(function() {
      testCommandSpy = sinon.spy(TestCommand.prototype, 'execute');

      setQueue([
        new RepeaterCommand(new TestCommand()),
      ]);
    });
    this.afterAll(function() {
      testCommandSpy.restore();
      setQueue([]);
    });


    // eslint-disable-next-line max-len
    it('тест на п.6  Реализовать Команду, которая повторяет Команду, выбросившую исключение.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(testCommandSpy.callCount).to.equal(1);
    });
  });
});
