import ReactMarkdown from 'react-markdown';

interface HotelContentsProps {
  contents: string;
}

const HotelContents = ({ contents }: HotelContentsProps) => {
  return (
    <div className="prose p-4 max-w-full ">
      <ReactMarkdown>{contents}</ReactMarkdown>
    </div>
  );
};

export default HotelContents;
