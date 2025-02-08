class SecondCustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SecondCustomError';
  }
}