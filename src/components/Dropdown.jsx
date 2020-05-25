import React, { Component } from 'react'
import MenuIcon from '../assets/icons/menu.svg'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  handleButtonClick = () => {
    this.setState(state => ({
      open: !state.open
    }))
  }

  closeDropdown = () => {
    this.setState({
      open: false
    })
  }

  // componentDidMount () {
  //   document.addEventListener('mousedown', this.closeDropdown)
  // }

  // componentWillUnmount () {
  //   document.removeEventListener('mousedown', this.closeDropdown)
  // }

  render () {
    const { open } = this.state
    return (
      <div
        className="dropdown"
        {...this.props}
      >
        <div
          className="dropdown-container"
        >
          <button
            type="button"
            className="dropdown-button"
            onClick={this.handleButtonClick}
          >
            <img
              src={MenuIcon}
              alt="menu"
            />
          </button>
          {
            open &&
            (
              <div
                className="dropdown-menu"
              >
                <ul
                  className="dropdown-menu-list"
                >
                  {this.props.children && this.props.children.map((el, i) => (
                    <li
                      key={i}
                      className="dropdown-menu-item"
                    >
                      {el}
                    </li>
                  ))}
                </ul>
              </div>
            ) 
          }
        </div>
      </div>
    )
  }
}

export default Dropdown