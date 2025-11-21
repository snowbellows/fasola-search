import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShapeNoteDisplay } from './shape-note-display';

describe('ShapeNoteDisplay', () => {
  const defaultNotes = {
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
    seventh: '',
    eighth: '',
  };

  it('displays position numbers when notes are empty', () => {
    render(<ShapeNoteDisplay notes={defaultNotes} highlightIndex={0} />);

    for (let i = 1; i <= 8; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  it('displays Fa icon when note is "f"', () => {
    const notesWithFa = { ...defaultNotes, first: 'f' };
    render(<ShapeNoteDisplay notes={notesWithFa} highlightIndex={0} />);

    const faIcon = screen.getByLabelText('Fa');
    expect(faIcon).toBeInTheDocument();
  });

  it('displays So icon when note is "s"', () => {
    const notesWithSo = { ...defaultNotes, first: 's' };
    render(<ShapeNoteDisplay notes={notesWithSo} highlightIndex={0} />);

    const soIcon = screen.getByLabelText('So');
    expect(soIcon).toBeInTheDocument();
  });

  it('displays La icon when note is "l"', () => {
    const notesWithLa = { ...defaultNotes, first: 'l' };
    render(<ShapeNoteDisplay notes={notesWithLa} highlightIndex={0} />);

    const laIcon = screen.getByLabelText('La');
    expect(laIcon).toBeInTheDocument();
  });

  it('displays Mi icon when note is "m"', () => {
    const notesWithMi = { ...defaultNotes, first: 'm' };
    render(<ShapeNoteDisplay notes={notesWithMi} highlightIndex={0} />);

    const miIcon = screen.getByLabelText('Mi');
    expect(miIcon).toBeInTheDocument();
  });

  it('displays multiple notes correctly', () => {
    const notesWithMultiple = {
      ...defaultNotes,
      first: 'f',
      second: 's',
      third: 'l',
      fourth: 'm',
    };
    render(<ShapeNoteDisplay notes={notesWithMultiple} highlightIndex={0} />);

    expect(screen.getByLabelText('Fa')).toBeInTheDocument();
    expect(screen.getByLabelText('So')).toBeInTheDocument();
    expect(screen.getByLabelText('La')).toBeInTheDocument();
    expect(screen.getByLabelText('Mi')).toBeInTheDocument();
  });

  // it('highlights the current note position', () => {
  //   const notesWithMultiple = {
  //     ...defaultNotes,
  //     first: 'f',
  //     second: 's',
  //     third: 'l',
  //   };
  //   const { container } = render(
  //     <ShapeNoteDisplay notes={notesWithMultiple} highlightIndex={2} />
  //   );

  //   const items = container.querySelectorAll('[class*="text-green"]');
  //   expect(items.length).toBeGreaterThan(0);
  // });

  it('applies className prop to wrapper', () => {
    const { container } = render(
      <ShapeNoteDisplay
        notes={defaultNotes}
        highlightIndex={0}
        className="custom-class"
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('applies grid layout classes', () => {
    render(<ShapeNoteDisplay notes={defaultNotes} highlightIndex={0} />);

    const wrapper = screen.getByText('1').parentElement
      ?.parentElement as HTMLElement;
    expect(wrapper).toHaveClass('grid');
  });

  it('accepts and applies additional props', () => {
    render(
      <ShapeNoteDisplay
        notes={defaultNotes}
        highlightIndex={0}
        data-testid="display"
      />
    );

    expect(screen.getByTestId('display')).toBeInTheDocument();
  });

  it('renders notes in correct order', () => {
    const notesInOrder = {
      first: 'f',
      second: 's',
      third: 'l',
      fourth: 'm',
      fifth: 'f',
      sixth: 's',
      seventh: 'l',
      eighth: 'm',
    };
    const { container } = render(
      <ShapeNoteDisplay notes={notesInOrder} highlightIndex={0} />
    );

    const expected = ['Fa', 'So', 'La', 'Mi', 'Fa', 'So', 'La', 'Mi'];

    // Collect elements with aria-label in DOM order and map to their labels.
    const labeledElements = Array.from(
      container.querySelectorAll('[aria-label]')
    );
    const labels = labeledElements
      .map((el) => String(el.getAttribute('aria-label')))
      .filter((lbl) => expected.includes(lbl))
      .slice(0, expected.length);

    expect(labels).toEqual(expected);
  });

  // it('handles different highlight indices', () => {
  //   const { rerender, container } = render(
  //     <ShapeNoteDisplay notes={defaultNotes} highlightIndex={0} />
  //   );

  //   let highlightedItems = container.querySelectorAll('[class*="text-green"]');
  //   expect(highlightedItems).toBeTruthy();

  //   rerender(<ShapeNoteDisplay notes={defaultNotes} highlightIndex={5} />);

  //   highlightedItems = container.querySelectorAll('[class*="text-green"]');
  //   expect(highlightedItems.length).toBeGreaterThan(0);
  // });

  it('displays empty position when note is unknown character', () => {
    const notesWithInvalid = {
      ...defaultNotes,
      first: 'x',
    };
    render(<ShapeNoteDisplay notes={notesWithInvalid} highlightIndex={0} />);

    // Should display position number instead of icon
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  // it('uses unique keys for each item', () => {
  //   const notesWithMultiple = {
  //     first: 'f',
  //     second: 's',
  //     third: 'l',
  //     fourth: 'm',
  //     fifth: 'f',
  //     sixth: 's',
  //     seventh: 'l',
  //     eighth: 'm',
  //   };
  //   const { container } = render(
  //     <ShapeNoteDisplay notes={notesWithMultiple} highlightIndex={0} />
  //   );

  //   // All items should render without React warnings
  //   expect(container.querySelectorAll('[class*="Item"]')).toBeTruthy();
  // });
});
