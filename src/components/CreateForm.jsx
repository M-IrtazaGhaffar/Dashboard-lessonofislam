import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { logout } from "../reducers/Reducers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const dispatch = useDispatch();
  const n = useNavigate();
  const { uid, token } = useSelector((state) => state.auth);

  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Tag, setTag] = useState([]);
  const [SelectedTag, setSelectedTag] = useState(0);
  const [Img, setImg] = useState("");
  const [editorData, setEditorData] = useState("");
  const [Loading, setLoading] = useState(0);
  const [Error, setError] = useState(0);

  const fetchTags = async () => {
    setLoading(1);
    try {
      const res = await axios.post(
        "https://api-lessonofislam.ittidevelops.com/writer/fetchalltags",
        {
          token: token,
        }
      );
      setTag(await res.data.data);
    } catch (error) {
      setError(1);
      let err = error.response.status || 500;
      if (err === 401) {
        alert(error.response.data.message);
        dispatch(logout());
      } else alert("Some Error Occured");
    }
    setLoading(0);
  };

  const UploadImg = async () => {
    // const upload_preset = 'cpockz0g'
    // const cloud = 'dibebrlfw'
    // try {
    //     const file = Img;
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('upload_preset', upload_preset)
    //     const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, formData)
    //     return await res.data.url
    // } catch (error) {
    //     setError(1)
    //     alert('Some Error Occured')
    //     return false;
    // }

    // let base64Image = Buffer.from(Img, "binary").toString("base64");
    // console.log(base64Image);
    // return base64Image

    const name = Img.name;
    console.log(name);

    if (
      name.includes(".jpeg") ||
      name.includes(".png") ||
      name.includes(".jpg")
    ) {
    } else {
      alert(
        "Please select again! The selected file is not an Image of provided type."
      );
      return;
    }
  };

  const UploadData = async (e) => {
    e.preventDefault();

    setLoading(1);

    if (Img == "") {
      alert("Please select Image again!");
      setLoading(0);
      return;
    }

    console.log({
      token: token,
      uid: uid,
      title: Title,
      image: Img,
      descr: Desc,
      detail: editorData,
      tid: SelectedTag,
    });

    try {
      const res = await axios.post(
        "https://api-lessonofislam.ittidevelops.com/writer/createBlog",
        {
          token: token,
          uid: uid,
          title: Title,
          image: Img,
          descr: Desc,
          detail: editorData,
          tid: SelectedTag,
        }
      );
      alert(await res.data.data);
      setDesc("");
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
    fetchTags();
    return () => {
      if (
        Title !== "" ||
        Desc !== "" ||
        editorData !== "" ||
        SelectedTag !== ""
      ) {
        alert("Your data will not be saved!");
      }
    };
  }, []);

  return (
    <div>
      {Error ? (
        <p className="error">Some Error Occured</p>
      ) : Loading ? (
        <Loader />
      ) : (
        <form onSubmit={UploadData}>
          <div>
            <label htmlFor="title">Title</label>
            <textarea
              onChange={(e) => setTitle(e.target.value)}
              rows={5}
              name="title"
              maxLength={250}
              required
            ></textarea>
            <p className="length">{`${Title.length}/250`}</p>
          </div>
          <span>
            <label htmlFor="description">Description</label>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              rows={10}
              name="description"
              maxLength={250}
              required
            ></textarea>
            <p className="length">{`${Desc.length}/250`}</p>
          </span>
          <span>
            <label htmlFor="tag">Please Select a Tag</label>
            <select
              name="tag"
              id="tag"
              onChange={(e) => {
                setSelectedTag(e.target.value);
              }}
              required
            >
              <option value={0}>Select here</option>
              {Tag.map((item, index) => {
                return (
                  <option value={item.ID} key={item.ID}>
                    {item.Keyword}
                  </option>
                );
              })}
            </select>
          </span>
          <input
            type="file"
            name="image"
            onChange={async (e) => {
              const selectedFile = e.target.files[0];
              console.log(selectedFile);
              if (
                selectedFile &&
                (selectedFile.type.includes("jpeg") ||
                  selectedFile.type.includes("png") ||
                  selectedFile.type.includes("jpg"))
              ) {
                // Your code for handling the image
                const base64 = new FileReader();
                // Read the image as a data URL
                base64.readAsDataURL(selectedFile);
                base64.onloadend = () => {
                  // The result contains the base64 representation of the image
                  const base64String = base64.result;
                  setImg(base64String);
                };
              } else {
                alert("Please select a valid image file (JPEG, PNG, or JPG).");
              }
            }}
            required
          />
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
          <button className="btn">Upload</button>
        </form>
      )}
    </div>
  );
}

export default CreateForm;
