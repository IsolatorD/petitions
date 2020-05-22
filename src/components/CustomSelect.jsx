import React, { Component } from 'react'

import Text from './Text'

class CustomSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultSelect: {
        name: '',
        id: 0,
        icon: ''
      },
      showOptionList: false,
      optionsList: []
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside)
    this.setState({
      defaultSelectText: this.props.defaultSelect
    })
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  handleClickOutside = e => {
    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      this.setState({
        showOptionList: false
      })
    }
  }

  handleListDisplay = () => {
    this.setState(prevState => {
      return {
        showOptionList: !prevState.showOptionList
      }
    })
  }

  handleOptionClick = e => {
    this.setState({
      defaultSelect: {
        name: e.target.getAttribute("data-name"),
        id: e.target.getAttribute("data-id"),
        icon: e.target.getAttribute("data-icon")
      },
      showOptionList: false
    })
    this.props.onChangeCategory({
      name: e.target.getAttribute('data-name'),
      id: e.target.getAttribute('data-id'),
      icon: e.target.getAttribute('data-icon')
    })
  }

  render() {
    const { optionsList } = this.props
    const { showOptionList, defaultSelect } = this.state
    return (
      <div className="custom-select-container">
        <div
          className={showOptionList ? "selected-text active" : "selected-text"}
          onClick={this.handleListDisplay}
        >
          <img
            src={defaultSelect.icon}
            style={{
              width: `${1.5}rem`,
              marginRight: `${2}rem`
            }}
          />
          <Text
            className='default-text'
            style={{
              color: '#fff',
              textTransform: 'uppercase',
              fontSize: `${.8}rem`,
              fontWeight: 'bolder',
              paddingTop: `${.4}rem`
            }}
          >
            {defaultSelect.name}
          </Text>
        </div>
        {showOptionList && (
          <ul className="select-options select-list">
            {optionsList.map(option => {
              return (
                <li
                  className="custom-select-option select-item"
                  data-name={option.name}
                  data-id={option.id}
                  data-icon={option.icon}
                  key={option.id}
                  onClick={this.handleOptionClick}
                >
                  <img
                    src={option.icon}
                    alt="img"
                    style={{
                      width: `${1.5}rem`,
                      marginRight: `${2}rem`
                    }}
                  />
                  <Text
                    className='default-text'
                    style={{
                      color: 'black',
                      textTransform: 'uppercase',
                      fontSize: `${.8}rem`,
                      fontWeight: 'bolder',
                      paddingTop: `${.4}rem`
                    }}
                  >
                    {option.name}
                  </Text>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
}

export default CustomSelect