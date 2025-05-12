import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Divider,
  Collapse,
  Avatar,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Input as InputIcon,
  Store as StoreIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  Warehouse as WarehouseIcon,
  AttachMoney as DiscountIcon,
  Assessment as ReportIcon,
  AccountBalance as TaxIcon,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: 'linear-gradient(90deg, #D4AF37 0%, #B8860B 100%)', // Golden gradient
}));

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

const DrawerContainer = styled('div')({
  overflow: 'auto',
});

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const ToolbarSpacer = styled('div')(({ theme }) => theme.mixins.toolbar);

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
  color: 'white',
});

const StyledListItemText = styled(ListItemText)({
  '& span': {
    fontWeight: 'bold',
  },
});

const Logo = styled('img')({
  height: '40px',
  marginRight: '10px',
  backgroundColor: 'black',
  borderRadius: 12,
  padding: '5px',
});

interface DrawerNavigationProps {
  children: React.ReactNode;
}

const DrawerNavigation: React.FC<DrawerNavigationProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [expandOptions, setExpandOptions] = React.useState({
    categories: false,
    warehouse: false,
    discounts: false,
    reports: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleExpand = (option: keyof typeof expandOptions) => {
    setExpandOptions({
      ...expandOptions,
      [option]: !expandOptions[option],
    });
  };

  return (
    <Root>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Logo
            src="https://qms.dotnetiks.com/assets/QuotifyLogo1.png"
            alt="Quotify Logo"
          />
          <StyledTypography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Quotify
          </StyledTypography>
          <button
            onClick={handleLogout}
            style={{ color: 'white', border: 'none', background: 'none', marginLeft: '10px' }}>
            Logout
          </button>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="persistent" anchor="left" open={open}>
        <ToolbarSpacer />
        <Divider />
        <DrawerContainer>
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <StyledListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/users">
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <StyledListItemText primary="Employees" />
            </ListItem>
            <ListItem button component={Link} to="/clients">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <StyledListItemText primary="Clients" />
            </ListItem>
            <ListItem button component={Link} to="/products">
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <StyledListItemText primary="Products" />
            </ListItem>
            <ListItem button component={Link} to="/quotationsList">
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <StyledListItemText primary="Quotations" />
            </ListItem>
            <ListItem button onClick={() => handleExpand('categories')}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <StyledListItemText primary="Settings" />
              {expandOptions.categories ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandOptions.categories} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/categories" sx={{ pl: 4 }}>
                  <StyledListItemText primary="Warehouse" />
                </ListItem>
                <ListItem button component={Link} to="/sub-categories" sx={{ pl: 4 }}>
                  <StyledListItemText primary="Taxes" />
                </ListItem>
                <ListItem button component={Link} to="/sub-categories" sx={{ pl: 4 }}>
                  <StyledListItemText primary="Discounts" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => handleExpand('reports')}>
              <ListItemIcon>
                <ReportIcon />
              </ListItemIcon>
              <StyledListItemText primary="Reports" />
              {expandOptions.reports ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expandOptions.reports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={Link} to="/reports" sx={{ pl: 4 }}>
                  <StyledListItemText primary="Reports" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </DrawerContainer>
      </DrawerStyled>
      <Content>
        <ToolbarSpacer />
        {children}
      </Content>
    </Root>
  );
};

export default DrawerNavigation;