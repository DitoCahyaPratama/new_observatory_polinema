import React, { Component } from 'react'
import { Form, Button, Upload, Icon } from 'antd';

class AddImageThumbnail extends Component {
  handleSubmit = () => {

  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form pt-4">
        <div class="form-group">
          <Form.Item label="File">
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </div>
        <Button type="primary" icon="plus" > Add to Thumbnail</Button>
      </Form>
    )
  }
}

export default AddImageThumbnail