import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ width, height }) => {
  return <Skeleton width={width} height={height} />;
};

export default SkeletonLoader;