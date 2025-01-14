import { render, fireEvent, screen } from '@testing-library/react';
import RichTextEditor from '@/components/RichTextEditor';

describe('RichTextEditor', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with initial value', () => {
    const initialValue = '<p>Test content</p>';
    render(<RichTextEditor value={initialValue} onChange={mockOnChange} />);
    
    const editor = screen.getByTestId('rich-text-editor');
    expect(editor.innerHTML).toBe(initialValue);
  });

  it('calls onChange when content is edited', () => {
    render(<RichTextEditor value="" onChange={mockOnChange} />);
    
    const editor = screen.getByTestId('rich-text-editor');
    fireEvent.input(editor, { target: { innerHTML: '<p>New content</p>' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('<p>New content</p>');
  });

  it('executes formatting commands', () => {
    const execCommandSpy = jest.spyOn(document, 'execCommand');
    render(<RichTextEditor value="" onChange={mockOnChange} />);
    
    // Test bold command
    fireEvent.click(screen.getByTitle('Bold'));
    expect(execCommandSpy).toHaveBeenCalledWith('bold', false);
    
    // Test italic command
    fireEvent.click(screen.getByTitle('Italic'));
    expect(execCommandSpy).toHaveBeenCalledWith('italic', false);
    
    execCommandSpy.mockRestore();
  });
});