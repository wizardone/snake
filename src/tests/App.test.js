import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme'

configure({ adapter: new Adapter() })

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  })

  it('renders the component', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.length).toEqual(1)
  })

  it('has the initial state', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.state()).toEqual(
      expect.objectContaining({
        snake: expect.any(Object),
        apple: expect.any(Object),
        snakeDirection: expect.any(String),
        gameOver: false
      })
    )
  })
})
