import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";

import { FileWithRelativePath, useDragAndDrop } from "@/hooks/useDragAndDrop";

type Props = {
    title: string;
    gridCount: number;
};

export function DragAndDropColumn({ title, gridCount }: Props) {
    const [droppedFiles, setDroppedFiles] = useState<FileWithRelativePath[]>(
        [],
    );

    function onDrop(files: FileWithRelativePath[]) {
        setDroppedFiles((prev) => [...prev, ...files]);
    }

    const {
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    } = useDragAndDrop(onDrop);

    function handleClearDroppedFiles() {
        setDroppedFiles([]);
    }

    return (
        <Grid
            height="100%"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            lg={12 / gridCount}
        >
            <Box
                height="100%"
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "4px dashed transparent",
                    borderColor: isDragging ? "#2196f3" : "transparent",
                    marginX: "8px",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <h2>{title}</h2>
                    <Button
                        variant="outlined"
                        onClick={handleClearDroppedFiles}
                        sx={{ marginLeft: "auto" }}
                    >
                        CLEAR
                    </Button>
                </Box>
                <ul style={{ listStylePosition: "inside" }}>
                    {droppedFiles.map((fileWithRelativePath) => (
                        <li key={fileWithRelativePath.relativePath}>
                            {fileWithRelativePath.relativePath}
                            {/* Fileなのでサムネイル表示などもできるはず */}
                            {fileWithRelativePath.file.type === "image/png" && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={URL.createObjectURL(
                                        fileWithRelativePath.file,
                                    )}
                                    alt={fileWithRelativePath.relativePath}
                                    style={{ width: "100%" }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </Box>
        </Grid>
    );
}
