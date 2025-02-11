import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue, getQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { ErrorGenerationTestCommand } from './error-generation-test-command';
import { RepeaterCommand } from '../src/classes/commands/repeater-command';
import { TestCommand } from './test-command';
import { ErrorLoggingCommand } from '../src/classes/commands/error-logging-command';
import { ExceptionHandlerConfig } from '../src/classes/exception-handler-config';


describe('Тестирование обработки исключений п.8', function() {
  describe('тест на п.8', function() {

    const getHandlers = () => {
      return ExceptionHandlerConfig.getHandlersForPoint8();
    };
   
    let errorGenerationTestCommandSpy: sinon.SinonSpy;
    let errorLoggingCommandSpy: sinon.SinonSpy;
    let repeaterCommandSpy: sinon.SinonSpy;
    this.beforeAll(function() {
      const exceptionHandlerStub = sinon.stub(ExceptionHandler, 'getHandlers');
      exceptionHandlerStub.returns(getHandlers());

      errorGenerationTestCommandSpy = sinon.spy(ErrorGenerationTestCommand.prototype, 'execute');
      errorLoggingCommandSpy = sinon.spy(ErrorLoggingCommand.prototype, 'execute');
      repeaterCommandSpy = sinon.spy(RepeaterCommand.prototype, 'execute');
      setQueue([
        new ErrorGenerationTestCommand(),
      ]);
    });
    this.afterAll(function() {
      errorGenerationTestCommandSpy.restore();
      errorLoggingCommandSpy.restore();
      repeaterCommandSpy.restore();
      setQueue([]);
      sinon.restore();
    });

    // eslint-disable-next-line max-len
    it('тест на п.8  ... при первом выбросе исключения повторить команду, при повторном выбросе исключения записать информацию в лог.', function() {
      expect(main()).to.equal('Выполнение завершено');
      expect(errorGenerationTestCommandSpy.callCount).to.equal(2);
      expect(repeaterCommandSpy.callCount).to.equal(1);
      expect(errorLoggingCommandSpy.callCount).to.equal(1);
    });
  });
});
