    import { NavLink, useLocation } from 'react-router-dom';
    import { AppBar, Toolbar, Button, Box } from '@mui/material';

    export function Header() {
          const location = useLocation();
          const privatePaths = ['/profile', '/assessment', '/history'];
          if (!privatePaths.includes(location.pathname)) {
            return null;
}

    return (
        <AppBar position="static">
        <Toolbar>
            <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={NavLink} to="/profile">
            Личный кабинет
            </Button>
            <Button color="inherit" component={NavLink} to="/assessment">
            Оценка повреждений
            </Button>
            <Button color="inherit" component={NavLink} to="/history">
            История оценок
            </Button>
            </Box>
        </Toolbar>
        </AppBar>
    );
    }