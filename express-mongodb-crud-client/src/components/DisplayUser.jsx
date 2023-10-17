import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const DisplayUser = () => {
const users = useLoaderData(); 
const [updatedUser, setUpdatedUser] = useState(users)

const handleDelete = (id)=>{
    console.log(id);

    fetch(`http://localhost:5000/users/${id}`,{
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
    })
}

    return (
        <div>
            <h2>User : {updatedUser.length}</h2>
            {
                updatedUser.map((user) =>(<div key={user._id}><h1>{user?.name || "demo-name"}</h1>
                <br />
                <button onClick={()=>handleDelete(user._id)} type="submit">Delete</button></div>))
               
            }
        </div>
    );
};

export default DisplayUser;