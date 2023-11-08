import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

const PanelPaper = styled(Paper)(({ theme }) => ({
    overflow: 'hidden',
    width: 300,
    flexShrink: 0,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
}));

const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
}));

const StyledTableCell = styled(TableCell)(() => ({
    fontSize: '9pt',
    borderRight: "1px solid rgba(224, 224, 224, 1)",
    '&:last-child': {
        borderRight: 0,
    },
}));

const DocumentPropertiesPanel = ({ document }) => {
    return (
        <PanelPaper elevation={4}>
            <Table size='small'>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Параметр</StyledTableCell>
                        <StyledTableCell>Значение</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow key={1}>
                        <StyledTableCell>Наименование</StyledTableCell>
                        <StyledTableCell>{document.name}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={2}>
                        <StyledTableCell>Описание</StyledTableCell>
                        <StyledTableCell>{document.description}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={3}>
                        <StyledTableCell>Автор</StyledTableCell>
                        <StyledTableCell>{document.createdBy}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow key={4}>
                        <StyledTableCell>Дата создания</StyledTableCell>
                        <StyledTableCell>{new Date(document.createdAt).toLocaleString()}</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </PanelPaper>
    )
}

DocumentPropertiesPanel.propTypes = {
    document: PropTypes.object
}

export default DocumentPropertiesPanel