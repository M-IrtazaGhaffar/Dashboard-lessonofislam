import React, { useEffect, useMemo, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useNavigate } from "react-router-dom";
import Goback from "../components/Goback";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { logout } from "../reducers/Reducers";

function Edit() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state?.data;
  const n = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [editorData, setEditorData] = useState("");
  const [Loading, setLoading] = useState(0);
  const [Error, setError] = useState(0);
  const [Title, setTitle] = useState("");
  const [Descr, setDescr] = useState("");
  const [Img, setImg] = useState("");
  const [SelectedTag, setSelectedTag] = useState([]);

  const fetchBlog = async () => {
    try {
      setLoading(1);
      const res = await axios.post(
        `https://api-lessonofislam.ittidevelops.com/writer/fetchBlog`,
        {
          token: token,
          id: data,
        }
      );
      setTitle(await res.data.data.Title);
      setDescr(await res.data.data.Descr);
      setEditorData(await res.data.data.Detail);
      setSelectedTag(res.data.data.tid);
      setImg(await res.data.data.Image);
      setLoading(0);
    } catch (error) {
      console.log(error);
      alert("Some Error Ocurred");
      setError(1);
    }
  };

  const UploadData = async (e) => {
    e.preventDefault();

    setLoading(1);

    try {
      // const res = await axios.post('https://api-lessonofislam.ittidevelops.com/writer/editBlog', {
      //   token: token,
      //   title: Title,
      //   id: data,
      //   image: img,
      //   descr: Descr,
      //   detail: editorData,
      //   tid: Number(SelectedTag)
      // })
      const res = await axios.post("http://localhost:5000/writer/editBlog", {
        token: token,
        id: data,
        title: Title,
        descr: Descr,
        detail: editorData,
      });
      alert(await res.data.data);
      setDescr("");
      setTitle("");
      setEditorData("");
      setSelectedTag("");
      n("/dashboard/");
    } catch (error) {
      console.log(error);
      setError(1);
      let err = error.response.status || 500;
      if (err === 401) {
        alert(error.response.data.message);
        dispatch(logout());
      } else alert("Some Error Occured");
      return;
    }
    setLoading(0);
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="create">
      <Goback />
      <div className="route">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-list-nested"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        <h3>Edit</h3>
      </div>
      {Error ? (
        <p className="error">Some Error Occured</p>
      ) : Loading ? (
        <Loader />
      ) : (
        <div>
          {data ? (
            <form onSubmit={UploadData}>
              <div>
                <p>Blog ID #{location.state.data}</p>
                <p>Publish Date #10-09-2023</p>
              </div>
              <div>
                <label htmlFor="title">Title</label>
                <textarea
                  rows={5}
                  name="title"
                  value={Title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={250}
                  required
                ></textarea>
                <p className="length">{`${Title.length}/250`}</p>
              </div>
              <span>
                <label htmlFor="description">Description</label>
                <textarea
                  rows={10}
                  name="description"
                  value={Descr}
                  onChange={(e) => setDescr(e.target.value)}
                  maxLength={250}
                  required
                ></textarea>
                <p className="length">{`${Descr.length}/250`}</p>
              </span>
              <p style={{ color: "red" }}>
                Sorry! But we don't allow to change the tags and Images
              </p>
              <span>
                <p>Uploaded Image</p>
                <img src={Img} alt="image" width={500} />
              </span>
              <span>
                <p>Start writing from here</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={editorData}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                  }}
                  onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                  }}
                />
                <p className="length">{`${editorData.length}`}</p>
              </span>
              <button className="btn" type="submit">
                Upload
              </button>
            </form>
          ) : (
            <p>No data to show right now!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Edit;
