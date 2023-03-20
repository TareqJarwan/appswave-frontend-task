// MUI Components
import Box from "@mui/material/Box";

// Components
import Header from "components/Header";
import ProductList from "components/ProductList";
import { useState } from "react";

// API DATA
import { useGetProductsQuery } from "state/api";

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useGetProductsQuery({
    page,
    pageSize,
  });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  console.log("Data", data);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subTitle="See your list of products." />
      {data || !isLoading ? (
        <ProductList
          data={data?.products || []}
          total={data?.total || 0}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
        />
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default ProductsPage;
