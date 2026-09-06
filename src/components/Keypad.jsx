import React from 'react';
import Key from './Key';
import { ACTIONS } from '../lib/calculator';

export default function Keypad({ dispatch }) {
  const keys = [
    // Row 1
    { label: '7', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '7' }) },
    { label: '8', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '8' }) },
    { label: '9', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '9' }) },
    { label: 'DEL', variant: 'secondary', ariaLabel: 'Delete', action: () => dispatch({ type: ACTIONS.DELETE }) },

    // Row 2
    { label: '4', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '4' }) },
    { label: '5', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '5' }) },
    { label: '6', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '6' }) },
    { label: '+', variant: 'digit', ariaLabel: 'Add', action: () => dispatch({ type: ACTIONS.CHOOSE_OP, operation: '+' }) },

    // Row 3
    { label: '1', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '1' }) },
    { label: '2', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '2' }) },
    { label: '3', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '3' }) },
    { label: '-', variant: 'digit', ariaLabel: 'Subtract', action: () => dispatch({ type: ACTIONS.CHOOSE_OP, operation: '-' }) },

    // Row 4
    { label: '.', variant: 'digit', ariaLabel: 'Decimal point', action: () => dispatch({ type: ACTIONS.ADD_DECIMAL }) },
    { label: '0', variant: 'digit', action: () => dispatch({ type: ACTIONS.ADD_DIGIT, digit: '0' }) },
    { label: '/', variant: 'digit', ariaLabel: 'Divide', action: () => dispatch({ type: ACTIONS.CHOOSE_OP, operation: '/' }) },
    { label: 'x', variant: 'digit', ariaLabel: 'Multiply', action: () => dispatch({ type: ACTIONS.CHOOSE_OP, operation: '*' }) },

    // Row 5
    { label: 'RESET', variant: 'secondary', span: 2, ariaLabel: 'Reset calculator', action: () => dispatch({ type: ACTIONS.RESET }) },
    { label: '=', variant: 'accent', span: 2, ariaLabel: 'Equals', action: () => dispatch({ type: ACTIONS.EQUALS }) },
  ];

  return (
    <div
      role="group"
      aria-label="Keypad"
      className="w-full bg-keypad rounded-[10px] p-4 md:p-8 grid grid-cols-4 gap-4 md:gap-6 select-none"
    >
      {keys.map((key) => (
        <Key
          key={key.label}
          label={key.label}
          variant={key.variant}
          span={key.span}
          ariaLabel={key.ariaLabel}
          onClick={key.action}
        />
      ))}
    </div>
  );
}
