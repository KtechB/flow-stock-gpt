import { Text, useOutsideClick } from '@chakra-ui/react';
import { useRef, useState } from 'react';

type ContentProps = { pageUrl: string };
const Content: React.FC<ContentProps> = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });
  return (
    <div className="fixed z-[999] bottom-2 right-2 shadow-xl border-[1px] bg-white bg-opacity-10">
      <Text>Page URL is added </Text>
    </div>
  );
};

export default Content;
