import { ICommand } from '../../interfaces/icommand';
export class StringConcatenationCommand implements ICommand {
  string1: string;
  string2: string;

  constructor(string1: string, string2: string) {
    this.string1 = string1;
    this.string2 = string2;
  }
  execute(): void {
    console.log(`String Concatenation Command result:'${this.string1 + this.string2}'`);
  }

  getType(): string {
    return 'StringConcatenationCommand';
  }
}

