import React, { useImperativeHandle } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

export default function RegisterModal({ modalRef, children, submitDetails }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    useImperativeHandle(modalRef, () => ({ onOpen, onClose }));

    return (
        <>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
                            <ModalBody>{children}</ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={submitDetails}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
