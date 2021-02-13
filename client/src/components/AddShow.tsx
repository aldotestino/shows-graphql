import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,
  VStack,
  Select,
  Image,
  useToast
} from "@chakra-ui/react"
import {useForm} from "react-hook-form";
import {useMutation, gql} from "@apollo/client";
import {ShowI} from "../types";

const ADD_SHOW = gql`
  mutation AddShow($title: String, $releaseYear: Int, $posterUrl: String) {
    addShow(title: $title, releaseYear: $releaseYear, posterUrl: $posterUrl) {
      id,
      title,
      releaseYear,
      posterUrl
    }
  }
`;

interface AddShowModalProps {
  isOpen: boolean,
  onClose: () => void,
  refetch: () => void
}

function years() {
  const currentYear = new Date().getFullYear();
  return Array.from({length: 70}).map((_,i) => currentYear - 70 + i + 1).reverse();
}

function AddShow({isOpen, onClose, refetch}: AddShowModalProps) {

  const {register, handleSubmit, errors, watch} = useForm<ShowI>();
  const posterUrl = watch("posterUrl");

  const toast = useToast();

  const [addShow, {loading}] = useMutation<ShowI>(ADD_SHOW);

  async function onSubmit(value: ShowI) {
    try {
      const data =  await addShow({
        variables: value
      });
      console.log(data);
      refetch();
      onClose();
    }catch(e) {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Show</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <VStack spacing={3}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Show Title</FormLabel>
                <Input
                  autoFocus={true}
                  name="title"
                  placeholder="Title"
                  ref={register({required: {value: true, message: "This field is required"}})}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.releaseYear}>
                <FormLabel htmlFor="releaseYear">Show Release Year</FormLabel>
                <Select name="releaseYear" ref={register({required: {value: true, message: "This field is required"}})}>
                  {years().map(y => (<option key={y} value={y}>{y}</option>))}
                </Select>
                <FormErrorMessage>
                  {errors.releaseYear && errors.releaseYear.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.posterUrl}>
                <FormLabel htmlFor="posterURl">Show Poster</FormLabel>
                <Input
                  name="posterUrl"
                  placeholder="Poster"
                  ref={register({required: {value: true, message: "This field is required"}})}
                />
                <FormErrorMessage>
                  {errors.posterUrl && errors.posterUrl.message}
                </FormErrorMessage>
              </FormControl>
              <Image maxH="200px" src={posterUrl} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" isLoading={loading} type="submit" mr={3}>
              Add
            </Button>
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddShow;