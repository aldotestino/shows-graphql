import React, {useEffect} from "react";
import {useQuery, gql} from '@apollo/client';
import {
  useDisclosure,
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Progress,
  IconButton,
  Tooltip,
  useToast
} from '@chakra-ui/react';
import {AddIcon} from "@chakra-ui/icons";
import {ShowI} from "./types";
import ColorModeSwitcher from "./components/ColorModeSwitcher";
import Show from "./components/Show";
import AddShow from "./components/AddShow";

const GET_SHOWS = gql`
  query GetShows {
    shows {
      id,
      title,
      releaseYear,
      posterUrl
    }
  }
`;

interface Query {
  shows: Array<ShowI>
}

function App() {

  const {data, loading, error, refetch} = useQuery<Query>(GET_SHOWS);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    if(error) {
      toast({
        title: 'Error',
        status: 'error',
        position: 'top',
        description: error?.message
      });
    }
  }, [error, toast]);

  return (
    <>
      <Box>
        <Flex justify="space-between" py={3} px={10}>
          <Heading>Shows</Heading>
          <Flex>
            <Tooltip hasArrow label="Add Show">
              <IconButton mr={3} aria-label="add-show" onClick={onOpen} children={<AddIcon />}/>
            </Tooltip>
            <ColorModeSwitcher />
          </Flex>
        </Flex>
        {loading && <Progress isIndeterminate size="xs"/>}
        <SimpleGrid spacing={10} p={10} minChildWidth="280px">
          {data?.shows.map(s => (
              <Show refetch={refetch} key={s.id} show={s} />
            ))}
        </SimpleGrid>
      </Box>
      <AddShow isOpen={isOpen} onClose={onClose} refetch={refetch} />
    </>
  );
}

export default App;
