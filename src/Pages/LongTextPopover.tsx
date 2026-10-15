
import { useState } from "react";

interface Props {
  text: string;
  maxWidth?: string;
}

export default function LongTextPopover({
  text,
  maxWidth = "30%",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        maxWidth,
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        title="Click to view full text"
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          cursor: "pointer",
          padding: "2px",
        }}
      >
        {text || "-"}
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1050,
            width: "320px",
            maxWidth: "80vw",
            maxHeight: "250px",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            background: "#fff",
            color: "#212529",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <strong>Full text</strong>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger me-2"
              onClick={() => setIsOpen(false)}
              aria-label="Close full text"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          </div>

          {text 
          || "-"}
          {
            text &&
             <button
              type="button"
              className="btn btn-sm btn-outline-danger border-0 w-100 text-center"
              onClick={() => setIsOpen(false)}
              aria-label="Close full text"
            >
             End
            </button>
          }
         
        </div>
      )}
    </div>
  );
}
