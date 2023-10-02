import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CreateForm() {
    const [editorData, setEditorData] = useState('');
    return (
        <div>
            <form>
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
        </div>
    )
}

export default CreateForm