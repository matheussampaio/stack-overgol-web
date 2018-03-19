import React from 'react'
import PropTypes from 'prop-types'

class TableCell extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      oldValue: this.props.value,
      newValue: this.props.value
    }
  }

  handleChange(newValue) {
    this.setState({ newValue })
    this.props.onChange(newValue)
  }

  renderCheckbox() {
    return (
      <td>
        <input
          type="checkbox"
          checked={!!this.state.newValue}
          onChange={() => this.handleChange(!this.state.newValue)}
          onClick={() => this.handleChange(!this.state.newValue)}
          />
      </td>
    )
  }

  renderNumber() {
    return (
      <td>
        <input
          type="number"
          step="0.01"
          value={this.state.newValue}
          onChange={event => this.handleChange(event.target.value)}
          />
      </td>
    )
  }

  renderText() {
    return (
      <td>
        <input
          type="text"
          value={this.state.newValue}
          onChange={event => this.handleChange(event.target.value)}
          />
      </td>
    )
  }

  render() {
    if (this.props.type === 'checkbox') {
      return this.renderCheckbox()
    }

    if (this.props.type === 'number') {
      return this.renderNumber()
    }

    return this.renderText()
  }
}

TableCell.propTypes = {
  type: PropTypes.oneOf(['text', 'checkbox', 'number']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  onChange: PropTypes.func.isRequired
}

TableCell.defaultProps = {
  type: 'text'
}

export default TableCell
