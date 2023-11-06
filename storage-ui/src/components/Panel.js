import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const PanelPaper = styled(Paper)(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'auto',
    flexShrink: 0,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
}));

const Panel = ({ subheader, items, onItemClick, width }) => {
    let [selectedIndex, setSelectedIndex] = useState(-1);

    const handleItemClick = (item, idx) => {
        onItemClick(item.name);
        setSelectedIndex(idx);
    }

    return (
        <PanelPaper sx={{ width }} elevation={4}>
            <List>
                <ListSubheader component="div">{subheader}</ListSubheader>
                <Divider />
                {items &&
                    items.map((item, idx) => (
                        <div key={item.id}>
                            <ListItem disablePadding dense sx={{ overflowX: 'hidden' }}>
                                <ListItemButton sx={{ paddingLeft: '4px' }} onClick={() => handleItemClick(item, idx)}>
                                    <ListItemIcon sx={{ minWidth: 0, marginRight: '4px' }}>{selectedIndex == idx ? <InsertDriveFileIcon /> : <InsertDriveFileOutlinedIcon />}</ListItemIcon>
                                    <ListItemText primary={item.name}
                                        primaryTypographyProps={{
                                            style: {
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                fontSize: '9pt'
                                            }
                                        }}
                                            />
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
    onItemClick: PropTypes.func,
    width: PropTypes.number
}

export default Panel