import React, { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AspectRatio, AspectRatioProps, Box } from "@chakra-ui/react";

export interface LazyVideoProps extends AspectRatioProps {
  src?: string;
}

export const LazyVideo = (props: LazyVideoProps) => {
  const { src, ...rest } = props;
  const videoref = useRef<HTMLVideoElement>(null);

  const [inViewRef, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (videoref.current && src) {
      return inViewRef(videoref.current);
    }
  }, [src]);

  useEffect(() => {
    if (videoref.current && src) {
      if (inView && videoref.current.paused) {
        videoref.current.play();
      } else if (videoref.current.played) {
        videoref.current.pause();
      }
    }
  }, [inView, src]);

  return (
    <AspectRatio ratio={1} w="full" {...rest}>
      {src ? (
        <Box as="video" ref={videoref as any} loop muted autoPlay>
          <source src={src} type="video/mp4" />
        </Box>
      ) : (
        <Box />
      )}
    </AspectRatio>
  );
};
