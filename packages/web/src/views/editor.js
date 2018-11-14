import React from 'react'
import { compose, graphql } from 'react-apollo'
import { Formik, Form } from 'formik'

import CustomSelect from '../components/form/select'
import { Input, TextArea } from '../components/form/inputs'
import { Debug } from '../components/form/formDebugger'

class Editor extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const { title, content, tags, visibility } = e.target.elements
    const newPost = {
      visibility: visibility.value,
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim())
    }
    this.props.api.posts.create(newPost).then(() => {
      this.props.history.push('/')
    })
  }
  render() {
    return (
      <Formik
        initialValues={{
          visibility: 'PUBLIC',
          content: {
            name: '',
            data: ''
          }
        }}
        onSubmit={this.handleSubmit}
        render={({
          values,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleSubmit,
          handleReset,
          setFieldValue,
          setFieldTouched
        }) => (
          <Form>
            <label style={{ justifySelf: 'right' }} htmlFor="title-input">
              Title
            </label>
            <Input id="title-input" placeholder="Title" name="title" />
            <label
              style={{ justifySelf: 'right', alignSelf: 'baseline' }}
              htmlFor="content-input"
            >
              Content
            </label>
            <TextArea id="content-input" placeholder="Content" name="content" />
            <label style={{ justifySelf: 'right' }} htmlFor="tags-input">
              Tags
            </label>
            <Input id="tags-input" placeholder="tags" name="tags" />
            <CustomSelect
              value={values.visibility}
              onChange={setFieldValue}
              error={errors.visibility}
              onBlur={setFieldTouched}
            />
            <button
              type="submit"
              className="secondary"
              data-cy="submit-post"
              disabled={!dirty || isSubmitting}
            >
              Update
            </button>
            <button
              type="reset"
              className="secondary"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Reset
            </button>
            <Debug />
          </Form>
        )}
      />
    )
  }
}

export default Editor
