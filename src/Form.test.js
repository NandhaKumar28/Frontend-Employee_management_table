import React from 'react'
import {render,fireEvent, queryByTestId,screen} from '@testing-library/react';
import user from '@testing-library/user-event'
import Form from './Form';
import {BrowserRouter} from 'react-router-dom'

test("renders correctly",()=>{    
    render(<BrowserRouter><Form handleSubmit={handleSubmit}/></BrowserRouter>)

    const inputElement = screen.getAllByRole('textbox');
    const button = screen.getAllByRole('button');
    const passwordFields = screen.getAllByRole('textbox',{type:"password"})

    expect(inputElement).toHaveLength(3);
    expect(button).toHaveLength(3)
    expect(passwordFields).toHaveLength(3)

    // const nameInput = screen.getByRole('textbox',{name:/firstname/i})
    // user.click(nameInput)
    // user.keyboard('jane');  

});