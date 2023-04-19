import React from 'react'
import {render,fireEvent, queryByTestId,screen} from '@testing-library/react';
import user from '@testing-library/user-event'
import TableRow from './Tablerow';
import {BrowserRouter} from 'react-router-dom'

test("It renders table row",()=>{
    render(<BrowserRouter><TableRow/></BrowserRouter>)
})