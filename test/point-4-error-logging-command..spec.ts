import { expect } from 'chai';
import sinon from 'sinon';
import { main, setQueue } from '../src';
import {ErrorLoggingCommand } from '../src/classes/commands/error-logging-command';

const ERROR_MESSAGE = 'test error';

describe('Тестирование очереди команд', function() {
  describe('тест на п.4', function() {
    let spy;
    this.beforeAll(function() {
      spy = sinon.spy(console, 'log');
      setQueue([
        new ErrorLoggingCommand(new Error(ERROR_MESSAGE)),
      ]);
    });
    this.afterAll(function() {
      spy.restore();
      setQueue([]);
    });

    // eslint-disable-next-line max-len
    it('тест на п.4 Реализовать Команду, которая записывает информацию о выброшенном исключении в лог.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(spy.callCount).to.equal(1);
      const args = spy.getCalls()[0].args;
      const message = args[0];
      expect(message.startsWith(ERROR_MESSAGE)).to.equal(true);
    });
  });
});
