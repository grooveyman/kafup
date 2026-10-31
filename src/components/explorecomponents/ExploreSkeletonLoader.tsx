import { Skeleton } from "@mui/material";

interface ExploreSkeletonLoaderProps {
    count?: number;
}

const ExploreSkeletonLoader: React.FC<ExploreSkeletonLoaderProps> = ({ count = 9 }) => {
    return (
        <div className="row">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="explore-container col-md-4 col-xl-4 col-xs-6 col-lg-4 col-sm-6"
                >
                    <div className="img-container">
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Skeleton animation="wave" width="45%" />
                        <Skeleton animation="wave" width="25%" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ExploreSkeletonLoader;