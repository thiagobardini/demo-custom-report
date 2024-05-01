import React, { useState } from "react";
import { useAppContext } from "@/context";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Accordion, Button, Text, Popover } from "@mantine/core";
import Image from "next/image";
import { ImageAccordionModalProps } from "../../utils/interfaces";
import Loading from "./Loading";

const ImageAccordionModal: React.FC<ImageAccordionModalProps> = ({ imageUrl, message, title }) => {
  const [opened, setOpened] = useState(false);
  const [openedPopover, { close, open }] = useDisclosure(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { selectReportContext } = useAppContext();

  return (
    <>
      <Popover width={200} position='bottom' withArrow shadow='sm' opened={openedPopover}>
        <Popover.Target>
          <div onMouseEnter={open} onMouseLeave={close}>
            <Button className="button-disabled" onClick={() => setOpened(true)} variant='outline' size='xs' color='text1.9' style={{ height: "2rem" }} disabled={selectReportContext !== 0}>
              View
            </Button>
          </div>
        </Popover.Target>
        <Popover.Dropdown style={{ pointerEvents: "none" }} >
          <Text size="xs">{selectReportContext === 0 ? "Click to view image" : "Cannot view images from previous reports."}</Text>
        </Popover.Dropdown>
      </Popover>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size='lg'
        title={title}
        centered
        styles={{
          title: {
            fontWeight: 700,
            textAlign: "center",
            fontSize: "1.2rem",
          },
          inner: {
            marginTop: "10rem",
          },
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "auto" }}>
          {!imageLoaded && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Loading />
            </div>
          )}
          <Image src={`/test-report/${imageUrl}`} alt='Screenshot' layout='responsive' width={700} height={475} onLoad={() => setImageLoaded(true)} />
        </div>
        <Accordion>
          <Accordion.Item value={title}>
            <Text fw={500} py={10}>
              {message}
            </Text>
          </Accordion.Item>
        </Accordion>
      </Modal>
    </>
  );
};

export default ImageAccordionModal;
