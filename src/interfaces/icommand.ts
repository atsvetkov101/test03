export interface ICommand {
  getType(): string;
  execute(): void;
}
