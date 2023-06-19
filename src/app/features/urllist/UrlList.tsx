import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Stack } from '@chakra-ui/react';
import React from 'react';

interface UrlListProps {
  urls: string[];
  onDelete: (index: number) => void;
}

const UrlList: React.FC<UrlListProps> = ({ urls, onDelete }) => {
  if (urls.length === 0) {
    return <div className="text-gray-500">No urls</div>;
  }
  return (
    <Stack w="full" spacing={4}>
      <ul className="list-disc list-inside">
        {urls.map((url, index) => (
          <Box key={index} className="py-2">
            <Flex alignItems="center" justifyContent="space-between">
              <span className="text-gray-700">{url}</span>
              <IconButton
                aria-label="delete"
                variant="outline"
                icon={<DeleteIcon />}
                onClick={() => onDelete(index)}
              />
            </Flex>
          </Box>
        ))}
      </ul>
    </Stack>
  );
};

export default UrlList;
