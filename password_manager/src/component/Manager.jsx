import React from "react";
import { useState, useRef, useEffect } from "react";
import { toast } from 'react-toastify';


function Manager() {
  //   const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({
    url: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
     fetch('http://localhost:5000/')
    .then(res=>res.json())
    .then(data=>setPasswordArray(data))
    .catch(()=>console.log('oops, there is an error !!'))   
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const savePassword = () => {
    fetch('http://localhost:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw err; });
      }
      return res.json();
    })
    .then(data => {
          console.log(data)
      setPasswordArray([...passwordArray, data]);
      setform({
        url: "",
        username: "",
        password: "",
      });
      toast.success('Password saved successfully!');
    })
    .catch(err => {
      if (err.error) {
        toast.error(err.error);
      } else {
        toast.error('Oops! Something went wrong.');
      }
    });
  };

  const editData = (id)=>{
     setEditingId(id)
    setform(passwordArray.filter(item => item._id === id)[0])
    setPasswordArray(passwordArray.filter(item => item._id !== id))

  }
  const updateData=()=>{
   
    fetch(`http://localhost:5000/${editingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
        body: JSON.stringify(form)
   })
   .then(res=>res.json())
   .then(data => {
    console.log(data)
      setPasswordArray([...passwordArray, data]);
      setform({
        url: "",
        username: "",
        password: "",
      });
      toast.success('Data Updated succesfully !!');
    })
    .catch(err => {
      if (err.error) {
        toast.error(err.error);
      } else {
        toast.error('Oops! Something went wrong.');
      }
    });
  }  

  const deleteData = (id) => {
    console.log(id)
    fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            setPasswordArray(passwordArray.filter(item => item._id !== id));
            toast.success('Data deleted successfully!');
        } else {
            toast.error('Failed to delete data');
        }
    })
    .catch(err => {
      if (err.error) {
        toast.error(err.error);
      } else {
        toast.error('Oops! Something went wrong.');
      }    });

  };
  return (
    <div className="flex justify-center">
      <div className=" w-4/5 p-3 md:mycontainer min-h-[88.2vh] ">
        <h1 className="text-4xl text font-bold text-center">
          Store Your Password !!
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.url}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="url"
            id="url"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
             
            </div>
          </div>
          <button
            onClick={editingId?updateData:savePassword}
            className="flex justify-center items-center gap-2  border-white text-white font-bold my-3 bg-green-950 hover:bg-green-300 rounded-full px-8 py-2 w-fit border  "
          >
            {editingId?'Update':'Save'}
          </button>
        </div>
        <div className="passwords">
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-950 text-white">
                <tr>
                  <th>URL</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {passwordArray.map((item) => {
                return (
                  <tbody>
                    <tr>
                      <td
                        className="
                       w-32 p-3 bg-green-100"
                      >
                        <div className="flex justify-center gap-2">
                          <a href={`https://${item.url}.com`} target="_blank">
                            {item.url}
                          </a>

                          <div>
                            <img
                              className="w-5 h-5"
                              src="/src/icons/copy-svgrepo-com.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className="
                text-center w-32 p-3 bg-green-100"
                      >
                        <div className="flex justify-center gap-2">
                          <span>{item.username}</span>

                          <div>
                            <img
                              className="w-5 h-5"
                              src="/src/icons/copy-svgrepo-com.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className="
                text-center w-32 p-3 bg-green-100"
                      >
                        <div className="flex justify-center gap-2">
                          <span >{'●'.repeat(4)}</span>

                          <div>
                            <img
                              className="w-5 h-5"
                              src="/src/icons/copy-svgrepo-com.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td
                        className="
                text-center w-32 p-3 bg-green-100"
                      >
                        <div className="flex gap-3 justify-center">
                          
                            <span onClick={()=>{editData(item._id)}}>
                            <img
                              className="w-5 h-5"
                              src="/src/icons/edit-svgrepo-com.svg"
                              alt=""
                            />
                            </span>
                          
                          <span
                            onClick={() => {
                              deleteData(item._id)
                            }}
                          >
                            <img
                              className="w-5 h-5"
                              src="/src/icons/delete-2-svgrepo-com.svg"
                              alt=""
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );

}
export default Manager;
