import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShapeNoteInput } from './shape-note-input';

describe('ShapeNoteInput', () => {
  it('renders all four shape note buttons', () => {
    const mockHandler = jest.fn();
    render(<ShapeNoteInput handleShapeNote={mockHandler} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });

  it('calls handleShapeNote with "f" when Fa button is clicked', async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    render(<ShapeNoteInput handleShapeNote={mockHandler} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(mockHandler).toHaveBeenCalledWith('f');
  });

  it('calls handleShapeNote with "s" when So button is clicked', async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    render(<ShapeNoteInput handleShapeNote={mockHandler} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    expect(mockHandler).toHaveBeenCalledWith('s');
  });

  it('calls handleShapeNote with "l" when La button is clicked', async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    render(<ShapeNoteInput handleShapeNote={mockHandler} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]);
    expect(mockHandler).toHaveBeenCalledWith('l');
  });

  it('calls handleShapeNote with "m" when Mi button is clicked', async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    render(<ShapeNoteInput handleShapeNote={mockHandler} />);

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[3]);
    expect(mockHandler).toHaveBeenCalledWith('m');
  });

  it('accepts and applies className prop', () => {
    const mockHandler = jest.fn();
    const { container } = render(
      <ShapeNoteInput handleShapeNote={mockHandler} className="custom-class" />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('accepts and applies additional props', () => {
    const mockHandler = jest.fn();
    render(
      <ShapeNoteInput handleShapeNote={mockHandler} data-testid="shape-input" />
    );

    expect(screen.getByTestId('shape-input')).toBeInTheDocument();
  });

  it('can be clicked multiple times', async () => {
    const mockHandler = jest.fn();
    const user = userEvent.setup();

    render(<ShapeNoteInput handleShapeNote={mockHandler} />);

    const buttons = screen.getAllByRole('button');

    await user.click(buttons[0]); // f
    await user.click(buttons[0]); // f
    await user.click(buttons[1]); // s

    expect(mockHandler).toHaveBeenCalledTimes(3);
    expect(mockHandler).toHaveBeenNthCalledWith(1, 'f');
    expect(mockHandler).toHaveBeenNthCalledWith(2, 'f');
    expect(mockHandler).toHaveBeenNthCalledWith(3, 's');
  });
});
