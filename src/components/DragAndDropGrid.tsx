import { useState, useMemo } from "react";
import { Box, Grid, Button } from "@mui/material";

import { FileWithRelativePath, useDragAndDrop } from "@/hooks/useDragAndDrop";

type Props = {
    title: string;
    gridCount: number;
};

const getBoxStyle = (isDragging: boolean) => ({
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "8px",
    outline: "4px dashed transparent",
    outlineColor: isDragging ? "#2196f3" : "transparent",
    padding: "8px",
    PointerEvent: isDragging ? "none" : "auto",
});

const getImgStyle = {
    maxHeight: "120px",
    width: "auto",
};

export const DragAndDropGrid = ({ title, gridCount }: Props) => {
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

    const boxStyle = useMemo(() => getBoxStyle(isDragging), [isDragging]);

    return (
        <Grid
            height="100%"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            lg={12 / gridCount}
        >
            <Box height="100%" sx={boxStyle}>
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
                            <br />
                            {/* imageの場合はサムネイル表示 */}
                            {fileWithRelativePath.file.type.startsWith(
                                "image",
                            ) && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={URL.createObjectURL(
                                        fileWithRelativePath.file,
                                    )}
                                    alt={fileWithRelativePath.relativePath}
                                    style={getImgStyle}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </Box>
        </Grid>
    );
};
