// tslint:disable: only-arrow-functions
import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue } from '../src';
import { ICommand } from '../src/interfaces/icommand';
import { TestCommand } from './test-command';
import { StringConcatenationCommand } from './string-concatenation-command'; 

describe('Тестирование index', function() {
  describe('Пустой список команд', function() {
    let spy;
    this.beforeAll(function() {
      spy = sinon.spy(console, 'log');
      setQueue([]);
    });
    this.afterAll(function() {
      spy.restore();
    });
    it('Проверяем, если список команд пустой, то console.log не будет вызван ни разу', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(spy.callCount).to.equal(0);
    });
  });
  describe('Заполненный список команд', function() {  
    let spy;
    this.beforeAll(function() {
      spy = sinon.spy(console, 'log');
      setQueue([
        new TestCommand(),
        new StringConcatenationCommand('1111', '22222'),
        new StringConcatenationCommand('333333', '44444'),
        new StringConcatenationCommand('555555', '6666666'),
      ]);
    });
    this.afterAll(function() {
      setQueue([]);
      spy.restore();
    });
    it('Проверяем список команд. 4 команды: console.log был вызван для каждой команды, т.е. 4 раза', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(spy.callCount).to.equal(4);
    });
  });
});
