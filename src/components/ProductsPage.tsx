import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  MenuItem,
  CircularProgress,
  Box,
  Pagination,
} from "@mui/material";
import DrawerNavigation from "./DrawerNavigation";
import { addNewProduct, getAllProducts } from "../providers/http";
import { useAuth } from "./Auth/AuthContext";

const TableContainerStyled = styled(TableContainer)<{ component: typeof Paper }>({
  margin: "20px 0",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const TableHeaderCell = styled(TableCell)({
  backgroundColor: "#3f51b5",
  color: "#fff",
  fontWeight: "bold",
});

const StyledButton = styled(Button)({
  marginBottom: "20px",
  backgroundColor: "#3f51b5",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    padding: "20px",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#3f51b5",
  color: "#fff",
  padding: "10px 20px",
});

const StyledDialogContentText = styled(DialogContentText)({
  marginBottom: "10px",
});

const StyledTextField = styled(TextField)({
  marginTop: "10px",
  marginBottom: "10px",
});

const ProductsPage: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any>([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    description: "",
    unit: "",
    unitPrice: "",
  });
  const [open, setOpen] = useState(false);
  const categories: any = ["meter", "kilogram", "Nos"];
  const [loading, setLoading] = useState(false);
  const [productCode, setProductCode] = useState<any>(); // State for auto-generated code
  const [dataLoading, setDataLoading] = useState(true); // State for loading data

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Dialog state for product details
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    generateRandomCode();
    fetchData();
  }, []);

  const fetchData = () => {
    setDataLoading(true); // Set data loading state to true
    getAllProducts(user?.companyId)
      .then((resp: any) => {
        console.log("getAllProducts resp =>", resp.data.data);
        setProducts(resp.data.data);
        setDataLoading(false); // Set data loading state to false
      })
      .catch((err: any) => {
        console.log("err =>", err);
        setDataLoading(false); // Set data loading state to false
      });
  };

  const generateRandomCode = () => {
    // Generate a random 4-digit alphanumeric code
    const characters: any = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setProductCode(code);
  };

  const handleClickOpen = () => {
    generateRandomCode();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProducts = () => {
    setLoading(true);
    addNewProduct(
      user?.companyId,
      productCode,
      newProduct.productName,
      newProduct.description,
      newProduct.unit,
      newProduct.unitPrice
    )
      .then((resp: any) => {
        handleClose();
        fetchData();
        generateRandomCode();
        setLoading(false);
      })
      .catch((err: any) => {
        console.log("err while adding a new product");
        setLoading(false);
      });
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setSelectedProduct(null);
    setOpenDetailDialog(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <DrawerNavigation>
      <div>
        <Typography variant="h5" style={{ marginBottom: "20px", color: "#3f51b5", fontWeight: "bold" }}>
          Products
        </Typography>
        <StyledButton variant="contained" onClick={handleClickOpen}>
          Add New Product
        </StyledButton>
        {dataLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainerStyled component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Product Name</TableHeaderCell>
                    <TableHeaderCell>Unit</TableHeaderCell>
                    <TableHeaderCell>Price</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentProducts.map((product: any) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.productCode}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell>{product.unitPrice}</TableCell>
                      <TableCell>
                        {product.isActive === "1" ? (
                          <span style={{ color: "green" }}>Active</span>
                        ) : (
                          <span style={{ color: "red" }}>Inactive</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleViewDetails(product)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainerStyled>
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={Math.ceil(products.length / productsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
        <StyledDialog open={open} onClose={handleClose}>
          <StyledDialogTitle>Add New Client</StyledDialogTitle>
          <DialogContent>
            <StyledDialogContentText>
              Please enter the details of the new product.
            </StyledDialogContentText>

            <StyledTextField
              margin="dense"
              label="Product Code"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={productCode}
            />

            <StyledTextField
              margin="dense"
              label="Product Name"
              type="text"
              fullWidth
              name="price"
              value={newProduct.productName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productName: e.target.value })
              }
            />

            <StyledTextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />

            <StyledTextField
              select
              margin="dense"
              label="Category"
              fullWidth
              name="category"
              value={newProduct.unit}
              onChange={(e) =>
                setNewProduct({ ...newProduct, unit: e.target.value })
              }
            >
              {categories.map((category: any, index: any) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </StyledTextField>

            <StyledTextField
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              name="price"
              value={newProduct.unitPrice}
              onChange={(e) =>
                setNewProduct({ ...newProduct, unitPrice: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleAddProducts}
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Product"}
            </Button>
          </DialogActions>
        </StyledDialog>

        {/* Product Details Dialog */}
        <StyledDialog open={openDetailDialog} onClose={handleCloseDetailDialog}>
          <StyledDialogTitle>Product Details</StyledDialogTitle>
          <DialogContent>
            {selectedProduct && (
              <>
                <StyledDialogContentText>
                  <b>ID:</b> {selectedProduct.id}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Product Name:</b> {selectedProduct.productName}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Description:</b> {selectedProduct.description}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Unit:</b> {selectedProduct.unit}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Price:</b> {selectedProduct.unitPrice}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Status:</b>{" "}
                  {selectedProduct.isActive === "1" ? "Active" : "Inactive"}
                </StyledDialogContentText>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </StyledDialog>
      </div>
    </DrawerNavigation>
  );
};

export default ProductsPage;