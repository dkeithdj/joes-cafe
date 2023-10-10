import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = ({
  length,
  width,
  height,
}: {
  length: number;
  width?: string;
  height?: string;
}) => {
  return (
    <>
      {Array.from({ length: length }, (v, i) => (
        <Skeleton
          key={i}
          className={`my-4 w-[${width}px] h-[${height}px] rounded-[24px]`}
        />
      ))}
    </>
  );
};

export default Loading;
