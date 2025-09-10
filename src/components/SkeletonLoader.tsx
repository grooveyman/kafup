import { Skeleton } from "@mui/material";

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 3 }) => {
  return (
    <>
      <div className="row">
        {Array.from({ length: count }).map((_, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card p-2">
              <Skeleton height={200} /> {/* Image placeholder */}
              <div className="p-2">
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={15} />
                <Skeleton width="40%" height={15} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonLoader;
