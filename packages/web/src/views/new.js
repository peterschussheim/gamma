import React from 'react'

import { graphql } from 'react-apollo'
import { Formik, Form, Field, FieldArray } from 'formik'

import { CREATE_GIST } from '../queries'

import MonacoEditor from '../components/MonacoEditor'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import OldFileList from '../components/SidebarList'
import Icon from '../components/icon'
import { GistInputsContainer, TextInput } from '../components/Form/inputs'
import {
  DefaultButton,
  GreenButton,
  UserBtnsContainer
} from '../components/buttons'

import { Debug } from '../components/Form/formDebugger'

class NewGist extends React.Component {
  state = {
    description: '',
    files: [{ filename: '', content: '' }],
    activeFile: 0 || this.setActiveFile
  }
  setActiveFile = event => {
    // get file index
    let index = 0
    this.setState({ activeFile: this.state.files[index] })
  }
  // handleFileContentChange = content => {
  //   this.setState({ files[activeFile].filename: this.state.files[index].content })
  // }
  handleAddAdditionalFile = () => {
    // this.setState({ content })
  }
  render() {
    const { mutate } = this.props
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            description: 'test gist',
            files: [
              { filename: 'index.js', content: `console.log('hello world')` }
            ]
          }}
          onSubmit={(values, actions) => {
            mutate({ variables: values }).then(
              () => {
                actions.setSubmitting(false)
                this.props.history.push('/')
              },
              error => {
                actions.setSubmitting(false)
                const errors = error.graphQLErrors.map(e => e.message)
                actions.setErrors({
                  description: '',
                  files: [{ filename: '', content: '' }],
                  form: errors
                })
              }
            )
          }}
          render={({ values, errors, handleBlur, handleChange, touched }) => (
            <Form>
              <Skeleton
                sidebar={
                  <OldFileList
                    gist={values}
                    activeFile={0}
                    // handleLoadSelectedFile={this.setActiveFile}
                    {...this.props}
                  />
                }
                editor={<div>editor</div>}
              />
              <Footer
                currentFile={values.files[0].filename}
                iconComponent={
                  <Icon height={17} name={values.files[0].filename} />
                }
              />
              <TextInput
                id="description"
                type="description"
                placeholder="Gist description..."
                error={touched.description && errors.description}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                data-cy="description-input"
              />
              <GistInputsContainer>
                <FieldArray name="files">
                  {({ push, remove }) => (
                    <React.Fragment>
                      {values.files &&
                        values.files.length > 0 &&
                        values.files.map((file, index) => (
                          <React.Fragment key={file.filename}>
                            <Field name={`files[${index}].filename`}>
                              {({ field, form }) => (
                                <input
                                  onChange={handleChange}
                                  type="text"
                                  placeholder="Filename including extension..."
                                  {...field}
                                />
                              )}
                            </Field>
                            <DefaultButton
                              type="button"
                              onClick={() =>
                                push({ filename: '', content: '' })
                              }
                              className="secondary"
                            >
                              Add File
                            </DefaultButton>
                            <DefaultButton
                              type="button"
                              onClick={() => remove(index)}
                              className="secondary"
                            >
                              Delete File
                            </DefaultButton>
                          </React.Fragment>
                        ))}
                    </React.Fragment>
                  )}
                </FieldArray>
              </GistInputsContainer>
              <UserBtnsContainer>
                <GreenButton>Create Secret Gist</GreenButton>
                <DefaultButton>Create Public Gist</DefaultButton>
              </UserBtnsContainer>
              <Debug />
            </Form>
          )}
        />
      </React.Fragment>
    )
  }
}

export default graphql(CREATE_GIST)(NewGist)
