import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useLocation } from 'react-router-dom';
import Goback from '../components/Goback';

function Edit() {
  const [editorData, setEditorData] = useState('');
  const location = useLocation()
  const data = location.state?.data

  return (
    <div className='create'>
      <Goback />
      <div className='route'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-nested" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z" />
        </svg>
        <h3>Edit</h3>
      </div>
      <div>
        {
          data ?
            <form>
              <div>
                <p>Blog ID #{location.state.data}</p>
                <p>Publish Date #10-09-2023</p>
              </div>
              <div>
                <label htmlFor="title">Title</label>
                <textarea rows={5} name='title' required></textarea>
              </div>
              <span>
                <label htmlFor="description">Description</label>
                <textarea rows={10} name='description' required></textarea>
              </span>
              <input type="file" name="image" required />
              <span>
                <p>Start writing from here</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={editorData}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data)
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
              </span>
              <button className='btn'>Upload</button>
            </form>
            :
            <p>No data to show right now!</p>
        }
      </div>
    </div>
  )
}

export default Edit