import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const ShowMoreList = ({
  items = [],
  renderItem,
  initialCount = 3,
  itemLabel = "Items",
}) => {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, initialCount);

  const remainingItems = items.length - initialCount;

  return (
    <>
      {visibleItems.map(renderItem)}

      {items.length > initialCount && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setExpanded(!expanded)}
            sx={{
              borderRadius: "999px",
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
              minWidth: 180,
            }}
          >
            {expanded
              ? "Show Less"
              : `Show ${remainingItems} More ${itemLabel}`}
          </Button>
        </Box>
      )}
    </>
  );
};

export default ShowMoreList;
