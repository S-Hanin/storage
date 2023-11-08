import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { panelItems } from './LeftPanel/PanelItems';

const MainAppBar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar variant="dense" color="secondary">
                <Stack>
                    {panelItems.map((item) => (
                        <Button
                            variant='text'
                            size='small'
                            color='inherit'
                            key={item.id}
                            startIcon={item.icon}
                            onClick={() => navigate(item.path)}>
                            {item.title}
                        </Button>
                    ))}
                </Stack>
                <Typography variant="h6" color="inherit" component="span" marginLeft='auto'>
                    СМК Документы
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default MainAppBar;