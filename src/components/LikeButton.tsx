import { useQueryClient } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";
import { useApiMutation } from "../hooks/useApi";
import "../assets/css/likebutton.css";

interface LikeButtonProps {
    designId: string | number;
    likes?: number;
    queryKeys?: string[][];
    overlay?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
    designId,
    likes = 0,
    queryKeys = [],
    overlay = false,
}) => {
    const queryClient = useQueryClient();
    const likeMutation = useApiMutation<{ message: string }>("/designs/like", "PATCH", {
        onSuccess: async () => {
            await Promise.all(
                queryKeys.map((queryKey) =>
                    queryClient.invalidateQueries({ queryKey })
                )
            );
        },
    });

    return (
        <button
            type="button"
            className={`design-like-button${overlay ? " design-like-button--overlay" : ""}`}
            onClick={() => likeMutation.mutate({ id: designId })}
            disabled={likeMutation.isPending}
            aria-label="Like design"
        >
            <HeartIcon size={18} />
            {likes > 0 && <span className="ms-1">{likes}</span>}
        </button>
    );
};

export default LikeButton;