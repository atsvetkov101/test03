import { expect } from 'chai';
import sinon from 'sinon';

import { main, setQueue, getQueue } from '../src';
import { ExceptionHandler } from '../src/classes/exception-handler';
import { ExceptionHandlerFunction } from '../src/classes/exception-handler-function';
import { ErrorGenerationTestCommand } from './error-generation-test-command';
import { RepeaterCommand } from '../src/classes/commands/repeater-command';
import { TestCommand } from './test-command';
import { BASE_COMMAND_TYPE } from '../src/classes/commands/command-helper';


describe('Тестирование команды, которая повторяет Команду', function() {
  describe('тест на п.7', function() {

    let callCounter = 0;
    const errorHandlerFunction: ExceptionHandlerFunction = (command, e) => {
      console.log(`Command:'${command.getType()}'. Handling error of type '${Error.name}' error: '${e.message}'`);
      const queue = getQueue();
      if (callCounter < 1) {
        queue.push(new RepeaterCommand(command, queue) );
        callCounter++;
      }
    };
    
    const getHandlers = () => {
      const handlers = new Map<string, Map<string, ExceptionHandlerFunction>>();
      const errorHandler = new Map<string, ExceptionHandlerFunction>();
      errorHandler.set(Error.name, errorHandlerFunction);
      handlers.set(BASE_COMMAND_TYPE, errorHandler); 
      
      const repeaterCommandErrorHandler = new Map<string, ExceptionHandlerFunction>();
      repeaterCommandErrorHandler.set(Error.name, (command, e) => {
        console.log(`Command:'${command.getType()}'. Handling error of type '${Error.name}' error: '${e.message}'`);
        console.log('Не будем пытаться повторять команду RepeaterCommand');
      });
      handlers.set('RepeaterCommand', repeaterCommandErrorHandler);
    
      return handlers;
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
      expect(callCounter).to.equal(1);
    });
  });
});
