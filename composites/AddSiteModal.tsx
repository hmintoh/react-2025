import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

const AddSiteModal = (): NextPage => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Add your first site
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add site</ModalHeader>

          <ModalBody>
            <FormControl mb={4} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="My Site"
                {...register('name', { required: true })}
              />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Link</FormLabel>
              <Input
                type="text"
                placeholder="https://website.com"
                {...register('link', { required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="gray.100"
              variant="ghost"
              onClick={onClose}
              mr={2}
            >
              Cancel
            </Button>
            <Button colorScheme="teal" mr={3} type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AddSiteModal };
