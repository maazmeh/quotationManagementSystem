import React, { useEffect, useState, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import DrawerNavigation from './DrawerNavigation';
import { useAuth } from './Auth/AuthContext';
import { getAllEmployees } from '../providers/http';
import { useNavigate } from 'react-router-dom';

const TableContainerStyled = styled(TableContainer)<{ component: typeof Paper }>({
  margin: '20px 0',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const TableHeaderCell = styled(TableCell)({
  backgroundColor: '#3f51b5',
  color: '#fff',
  fontWeight: 'bold',
});

const TableCellStyled = styled(TableCell)({
  color: '#000', // Ensures the text is black
});

const StyledButton = styled(Button)({
  marginBottom: '20px',
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

const StyledDialog = styled(Dialog)({
  '& .MuiPaper-root': {
    padding: '20px',
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: '#3f51b5',
  color: '#fff',
  padding: '10px 20px',
});

const StyledDialogContentText = styled(DialogContentText)({
  marginBottom: '10px',
});

const StyledTextField = styled(TextField)({
  marginTop: '10px',
  marginBottom: '10px',
});

const QuotationsList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [newClient, setNewClient] = useState({ id: 0, name: '', contact: '' });
  const [loading, setLoading] = useState(false); // State for loading data
  const [openDetailDialog, setOpenDetailDialog] = useState(false); // State for detail dialog
  const [selectedClient, setSelectedClient] = useState<any>(null); // State for selected client

  const fetchData = useCallback(() => {
    setLoading(true); // Set loading state to true
    getAllEmployees(user?.companyId)
      .then((resp: any) => {
        console.log("getAllClients resp =>", resp.data.data);
        setClients(resp.data.data);
        setLoading(false); // Set loading state to false
      })
      .catch((err: any) => {
        console.log("err =>", err);
        setLoading(false); // Set loading state to false
      });
  }, [user?.companyId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClickOpen = () => {
    navigate('/input');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClient = () => {
    setClients([...clients, { ...newClient, id: clients.length + 1 }]);
    setNewClient({ id: 0, name: '', contact: '' });
    handleClose();
  };

  const handleViewDetails = (client: any) => {
    setSelectedClient(client);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setSelectedClient(null);
    setOpenDetailDialog(false);
  };

  return (
    <DrawerNavigation>
      <div>
        <Typography variant="h5" style={{ marginBottom: '20px', color: '#3f51b5', fontWeight: 'bold' }}>
          Quotations
        </Typography>
        <StyledButton variant="contained" onClick={handleClickOpen}>
          Add New Quotation
        </StyledButton>
      
          {/* <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box> */}
       
        <StyledDialog open={open} onClose={handleClose}>
          <StyledDialogTitle>Add New Client</StyledDialogTitle>
          <DialogContent>
            <StyledDialogContentText>
              Please enter the details of the new client.
            </StyledDialogContentText>
            <StyledTextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
            <StyledTextField
              margin="dense"
              label="Contact"
              type="text"
              fullWidth
              value={newClient.contact}
              onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddClient} color="primary">
              Add
            </Button>
          </DialogActions>
        </StyledDialog>

        {/* Client Details Dialog */}
        <StyledDialog open={openDetailDialog} onClose={handleCloseDetailDialog}>
          <StyledDialogTitle>Client Details</StyledDialogTitle>
          <DialogContent>
            {selectedClient && (
              <>
                <StyledDialogContentText>
                  <b>First Name:</b> {selectedClient.firstName}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Last Name:</b> {selectedClient.lastName}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Company:</b> {selectedClient.company}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Phone:</b> {selectedClient.phone}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Email Address:</b> {selectedClient.email}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>User Role:</b> {selectedClient.role}
                </StyledDialogContentText>
                <StyledDialogContentText>
                  <b>Status:</b> {selectedClient.isActive === '1' ? 'Active' : 'Inactive'}
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

export default QuotationsList;