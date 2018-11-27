import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'PUBLIC', label: 'Public' },
  { value: 'PRIVATE', label: 'Private' }
]

class CustomSelect extends React.Component {
  handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange('options', value)
  }

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur('options', true)
  }

  render() {
    return (
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="visibility">Visibility </label>
        <Select
          id="visibility"
          options={options}
          multi={false}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error && this.props.touched && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>
            {this.props.error}
          </div>
        )}
      </div>
    )
  }
}

export default CustomSelect
