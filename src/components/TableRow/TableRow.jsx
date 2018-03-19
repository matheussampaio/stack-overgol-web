import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import TableCell from '../TableCell'

class TableRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: props.user
    }
  }

  componentDidMount() {
    this.save = debounce(() => {
      console.log('saving', JSON.stringify(this.state.user))
    }, 5000)
  }

  onInputChange(field, newValue) {
    this.state.user[field] = newValue

    this.save()
  }

  render() {
    return (
      <tr key={this.props.user.uid}>
        <TableCell onChange={newValue => this.onInputChange('first_name', newValue)} value={this.props.user.first_name} />
        <TableCell onChange={newValue => this.onInputChange('last_name', newValue)} value={this.props.user.last_name} />
        <TableCell onChange={newValue => this.onInputChange('rating', newValue)} type="number" value={this.props.user.rating} />
        <TableCell onChange={newValue => this.onInputChange('is_subscriber', newValue)} type="checkbox" value={this.props.user.is_subscriber} />
        <TableCell onChange={newValue => this.onInputChange('is_admin', newValue)} type="checkbox" value={this.props.user.is_admin} />
      </tr>
    )
  }
}

TableRow.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    is_subscriber: PropTypes.bool,
    is_admin: PropTypes.bool
  })
}

TableRow.defaultProps = {
  is_admin: false,
  is_admin: false,
  rating: 3
}

export default TableRow
