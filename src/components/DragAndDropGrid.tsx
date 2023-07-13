import { useState, useMemo } from "react";
import { Box, Grid, Button } from "@mui/material";

import { FileWithRelativePath, useDragAndDrop } from "@/hooks/useDragAndDrop";

type Props = {
    title: string;
    gridCount: number;
    isDraggingForTransfer: boolean;
    setIsDraggingForTransfer: React.Dispatch<React.SetStateAction<boolean>>;
    draggingFiles: FileWithRelativePath[];
    setDraggingFiles: React.Dispatch<
        React.SetStateAction<FileWithRelativePath[]>
    >;
};

const getBoxStyle = (
    isDragging: boolean,
    isDroppable: boolean,
    isDraggingForTransfer: boolean,
) => ({
    height: "100%",
    backgroundColor: "#fff",
    opacity: isDragging || isDroppable ? 0.6 : 1,
    borderRadius: "8px",
    outline: "4px dashed transparent",
    outlineColor: isDragging ? "#2196f3" : isDroppable ? "#F00" : "transparent",
    padding: "8px",
    pointerEvent: isDragging || isDraggingForTransfer ? "none" : "auto",
});

const getImgStyle = (isDraggingFiles: boolean) => ({
    maxHeight: "120px",
    width: "auto",
    opacity: isDraggingFiles ? 0.3 : 1,
});

export const DragAndDropGrid = ({
    title,
    gridCount,
    isDraggingForTransfer,
    setIsDraggingForTransfer,
    draggingFiles,
    setDraggingFiles,
}: Props) => {
    const [droppedFiles, setDroppedFiles] = useState<FileWithRelativePath[]>(
        [],
    );
    // ハイライトを管理するためのstate
    const [isDroppable, setIsDroppable] = useState<boolean>(false);

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

    const boxStyle = useMemo(
        () => getBoxStyle(isDragging, isDroppable, isDraggingForTransfer),
        [isDragging, isDroppable, isDraggingForTransfer],
    );

    function handleDragEnterForTransfer() {
        setIsDroppable(true);
    }

    function handleDragLeaveForTransfer() {
        setIsDroppable(false);
    }

    return (
        <Grid
            height="100%"
            onDragEnter={
                !isDraggingForTransfer
                    ? handleDragEnter
                    : handleDragEnterForTransfer
            }
            onDragLeave={
                !isDraggingForTransfer
                    ? handleDragLeave
                    : handleDragLeaveForTransfer
            }
            onDragOver={handleDragOver}
            onDrop={
                !isDraggingForTransfer
                    ? handleDrop
                    : () => {
                          setDroppedFiles((prev) => [
                              ...prev,
                              ...draggingFiles,
                          ]);
                          setIsDroppable(false);
                          setDraggingFiles([]);
                      }
            }
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
                        <Box
                            key={fileWithRelativePath.relativePath}
                            draggable
                            onDragStart={() => {
                                setIsDraggingForTransfer(true);
                                setDraggingFiles([fileWithRelativePath]);
                            }}
                            onDragEnd={() => {
                                setIsDraggingForTransfer(false);
                                setDraggingFiles([]);
                                // onDropが発火しないときでもドラッグしたファイルを削除してしまうがサンプル実装なので妥協
                                // 実際はstateではなくs3などで管理するのでonDrop側で削除コマンドなどで対応できる
                                setDroppedFiles((prev) =>
                                    prev.filter(
                                        (file) =>
                                            file.relativePath !==
                                            fileWithRelativePath.relativePath,
                                    ),
                                );
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <li>
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
                                        style={getImgStyle(
                                            draggingFiles.some(
                                                (file) =>
                                                    file ===
                                                    fileWithRelativePath,
                                            ),
                                        )}
                                    />
                                )}
                            </li>
                        </Box>
                    ))}
                </ul>
            </Box>
        </Grid>
    );
};
