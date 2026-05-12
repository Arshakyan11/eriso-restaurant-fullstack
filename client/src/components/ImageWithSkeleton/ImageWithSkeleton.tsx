import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
type Props = {
  src: string;
  alt: string;
  className?: string;
};

const ImageWithSkeleton = ({ src, alt, className }: Props) => {
  const [loaded, setLoaded] = useState<Boolean>(false);

  return (
    <>
      {!loaded && <Skeleton height={300} />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          display: loaded ? "block" : "none",
        }}
      />
    </>
  );
};

export default ImageWithSkeleton;
