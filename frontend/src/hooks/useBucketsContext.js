import { BucketsContext } from "../context/BucketContext";
import { useContext } from "react";


export const useBucketsContext = () => {
  const context = useContext(BucketsContext);
  if(!context) {
    throw Error("use BucketContext must be used within a BucketsContext")
  }
  return context
}