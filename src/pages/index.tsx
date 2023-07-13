import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";

import { DragAndDropGrid } from "@/components/DragAndDropGrid";

const parentBoxStyle = {
    margin: "24px",
    display: "flex",
    flexDirection: "column",
};
const childrenBoxStyle = {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
};
const gridStyle = { flexGrow: 1 };

export default function Home() {
    const [gridCount, setgridCount] = useState(4);

    function handleAddGrid() {
        setgridCount((prevCount) =>
            prevCount < 6 ? prevCount + 1 : prevCount,
        );
    }
    function handleRemoveGrid() {
        setgridCount((prevCount) =>
            prevCount > 1 ? prevCount - 1 : prevCount,
        );
    }

    return (
        <Box height="calc(100vh - 48px)" sx={parentBoxStyle}>
            <Box sx={childrenBoxStyle}>
                <h1>dropzone</h1>
                <Box marginLeft="auto">
                    <span>Grid Count: </span>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddGrid}
                    >
                        +
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleRemoveGrid}
                    >
                        -
                    </Button>
                </Box>
            </Box>

            <Grid container sx={gridStyle} gap={2} wrap="nowrap">
                {[...Array(gridCount)].map((_, i) => (
                    <DragAndDropGrid
                        key={i}
                        title={`Grid ${i + 1}`}
                        gridCount={gridCount}
                    />
                ))}
            </Grid>
        </Box>
    );
}
