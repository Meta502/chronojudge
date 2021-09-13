import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import dynamic from "next/dynamic";
import React from "react";

const DiffEditor = dynamic(import("./DiffEditor"), {
  ssr: false,
});

const Editor = dynamic(import("./Editor"), {
  ssr: false,
});

const MultiSubmitModal: React.FC<{
  currentResultIndex: number;
  setCurrentResultIndex: (a: number) => void;
  result: any;
}> = ({ currentResultIndex, setCurrentResultIndex, result }) => {
  return (
    <Modal
      isOpen={currentResultIndex !== -1}
      onClose={() => setCurrentResultIndex(-1)}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent backgroundColor={"#181818"}>
        <ModalHeader>Test Case #{currentResultIndex + 1}: Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-4">
          <div className="w-full">
            <h1 className="font-semibold mb-2">Initial Input</h1>
            <Editor
              style={{
                width: "100%!important",
                maxHeight: "8rem",
                borderRadius: "0.5rem",
              }}
              readOnly={true}
              mode="text"
              value={result?.output?.input}
            />
          </div>
          {result?.message === "WA" && (
            <div className="w-full">
              <div className="flex justify-between">
                <h1 className="font-semibold mb-2">Program Output</h1>
                <h1 className="font-semibold mb-2">Expected Output</h1>
              </div>
              <DiffEditor
                style={{
                  width: "100%!important",
                  maxHeight: "16rem",
                  borderRadius: "0.5rem",
                }}
                readOnly={true}
                mode="text"
                value={[result?.output?.stdout, result?.output?.output]}
              />
            </div>
          )}
          {(result?.message === "CLE" || result?.message === "RTE") && (
            <div className="w-full">
              <h1 className="font-semibold mb-2">Error</h1>
              <Editor
                style={{
                  width: "100%!important",
                  maxHeight: "8rem",
                  borderRadius: "0.5rem",
                }}
                readOnly={true}
                mode="text"
                value={result?.output?.stderr}
              />
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => setCurrentResultIndex(-1)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MultiSubmitModal;
