import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { logout } from '../reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
    const dispatch = useDispatch();
    const n = useNavigate()
    const { uid, token } = useSelector(state => state.auth)

    const [Title, setTitle] = useState('')
    const [Desc, setDesc] = useState('')
    const [Tag, setTag] = useState([])
    const [SelectedTag, setSelectedTag] = useState(0)
    const [Img, setImg] = useState('')
    const [UpImg, setUpImg] = useState('')
    const [editorData, setEditorData] = useState('');
    const [Loading, setLoading] = useState(0)
    const [Error, setError] = useState(0)

    const fetchTags = async () => {
        setLoading(1)
        try {
            const res = await axios.post('https://api-lessonofislam.ittidevelops.com/writer/fetchalltags', {
                token: token
            })
            setTag(await res.data.data)
        } catch (error) {
            setError(1)
            console.log(error);
            let err = error.response.status || 500
            if (err === 401) {
                alert(error.response.data.message)
                dispatch(logout())
            }
            else alert('Some Error Occured')
        }
        setLoading(0)
    }

    const UploadImg = async () => {
        const upload_preset = 'cpockz0g'
        const cloud = 'dibebrlfw'
        try {
            const file = Img;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', upload_preset)
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, formData)
            const img = await res.data.url
            console.log(img);
            if (img === '') {
                alert('Please Upload again!')
                return false;
            }
            setUpImg(img);
            return true;
        } catch (error) {
            setError(1)
            alert('Some Error Occured')
            return false;
        }
    }

    const UploadData = async (e) => {
        e.preventDefault();

        if (Title === '' || Desc === '' || editorData === '' || Img === '' || SelectedTag === 0) {
            alert('Data not complete!')
            return;
        }

        setLoading(1)

        if (!(await UploadImg())) {
            alert('false')
            return;
        }

        try {
            const res = await axios.post('https://api-lessonofislam.ittidevelops.com/writer/createBlog', {
                token: token,
                uid: uid,
                title: Title,
                image: UpImg,
                descr: Desc,
                detail: editorData,
                tid: Number(SelectedTag)
            })
            alert(await res.data.data)
            setDesc('')
            setTitle('')
            setEditorData('')
            setSelectedTag('')
            setUpImg('')
            n('/dashboard/')
        } catch (error) {
            setError(1)
            console.log(error);
            let err = error.response.status || 500
            if (err === 401) {
                alert(error.response.data.message)
                dispatch(logout())
            }
            else alert('Some Error Occured')
            return;
        }
        setLoading(0)
    }

    useEffect(() => {
        fetchTags()
        return () => {
            if (Title !== '' || Desc !== '' || UpImg !== '' || editorData !== '' || SelectedTag !== '') {
                alert('Your data will not be saved!')
            }
        }
    }, [])


    return (
        <div>
            {
                Error
                    ?
                    <p className='error'>Some Error Occured</p>
                    :
                    Loading
                        ?
                        <Loader />
                        :
                        <form onSubmit={UploadData}>
                            <div>
                                <label htmlFor="title">Title</label>
                                <textarea onChange={(e) => setTitle(e.target.value)} rows={5} name='title' maxLength={250} required></textarea>
                                <p className='length'>{`${Title.length}/250`}</p>
                            </div>
                            <span>
                                <label htmlFor="description">Description</label>
                                <textarea onChange={(e) => setDesc(e.target.value)} rows={10} name='description' maxLength={250} required></textarea>
                                <p className='length'>{`${Desc.length}/250`}</p>
                            </span>
                            <span>
                                <label htmlFor="tag" >Please Select a Tag</label>
                                <select name="tag" id="tag" onChange={(e) => {
                                    setSelectedTag(e.target.value)
                                }}>
                                    <option value={0}>Select here</option>
                                    {
                                        Tag.map((item, index) => {
                                            return <option value={item.ID} key={item.ID}>{item.Keyword}</option>
                                        })
                                    }
                                </select>
                            </span>
                            <input type="file" name="image" onChange={(e) => setImg(e.target.files[0])} required />
                            <span>
                                <p>Start writing from here</p>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={editorData}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        // console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setEditorData(data)
                                    }}
                                    onBlur={(event, editor) => {
                                        // console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        // console.log('Focus.', editor);
                                    }}
                                />
                                <p className='length'>{`${editorData.length}`}</p>
                            </span>
                            <button className='btn'>Upload</button>
                        </form>
            }
        </div>
    )
}

export default CreateForm