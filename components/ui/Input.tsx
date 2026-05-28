import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-label text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={cn(
          'h-11 px-4 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--expert)] transition-colors',
          error && 'border-[var(--danger)] focus:border-[var(--danger)]',
          className,
        )}
        {...rest}
      />
      {hint && !error && <span className="text-xs text-[var(--text-muted)]">{hint}</span>}
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  );
});

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-label text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        rows={rest.rows ?? 5}
        className={cn(
          'p-4 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--expert)] transition-colors resize-y',
          error && 'border-[var(--danger)] focus:border-[var(--danger)]',
          className,
        )}
        {...rest}
      />
      {hint && !error && <span className="text-xs text-[var(--text-muted)]">{hint}</span>}
      {error && <span className="text-xs text-[var(--danger)]">{error}</span>}
    </div>
  );
});

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: ReadonlyArray<string> | ReadonlyArray<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, className, id, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-label text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <select
        id={inputId}
        ref={ref}
        className={cn(
          'h-11 px-4 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--expert)]',
          className,
        )}
        {...rest}
      >
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ),
        )}
      </select>
    </div>
  );
});
