import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

const testBlog = {

    "likes": 9,
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "user": {
        "userName": "mikko1243",
        "name": "Mikko Mikkonen",
        "id": "5e9a1791e48aa2461ccd0c99"
    },
    "id": "5e9a199945f54c0dbc122adc"
}

const testUser1 = { 
    "blogs": [],
    "userName": "matti1243",
    "name": "Matti Mattinen",
    "id": "5e9b0850d431254870bb81c7"
}

const testUser2 = {
    "blogs": [],
    "userName": "test",
    "name": "test",
    "id": "5e9b1e0533274538fc6d2469"
}

const mockupdatehandler = jest.fn()
const mockdeletehandler = jest.fn()


test('Correct fields are rendered at start', () => {

    const component = render(<Blog blog={testBlog} updateFunction={mockupdatehandler} deleteFunction={mockdeletehandler} user={testUser1} />)
    
    const div = component.container.querySelector('.closed')

    expect(div).toBeDefined()
    expect(div).toHaveTextContent(testBlog.title)
    expect(div).toHaveTextContent(testBlog.author)
    expect(div).not.toHaveTextContent(testBlog.url)

})

test('Correct fields are rendered after button press', () => {

    const component = render(<Blog blog={testBlog} updateFunction={mockupdatehandler} deleteFunction={mockdeletehandler} user={testUser1} />)
    
    const button = component.getByText('View')
    fireEvent.click(button)


    const div = component.container.querySelector('.open')

    expect(div).toBeDefined()
    expect(div).toHaveTextContent(testBlog.title)
    expect(div).toHaveTextContent(testBlog.author)
    expect(div).toHaveTextContent(testBlog.url)
    expect(div).toHaveTextContent(testBlog.likes)

})


test('Pressing like twice results in two handler calls', () => {

    const component = render(<Blog blog={testBlog} updateFunction={mockupdatehandler} deleteFunction={mockdeletehandler} user={testUser1} />)
    
    const button = component.getByText('View')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockupdatehandler.mock.calls).toHaveLength(2)

})

