import { render, screen } from '@testing-library/react';
import { ShapeNoteList } from './shape-note-list';

describe('ShapeNoteList', () => {
  it('renders loading state', () => {
    render(<ShapeNoteList parts={null} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading state when parts empty', () => {
    render(<ShapeNoteList parts={[]} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders loading state when parts exist', () => {
    const mockParts = [
      {
        songNumber: '001',
        songName: 'Amazing Grace',
        name: 'Treble',
        partId: 1,
      },
      {
        songNumber: '002',
        songName: 'Jesus Loves Me',
        name: 'Bass',
        partId: 2,
      },
    ];

    render(<ShapeNoteList parts={mockParts} loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders no results message when parts is empty', () => {
    render(<ShapeNoteList parts={[]} loading={false} />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders song parts correctly', () => {
    const mockParts = [
      {
        songNumber: '001',
        songName: 'Amazing Grace',
        name: 'Treble',
        partId: 1,
      },
      {
        songNumber: '002',
        songName: 'Jesus Loves Me',
        name: 'Bass',
        partId: 2,
      },
    ];

    render(<ShapeNoteList parts={mockParts} loading={false} />);

    expect(screen.getByText(/001 - Amazing Grace/)).toBeInTheDocument();
    expect(screen.getByText(/002 - Jesus Loves Me/)).toBeInTheDocument();
  });

  it('accepts className prop', () => {
    const { container } = render(
      <ShapeNoteList parts={[]} loading={false} className="custom-class" />
    );
    const scrollArea = container.querySelector('.custom-class');
    expect(scrollArea).toBeInTheDocument();
  });
});
