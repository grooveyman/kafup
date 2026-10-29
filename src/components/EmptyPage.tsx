import { ArchiveXIcon } from "lucide-react";
import React from "react";


interface EmptyPageProps {
  title?: string;
  message?: string;
}

const EmptyPage: React.FC<EmptyPageProps> = ({ title = "Empty List", message = "No items found in this category" }) => {
    return (
        <>
        <div className="empty-page d-flex flex-column align-items-center justify-content-center text-muted py-5">
            <ArchiveXIcon size={64} color="gray" fill="black" strokeWidth={0.5}/>
            <h5 className="mt-3">{title}</h5>
            <p>{message}</p>
        </div>
        </>
    );
}

export default EmptyPage;