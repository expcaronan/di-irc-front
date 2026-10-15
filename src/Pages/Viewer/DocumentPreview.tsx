
import { useEffect, useState } from "react";
import { DocViewer } from "anyview";
import "anyview/styles";

interface DocumentPreviewProps {
    documentUrl: string;
    fileName: string;
}

export default function DocumentPreview({
    documentUrl,
    fileName
}: DocumentPreviewProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadDocument() {
            try {
                setFile(null);
                setError("");

                const response = await fetch(documentUrl, {
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(
                        `Unable to load document: ${response.status}`
                    );
                }

                const blob = await response.blob();

                const documentFile = new File(
                    [blob],
                    fileName,
                    { type: blob.type }
                );

                if (!cancelled) {
                    setFile(documentFile);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Failed to load document."
                    );
                }
            }
        }

        loadDocument();

        return () => {
            cancelled = true;
        };
    }, [documentUrl, fileName]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!file) {
        return <div>Loading document...</div>;
    }

    return (
        <div style={{ height: "75vh", overflow: "auto" }}>
            <DocViewer source={{ kind: "file", file }} />
        </div>
    );
}
