// tslint:disable: only-arrow-functions
import { expect } from 'chai';
import { main, setQueue } from '../src';
import { ConsoleLogCommand } from '../src/classes/commands/console-log-command';
import { StringConcatenationCommand } from '../src/classes/commands/string-concatenation-command';

describe('Index module', function() {
  describe('expected behavior', function() {
    it('should return Выполнение завершено', function() {
      expect(main()).to.equal('Выполнение завершено');
    });

    it('should return Выполнение завершено', function() {
      setQueue([
        new ConsoleLogCommand(),
        new StringConcatenationCommand('1111', '22222'),
        new StringConcatenationCommand('333333', '44444'),
        new StringConcatenationCommand('555555', '6666666'),
      ]);

      expect(main()).to.equal('Выполнение завершено');
    });
  });
});
