import axios from "axios";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const DisplayUser = () => {
  const users = useLoaderData();
  const [updatedUser, setUpdatedUser] = useState(users);

  const handleDelete = (id) => {
    console.log(id);

    /*   fetch(`https://express-mongodb-crud-server.vercel.app/users/${id}`,{
        method: 'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        if(data.deletedCount){
            alert("user deleted successfully")
        }
        const filteredUsers = updatedUser.filter(item =>item._id !== id)
        setUpdatedUser(filteredUsers)
    }) */
    axios
      .delete(`https://express-mongodb-crud-server.vercel.app/users/${id}`)
      .then((response) => {
        console.log("Delete request successful:", response.data);

        if (response.data.deletedCount) {
          alert("user deleted successfully");
        }
        const filteredUsers = updatedUser.filter((item) => item._id !== id);
        setUpdatedUser(filteredUsers);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  return (
    <div>
      <h2>User : {updatedUser.length}</h2>
      {updatedUser.map((user) => (
        <div key={user._id}>
          <h1>{user?.name || "demo-name"}</h1>
          <br />
          <button onClick={() => handleDelete(user._id)} type="submit">
            Delete
          </button>
          <br />
          <Link to={`/users/${user._id}`}>
            <button type="">Update</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DisplayUser;
