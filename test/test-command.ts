import { ICommand } from '../src/interfaces/icommand';
export class TestCommand implements ICommand {
  execute(): void {
    console.log('executing TestCommand');
  } 

  getType(): string {
    return 'TestCommand';
  }
}