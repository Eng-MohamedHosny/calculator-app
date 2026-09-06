export const INITIAL_STATE = {
  current: '0',
  previous: null,
  operation: null,
  overwrite: false,
};

export const ACTIONS = {
  ADD_DIGIT: 'ADD_DIGIT',
  ADD_DECIMAL: 'ADD_DECIMAL',
  CHOOSE_OP: 'CHOOSE_OP',
  EQUALS: 'EQUALS',
  DELETE: 'DELETE',
  RESET: 'RESET',
};

const MAX_DIGITS = 12;

function evaluate(prevStr, op, currStr) {
  const prev = parseFloat(prevStr);
  const curr = parseFloat(currStr);
  if (isNaN(prev) || isNaN(curr)) return '';

  let result;
  switch (op) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
    case 'x':
    case 'X':
    case '×':
      result = prev * curr;
      break;
    case '/':
    case '÷':
      if (curr === 0) return 'Error';
      result = prev / curr;
      break;
    default:
      return '';
  }

  if (!isFinite(result) || isNaN(result)) {
    return 'Error';
  }

  // Magnitude gate BEFORE toFixed: toFixed throws RangeError for |result| >= 1e21
  if (Math.abs(result) >= 1e21) {
    return result.toExponential(6);
  }

  // Float-round to 10 decimal places to eliminate precision artifacts (e.g. 0.1 + 0.2)
  const rounded = parseFloat(result.toFixed(10));

  // If very large number, format cleanly
  if (Math.abs(rounded) >= 1e12) {
    return rounded.toExponential(6);
  }

  return String(rounded);
}

export function calculatorReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT: {
      const digit = action.payload?.digit ?? action.digit;
      if (digit == null) return state;

      // Recover from Error on digit press
      if (state.current === 'Error') {
        return {
          ...state,
          current: String(digit),
          previous: null,
          operation: null,
          overwrite: false,
        };
      }

      if (state.overwrite) {
        return {
          ...state,
          current: String(digit),
          overwrite: false,
        };
      }

      if (state.current == null) {
        return {
          ...state,
          current: String(digit),
        };
      }

      // Max digit guard (~12 digits)
      const digitCount = state.current.replace(/[^0-9]/g, '').length;
      if (digitCount >= MAX_DIGITS) {
        return state;
      }

      if (state.current === '0') {
        return {
          ...state,
          current: String(digit),
        };
      }

      return {
        ...state,
        current: `${state.current}${digit}`,
      };
    }

    case ACTIONS.ADD_DECIMAL: {
      if (state.current === 'Error') {
        return {
          ...state,
          current: '0.',
          previous: null,
          operation: null,
          overwrite: false,
        };
      }

      if (state.overwrite || state.current == null) {
        return {
          ...state,
          current: '0.',
          overwrite: false,
        };
      }

      if (state.current.includes('.')) {
        return state;
      }

      return {
        ...state,
        current: `${state.current}.`,
      };
    }

    case ACTIONS.CHOOSE_OP: {
      const op = action.payload?.operation ?? action.operation;
      if (!op) return state;

      if (state.current === 'Error') {
        return state;
      }

      // If operator pressed after entering no current operand but previous exists, update operator
      if (state.current == null) {
        return {
          ...state,
          operation: op,
        };
      }

      // First operator in chain
      if (state.previous == null) {
        return {
          ...state,
          operation: op,
          previous: state.current,
          current: null,
          overwrite: false,
        };
      }

      // Chained operation (+ - * /)
      const computed = evaluate(state.previous, state.operation, state.current);
      if (computed === 'Error') {
        return {
          current: 'Error',
          previous: null,
          operation: null,
          overwrite: true,
        };
      }

      return {
        ...state,
        previous: computed,
        operation: op,
        current: null,
        overwrite: false,
      };
    }

    case ACTIONS.EQUALS: {
      if (state.current === 'Error') {
        return state;
      }

      if (state.operation == null || state.previous == null) {
        return state;
      }

      // If user pressed operator then equals without second number
      const secondOperand = state.current ?? state.previous;
      const result = evaluate(state.previous, state.operation, secondOperand);

      if (result === 'Error') {
        return {
          current: 'Error',
          previous: null,
          operation: null,
          overwrite: true,
        };
      }

      return {
        ...state,
        current: result,
        previous: null,
        operation: null,
        overwrite: true,
      };
    }

    case ACTIONS.DELETE: {
      if (state.current === 'Error') {
        return INITIAL_STATE;
      }

      if (state.overwrite) {
        return {
          ...state,
          current: '0',
          overwrite: false,
        };
      }

      if (state.current == null) {
        return state;
      }

      if (
        state.current.length <= 1 ||
        (state.current.length === 2 && state.current.startsWith('-'))
      ) {
        return {
          ...state,
          current: '0',
        };
      }

      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    }

    case ACTIONS.RESET: {
      return { ...INITIAL_STATE };
    }

    default:
      return state;
  }
}

export function formatDisplayNumber(value) {
  if (value == null || value === '') return '0';
  if (value === 'Error') return 'Error';

  const str = String(value);

  // Preserve scientific notation
  if (str.includes('e') || str.includes('E')) {
    return str;
  }

  const isNegative = str.startsWith('-');
  const raw = isNegative ? str.slice(1) : str;
  const parts = raw.split('.');
  const integerPart = parts[0] || '0';
  const decimalPart = parts[1];

  const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = isNegative ? '-' : '';

  if (decimalPart !== undefined) {
    return `${sign}${formattedInt}.${decimalPart}`;
  }
  return `${sign}${formattedInt}`;
}
