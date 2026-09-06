import React from 'react';

export default function Key({
  label,
  variant = 'digit',
  span = 1,
  ariaLabel,
  onClick,
}) {
  let variantClasses = '';
  let textClasses = '';

  switch (variant) {
    case 'secondary':
      variantClasses =
        'bg-key-2nd text-key-2nd-text shadow-key-2nd hover:bg-key-2nd-hover active:translate-y-[2px] active:shadow-key-2nd-active';
      textClasses = 'text-[20px] tracking-[-0.3px] md:text-[28px] md:tracking-[-0.5px] uppercase';
      break;
    case 'accent':
      variantClasses =
        'bg-key-acc text-key-acc-text shadow-key-acc hover:bg-key-acc-hover active:translate-y-[2px] active:shadow-key-acc-active';
      textClasses = 'text-[20px] tracking-[-0.3px] md:text-[28px] md:tracking-[-0.5px]';
      break;
    case 'digit':
    default:
      variantClasses =
        'bg-key-digit text-key-digit-text shadow-key-digit hover:bg-key-digit-hover active:translate-y-[2px] active:shadow-key-digit-active';
      textClasses = 'text-[32px] tracking-[-0.5px] md:text-[40px] md:tracking-[-0.7px]';
      break;
  }

  const spanClasses = span === 2 ? 'col-span-2' : 'col-span-1';

  return (
    <button
      type="button"
      aria-label={ariaLabel || label}
      onClick={onClick}
      className={`h-16 w-full rounded-[5px] md:rounded-[10px] font-bold flex items-center justify-center pb-[2px] cursor-pointer transition-all duration-75 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-page-text ${spanClasses} ${variantClasses} ${textClasses}`}
    >
      {label}
    </button>
  );
}
