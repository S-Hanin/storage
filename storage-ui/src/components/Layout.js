import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import MainAppBar from "./MainAppBar"
import styled from 'styled-components'

const ContentBox = styled(Box)(() => ({
    display: 'flex',
    height: '100%'
}));

const ContentView = styled(Box)(() => ({
    display: 'flex',
    flexGrow: 1,
    alignItems: 'stretch',
    marginTop: '48px',
}));

const Layout = () => {

    return (
        <>
            <ContentBox>
                <MainAppBar />
                <ContentView>
                    <Outlet />
                </ContentView>
            </ContentBox>
        </>
    )
}

export default Layout