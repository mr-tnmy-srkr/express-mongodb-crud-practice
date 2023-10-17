import axios from 'axios';

const PostUser = () => {
  const handlePostUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // const myData = {name:name,email:email,password:password};
    const myData = { name, email, password };
    console.log(myData);

    /* fetch("http://localhost:5000/users",{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData), 
    })
    .then(res=>res.json())
    .then(data=>{
    console.log(data);
    })
    */

 /*    
 try {
   const response = await fetch ("http://localhost:5000/users",{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData), 
    }) 
    const result = await response.json();
    console.log(result);
    if(result.acknowledged){
    alert('user added successfully')}
     } catch (error) {
    console.error(error);
    } */

 try {
      const response = await axios.post("http://localhost:5000/users", myData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(response.data);
      if(response.data.acknowledged){
        alert('user added successfully')}
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <div>
      <h1 className="text-purple-500">User :</h1>
      <form onSubmit={handlePostUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="password" name="password" id="" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default PostUser;
