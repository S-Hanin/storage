import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const PanelPaper = styled(Paper)(({ theme }) => ({
    overflow: 'auto',
    width: 200,
    flexShrink: 0,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
}));

const Panel = ({ subheader, items, onItemClick }) => {
    let [selectedIndex, setSelectedIndex] = useState(-1);

    const handleItemClick = (item, idx) => {
        onItemClick(item.name);
        setSelectedIndex(idx);
    }

    return (
        <PanelPaper elevation={4}>
            <List>
                <ListSubheader component="div">{subheader}</ListSubheader>
                <Divider />
                {items &&
                    items.map((item, idx) => (
                        <div key={item.id}>
                            <ListItem disablePadding dense>
                                <ListItemButton onClick={() => handleItemClick(item, idx)}>
                                    <ListItemIcon>{selectedIndex == idx ? <InsertDriveFileIcon /> : <InsertDriveFileOutlinedIcon />}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </div>
                    ))
                }
            </List>
        </PanelPaper>
    )
}

Panel.propTypes = {
    subheader: PropTypes.string,
    items: PropTypes.array,
    onItemClick: PropTypes.func
}

export default Panel