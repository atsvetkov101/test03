class FirstCustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FirstCustomError';
  }
}