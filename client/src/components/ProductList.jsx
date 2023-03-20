// MUI Components
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useMediaQuery } from "@mui/material";

// Components
import ProductItem from "components/ProductItem";

const ProductList = ({ data, total, page, pageSize, handlePageChange }) => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box pb={2}>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        rowGap="20px"
        justifyContent="space-between"
        columnGap="1.33%"
        sx={{
          "& > div": {
            gridColumn: isNonMobile ? undefined : "span 4",
          },
        }}
      >
        {data?.map((product) => (
          <ProductItem key={product._id} data={product} />
        ))}
      </Box>

      <Pagination
        count={Math.ceil(Number(total) / pageSize)}
        variant="outlined"
        shape="rounded"
        sx={{ marginTop: 2 }}
        page={page}
        hidePrevButton
        hideNextButton
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default ProductList;
