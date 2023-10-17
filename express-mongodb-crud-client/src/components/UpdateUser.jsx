import axios from "axios";
import { useLoaderData } from "react-router-dom";

const UpdateUser = () => {
  const singleData = useLoaderData();
  // console.log(singleData);

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    // console.log(form);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    // console.log(name,email,password);
    const updateData = { name, email, password };

    /* fetch(`https://express-mongodb-crud-server.vercel.app/users/${singleData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      }); */

    axios
      .put(
        `https://express-mongodb-crud-server.vercel.app/users/${singleData._id}`,
        updateData
      )
      .then((response) => {
        console.log("PUT request successful:", response.data);
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  };

  return (
    <div>
      <h1>Updated : </h1>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={singleData?.name} id="" />
        <br />
        <input
          type="email"
          name="email"
          defaultValue={singleData?.email}
          id=""
        />
        <br />
        <input
          type="password"
          name="password"
          defaultValue={singleData.password}
          id=""
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
