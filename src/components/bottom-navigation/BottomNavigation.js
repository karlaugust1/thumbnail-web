import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircle from '@mui/icons-material/AddCircle';
import List from '@mui/icons-material/List';
import { useNavigate, useLocation } from "react-router-dom";

export default function SimpleBottomNavigation(props) {
    // const [value, setValue] = React.useState(0);

    const navigate = useNavigate();

    function navigateTo(path) {
        navigate(path);
    }

    const { pathname } = useLocation();

    return (
        <Box className="footer">
            <BottomNavigation
                showLabels
                value={pathname.includes('list') ? 1 : 0}
            >
                <BottomNavigationAction label="Add" icon={<AddCircle />} onClick={() => navigateTo("/")} />
                <BottomNavigationAction label="List" icon={<List />} onClick={() => navigateTo("/list")} />
            </BottomNavigation>
        </Box>
    );
}