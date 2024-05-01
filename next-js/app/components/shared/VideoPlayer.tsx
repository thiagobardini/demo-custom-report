import React, { useEffect, useRef, useState } from "react";
import { Box, Title, Accordion, Group, Flex } from "@mantine/core";

interface VideoPlayerProps {
  src?: string;
  alt?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, alt }) => {
  // State to track the active accordion item
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  // Reference to the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect to play the video when the accordion opens
  useEffect(() => {
    if (activeItem === 'ChangesDetected' && videoRef.current) {
      videoRef.current.play();
    }
  }, [activeItem]);

  return (
    <>
      <Box px='xs' pt='xs' my='xs' style={{ backgroundColor: "#f8f9fa", boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.1)", borderRadius: "8x" }}>
        <Box>
          <Accordion
            value={activeItem}
            onChange={setActiveItem} // Update the activeItem state when the accordion changes
            styles={{
              content: {
                padding: 0,
              },
            }}
          >
            <Accordion.Item value='ChangesDetected'>
              <Accordion.Control style={{ padding: "0px !important" }} p={0}>
                <Group wrap='nowrap'>
                  <div>
                    <Title order={5}>Automated Test Showcase</Title>
                  </div>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Flex justify='center'>
                  <video 
                    ref={videoRef} 
                    controls 
                    style={{ maxWidth: "640px", maxHeight: "480px", minWidth: "280px" }} 
                    aria-label={alt} 
                  >
                    <source src={`/videos/${src}.webm`} type='video/webm' />
                    Your browser does not support the video tag.
                  </video>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Box>
      </Box>
    </>
  );
};

export default VideoPlayer;

