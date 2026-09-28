import React from 'react'
import baseUrlString from '../../Api/baseUrlString';
interface props {
    filePath: string;
    onClose: () => void;
}
function HomeFileViewer({filePath, onClose}:props) {
  // Convert your stored path to a URL
    // const fileUrl = filePath.startsWith("http")
    //     ? filePath
    //     : `${baseUrlString.test}/${filePath.replace(/^\/+/, "")}`;
    const normalizedPath = filePath
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

    const fileUrl = `${baseUrlString.test+"/DocumentViewer"}/${normalizedPath}`;
    // Get filename
    const fileName =
        filePath.split(/[\\/]/).pop() || "DocumentViewer";

    // Get extension
    const extension =
        fileName.split(".").pop()?.toLowerCase() || "";

    const imageExtensions = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "bmp",
        "svg"
    ];

    const officeExtensions = [
        "doc",
        "docx",
        "xls",
        "xlsx",
        "ppt",
        "pptx"
    ];

    const isImage = imageExtensions.includes(extension);
    const isPdf = extension === "pdf";
    const isOffice = officeExtensions.includes(extension);

    console.log(fileUrl);


   return (
        <div
            className="modal d-block"
            style={{
                backgroundColor: "rgba(0,0,0,0.7)"
            }}
        >

            <div className="modal-dialog modal-xl modal-dialog-centered">

                <div className="modal-content">

                    {/* Header */}
                    <div className="modal-header">

                        <h5 className="modal-title">
                            {fileName}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>


                    {/* Body */}
                    <div
                        className="modal-body p-0"
                        style={{
                            height: "80vh",
                            overflow: "auto"
                        }}
                    >

                        {/* PDF */}
                        {isPdf && (
                            <iframe
                                src={fileUrl}
                                title={fileName}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none"
                                }}
                            />
                        )}


                        {/* IMAGE */}
                        {isImage && (
                            <div
                                className="d-flex justify-content-center align-items-center h-100 p-3"
                            >
                                <img
                                    src={fileUrl}
                                    alt={fileName}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        )}


                        {/* WORD / EXCEL / POWERPOINT */}
                        {isOffice && (
                            <iframe
                                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
                                title={fileName}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none"
                                }}
                            />
                        )}


                        {/* UNSUPPORTED */}
                        {!isPdf && !isImage && !isOffice && (
                            <div className="d-flex flex-column justify-content-center align-items-center h-100">

                                <i
                                    className="bi bi-file-earmark"
                                    style={{ fontSize: "5rem" }}
                                />

                                <h5 className="mt-3">
                                    Preview not available
                                </h5>

                                <p className="text-muted">
                                    {fileName}
                                </p>

                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <i className="bi bi-download me-2"></i>
                                    Download File
                                </a>

                            </div>
                        )}

                    </div>


                    {/* Footer */}
                    <div className="modal-footer">

                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <i className="bi bi-download me-2"></i>
                            Open / Download
                        </a>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onClose}
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )


}

export default HomeFileViewer