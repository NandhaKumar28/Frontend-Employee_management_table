import React from 'react'
import {render,fireEvent, queryByTestId,screen} from '@testing-library/react';
import user from '@testing-library/user-event'
import Table from './Table';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import {fetchData} from './myModule'; 

jest.mock('axios');

test('fetchdata returns expected data',()=>{
    
})

test("It renders table component",()=>{
    const users = [
        {firstName:'Jane',lastName:"Doe",email:'jane@gmail.com',password:"Abcde123",confirmPassword:"Abcde123"},
        {firstName:'John',lastName:"Doe",email:'john@gmail.com',password:"Abcde123",confirmPassword:"Abcde123"}        
    ];

    render(<BrowserRouter><Table users={users}/></BrowserRouter>)

    return{
        users
    }
})