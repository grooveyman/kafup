import { Loader } from "lucide-react";
import ListContainer from "./shopcomponents/ListContainer";
import { useApiQuery } from "../hooks/useApi";
import { Product } from "../pages/Home";
import EmptyPage from "./EmptyPage";

interface DesignResponse{
    total: number;
    results: Product[];
}
const SimilarDesigns: React.FC = () => {
    const enpoint = `/designs/`;
    const { data, isLoading } = useApiQuery<DesignResponse>(
        ["productscat"],
        enpoint
    );
    return (
        <>
            <div className="similar-designs">
                <div className="row">
                    <h5>Similar Designs You May Like</h5>
                    {isLoading && <Loader/>}
                    {!data?.results || data.results.length === 0 ? (
                        <>
                            <div className="">
                                <EmptyPage />
                            </div>
                        </>
                    ) : (
                        <ListContainer list={data.results} />
                    )
                    }
                </div>
            </div>
        </>
    );
};

export default SimilarDesigns;