
interface TopThreeProps {
    name: string;
    image: string;
    rank: number;
    pts: number;
    badges: string[];
    meta: {
        likes: number;
        views: number;
        follows: number;
        collections: number;
        sold: number;
        designs: number;
    }
}

export const TopThreeCard: React.FC<TopThreeProps> = ({ name, image, rank, pts, badges, meta }) => {
    return (
        <>
            <div className="topthree-card ad-card">
                <div className="topthree-body">
                    <div className="d-flex justify-content-between">
                        <div className="topthree-dp">
                            <img src={image} />
                        </div>
                        <p className="text-black">{pts}pts</p>
                    </div>
                    <div className="topthree-title mt-2 d-flex justify-content-start gap-2">
                        <h6>{name}</h6> <span>&#9679;</span> <p>{meta.sold} sold</p>
                    </div>
                    {/* <hr className="hr"/> */}
                    <div className="topthree-meta">
                        <div className="mt-1 d-flex justify-content-start flex-grow flex-wrap gap-1">
                            <span>{meta.likes} likes</span> <span>&#9679;</span>
                            <span>{meta.follows} follows</span> <span>&#9679;</span>
                            <span>{meta.designs} designs</span> <span>&#9679;</span>
                            <span>{meta.collections} collections</span>
                        </div>
                    </div>

                    <div className="mt-3 topthree-badges">
                        <div className="d-flex justify-content-start gap-1">
                            {badges.map((item) => (
                                <span className="badge-sm">{item}</span>
                            ))}

                        </div>
                    </div>

                    <div className="mt-2">
                        <p>since 8th Aug, 2026</p>
                    </div>
                </div>
                <div className="rank-circle">
                    {rank}
                </div>
            </div>
        </>
    );
};

