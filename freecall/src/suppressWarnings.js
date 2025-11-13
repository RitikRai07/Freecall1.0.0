// Suppress CSS parsing warnings from third-party libraries
const originalError = console.error;
console.error = function (...args) {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Error in parsing value') ||
      args[0].includes('Unexpected token') ||
      args[0].includes('Declaration dropped') ||
      args[0].includes('media list'))
  ) {
    return; // Suppress Zego CSS warnings
  }
  originalError.apply(console, args);
};
