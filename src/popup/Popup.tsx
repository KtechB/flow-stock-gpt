import { useEffect, useState } from 'react';
import { getBucket } from '@extend-chrome/storage';
import UrlList from '../app/features/urllist/UrlList';

import { Box, Button, Flex, Input, VStack } from '@chakra-ui/react';
interface UrlBucket {
  urls: string[];
}
const bucket = getBucket<UrlBucket>('urls', 'local');

const Popup = () => {
  document.body.className = 'w-[30rem] h-[10rem]';

  const [urls, setUrls] = useState<string[]>([]);
  // initial load
  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.urls) {
        setUrls(value.urls);
      }
    })();
  }, []);

  const updateUrlBucket = (urls: string[]) => {
    bucket.set({ urls });
  };
  const updateUrls = (urls: string[]) => {
    setUrls(urls);
    updateUrlBucket(urls);
  };
  const onAddUrl = (url: string) => {
    console.log('onAddUrl', url);
    const newUrls = [...urls, url];
    updateUrls(newUrls);
  };
  const onDelete = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    updateUrls(newUrls);
  };

  return (
    <>
      {/* <div className="flex justify-center mt-2 text-base">Popup Counter</div> */}

      <Box p={4}>
        <VStack spacing={4}>
          <AddUrlForm onAddUrl={onAddUrl} />
          <UrlList urls={urls} onDelete={onDelete} />
        </VStack>
      </Box>
    </>
  );
};

type AddUrlFormProps = {
  onAddUrl: (url: string) => void;
};

const AddUrlForm = ({ onAddUrl }: AddUrlFormProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddUrl(url);
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex alignItems="center" mt={2}>
        <Input
          border="1px"
          borderColor="gray.400"
          borderRadius="md"
          placeholder="Enter URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <Button ml={2} border="1px" borderColor="gray.400" borderRadius="md" onClick={handleSubmit}>
          Add
        </Button>
      </Flex>
    </form>
  );
};
export default Popup;
