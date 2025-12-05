import { ArchiveXIcon } from "lucide-react";
import React from "react";


const EmptyPage: React.FC = () => {
    return (
        <>
        <div className="empty-page d-flex flex-column align-items-center justify-content-center text-muted py-5">
            <ArchiveXIcon size={64} color="gray" fill="black" strokeWidth={0.5}/>
            <h5>Empty List</h5>
            <p>No items found in this category</p>
        </div>
        </>
    );
}

export default EmptyPage;