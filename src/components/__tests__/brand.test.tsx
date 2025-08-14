import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Brand from '../Brand'; // Adjust path as necessary

describe('Brand component', () => {
  it('should render the brand image with correct alt text', () => {
    render(<Brand />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'logo');
    // Could also check src or other attributes if they are static
  });
});
