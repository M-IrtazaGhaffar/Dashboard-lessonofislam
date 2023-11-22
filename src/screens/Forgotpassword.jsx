import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Forgotpassword() {
  const { uid, token } = useSelector((state) => state.auth);

  const [Email, setEmail] = useState("");
  const [Loading, setLoading] = useState(0);

  const handleForm = async (e) => {
    setLoading(1);
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api-lessonofislam.ittidevelops.com/writer/changePassword",
        {
          email: Email,
          token: token,
        }
      );
      if (res.status === 200) {
        alert(res.data.data);
        console.log(res);
      }
    } catch (error) {
      if (error.response.status === 401) alert(error.response.data.message);
      else alert("Some Error Occured");
    }
    setLoading(0);
  };
  return (
    <div className="login">
      <h1>Forgot Password</h1>
      <form onSubmit={handleForm}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{Loading ? "Please wait" : "Send Email"}</button>
      </form>
    </div>
  );
}

export default Forgotpassword;
