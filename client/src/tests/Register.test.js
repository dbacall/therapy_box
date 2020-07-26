import React from 'react';
import { shallow } from 'enzyme';
import Register from '../components/Register';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Register />);
});

describe('Register component', () => {
  it('renders the title', () => {
    expect(wrapper.find('.login-title').text()).toBe('Hackathon');
  });

  it('changes the username text when input changed', () => {
    // wrapper.find('#username').simulate('change', {
    //   target: { value: 'dbacall' },
    // });
    wrapper.setState({ username: 'dbacall' });
    console.log(wrapper.state());
    expect(wrapper.find('#username').prop('value')).toBe('dbacall');
  });
});
