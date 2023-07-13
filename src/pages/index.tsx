import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";

import { DragAndDropColumn } from "@/components/DragAndDropColumn";

export default function Home() {
    const [gridCount, setgridCount] = useState(4);

    function handleAddColumn() {
        if (gridCount === 6) return;
        setgridCount(gridCount + 1);
    }
    function handleRemoveColumn() {
        if (gridCount === 1) return;
        setgridCount(gridCount - 1);
    }

    return (
        <Box
            height="calc(100vh - 48px)"
            sx={{ margin: "24px", display: "flex", flexDirection: "column" }}
        >
            <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <h1>dropzone</h1>
                <Box marginLeft="auto">
                    <span>Grid Count: </span>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAddColumn}
                    >
                        +
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleRemoveColumn}
                    >
                        -
                    </Button>
                </Box>
            </Box>

            <Grid container sx={{ flexGrow: 1 }} gap={2} wrap="nowrap">
                {[...Array(gridCount)].map((_, i) => (
                    <DragAndDropColumn
                        key={i}
                        title={`Grid ${i + 1}`}
                        gridCount={gridCount}
                    />
                ))}
            </Grid>
        </Box>
    );
}
