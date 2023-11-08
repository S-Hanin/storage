import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles';

const PanelPaper = styled(Paper)(({ theme }) => ({
    overflow: 'clip',
    flexGrow: 1,
    alignSelf: 'stretch',
    marginTop: theme.spacing(1),
    // padding: theme.spacing(1),
}));

const PdfViewer = ({ url }) => {
    return (
        <PanelPaper elevation={4}>
            <object data={url + '#view=Fit'} type="application/pdf" width="100%" height="100%">
                <param name='navpanes' value='0' />
            </object>
        </PanelPaper>
    )
}

PdfViewer.propTypes = {
    url: PropTypes.string
}

export default PdfViewer