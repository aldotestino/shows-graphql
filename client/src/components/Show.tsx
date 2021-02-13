import React from 'react';
import {VStack, Image, Heading, Text, Button, useToast, Flex} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';
import {useMutation, gql} from "@apollo/client";
import {ShowI} from '../types';

interface ShowProps {
  show: ShowI,
  refetch: () => void
}

const REMOVE_SHOW = gql`
  mutation RemoveShow($id: String) {
    removeShow(id: $id) {
      id,
      title,
      releaseYear,
      posterUrl
    }
  }
`;

function Show({show, refetch}: ShowProps) {

  const [removeShow, {loading}] = useMutation(REMOVE_SHOW);

  const toast = useToast();

  async function onDelete() {
    try {
      const data = await removeShow({
        variables: {
          id: show.id
        }
      });
      console.log(data);
      refetch();
    }catch (e) {
      toast({
        title: 'Error',
        description: e.message.split(': ')[1],
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "top"
      });
    }
  }

  return (
    <Flex align="flex-start" justify="center">
      <VStack minW="280px" w="280px" align="flex-start">
        <Image borderRadius="md" h="400px" w="280px" src={show.posterUrl} />
        <Button leftIcon={<DeleteIcon />} isLoading={loading} onClick={onDelete} w="100%">Delete</Button>
        <Heading size="lg">{show.title}</Heading>
        <Text>{show.releaseYear}</Text>
      </VStack>
    </Flex>
  );

}

export default Show