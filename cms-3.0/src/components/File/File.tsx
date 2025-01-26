import React, { useState } from "react";

type FileNode = {
    name: string;
    isFolder: boolean;
    isOpen?: boolean;
    children?: FileNode[];
};

const FileExplorer: React.FC = () => {
    const [fileStructure, setFileStructure] = useState<FileNode>({
        name: "root",
        isFolder: true,
        isOpen: true,
        children: [
            {
                name: "Documents",
                isFolder: true,
                isOpen: false,
                children: [
                    { name: "resume.docx", isFolder: false },
                    { name: "coverletter.docx", isFolder: false },
                ],

            },
            {
                name: "Photos",
                isFolder: true,
                isOpen: false,
                children: [
                    { name: "vacation.jpg", isFolder: false },
                    { name: "family.png", isFolder: false },
                ],
            },
            { name: "notes.txt", isFolder: false },
        ],
    });

    const toggleFolder = (node: FileNode) => {
        if (node.isFolder) {
            node.isOpen = !node.isOpen;
            setFileStructure({ ...fileStructure });
        }
    };

    const renderNodes = (node: FileNode): JSX.Element => {
        if (!node.isFolder) {
            return (
                <div key={node.name} style={{ paddingLeft: "16px" }}>
                    📄 {node.name}
                </div>
            );
        }

        return (
            <div key={node.name}>
                <div
                    style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                    onClick={() => toggleFolder(node)}
                >
                    <span style={{ marginRight: "8px" }}>{node.isOpen ? "🔽" : "▶️"}</span>
                    📁 {node.name}
                </div>
                {node.isOpen && (
                    <div style={{ paddingLeft: "16px" }}>
                        {node.children?.map((child) => renderNodes(child))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", maxWidth: "400px", margin: "auto" }}>
            {renderNodes(fileStructure)}
        </div>
    );
};

export default FileExplorer;
