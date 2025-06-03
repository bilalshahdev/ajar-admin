import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });
  it('should handle conditional classes', () => {
    expect(cn('base', { 'conditional-true': true, 'conditional-false': false })).toBe('base conditional-true');
  });
});
