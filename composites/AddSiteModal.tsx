import { NextPage } from 'next';
import { useAuth } from 'lib/auth';
import { createSite } from 'lib/db';
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
  useToast,
} from '@chakra-ui/react';

const AddSiteModal = (): NextPage => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const auth = useAuth();

  const onSubmit = (data) => {
    createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      ...data,
    });
    toast({
      position: 'bottom',
      isClosable: true,
      status: 'success',
      title: 'Success!',
      description: "We've added your site.",
    });
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
                {...register('site', { required: true })}
              />
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Link</FormLabel>
              <Input
                type="text"
                placeholder="https://website.com"
                {...register('url', { required: true })}
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
