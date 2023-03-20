class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message ?? 'unauthorized');
  }
}

export default UnauthorizedError;
