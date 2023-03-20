// Packages
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";

// MUI Components
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// MUI Icons
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// Components
import Header from "components/Header";

// API DATA
import {
  useAddItemToCartMutation,
  useGetCartItemsQuery,
  useRemoveItemToCartMutation,
  useUpdateItemQuantityMutation,
} from "state/api";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CartPage = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState(null);

  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetCartItemsQuery(userId);

  const [updateItemQuantity] = useUpdateItemQuantityMutation();
  const [removeItemFromCart] = useRemoveItemToCartMutation();

  const theme = useTheme();

  const columns = [
    {
      field: "userId",
      headerName: "Item",
      flex: 2,
      align: "start",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.product.imageUrl} sx={{ margin: "20px" }} />
            {params.row.product.name}
          </>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return <>{params.row.product.price} USD</>;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 2,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton
            sx={{ margin: "10px" }}
            disabled={params.row.quantity == 1}
            onClick={() =>
              updateItemQuantity({
                userId,
                productId: params.row.product._id,
                quantity: params.row.quantity - 1,
              })
            }
          >
            <RemoveCircleIcon />
          </IconButton>

          <p>{params.row.quantity}</p>

          <IconButton
            sx={{ margin: "10px" }}
            onClick={() =>
              updateItemQuantity({
                userId,
                productId: params.row.product._id,
                quantity: params.row.quantity + 1,
              })
            }
          >
            <AddCircleIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          {Number(params.row.quantity * params.row.product.price).toFixed(2)}{" "}
          USD
        </>
      ),
    },
    {
      field: "aciton",
      headerName: "Remove",
      flex: 1,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenDialog(params.row)}>
          <CancelIcon />
        </IconButton>
      ),
    },
  ];

  const handleOpenDialog = (product) => {
    setItem(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItem(null);
  };

  const handleDeleteConfirm = () => {
    removeItemFromCart({
      userId,
      productId: item.product._id,
    });
    handleCloseDialog();
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="CART"
        subTitle="Ready to make your purchase? Check your cart first"
      />

      {data || !isLoading ? (
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            rows={data?.products || []}
            getRowId={(row) => row._id}
            columns={columns}
            rowCount={data?.products?.lenght || 0}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            autoHeight
          />
        </Box>
      ) : (
        <>Loading...</>
      )}

      {openDialog && (
        <Dialog
          TransitionComponent={Transition}
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to remove {item.quantity}{" "}
              {item.quantity == 1 ? "quantity" : "quantities"} of (
              {item.product.name})?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="secondary"
            >
              YES
            </Button>
            <Button onClick={handleCloseDialog} variant="contained">
              No
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CartPage;
