import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blogform from '../components/Blogform'



test('Correct fields are rendered at start', () => {

    const mockaddhandler = jest.fn()
    const component = render(<Blogform addFunction={mockaddhandler}/>)

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, { 
        target: { value: 'Test blog' } 
      })

    fireEvent.change(author, { 
        target: { value: 'Test author' } 
      })

    fireEvent.change(url, { 
        target: { value: 'Test url' } 
      })

    fireEvent.submit(form)


    expect(mockaddhandler.mock.calls[0][0].title).toBe('Test blog')
    expect(mockaddhandler.mock.calls[0][0].author).toBe('Test author')
    expect(mockaddhandler.mock.calls[0][0].url).toBe('Test url')
    



    
})

