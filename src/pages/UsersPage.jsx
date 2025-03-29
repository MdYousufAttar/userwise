
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "axios";

const UsersPage = () => {
  let token = localStorage.getItem("token");
  let [users, setUser] = useState([]);
  let [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", first_name: "", last_name: "", email: "" });

  let navigate = useNavigate();
  useEffect(() => {
    if (!token) { navigate("/"); }
    else {
      fetch(`https://reqres.in/api/users?page=${page}`)
        .then((res) => res.json())
        .then((data) => setUser(data.data))
        .catch((err) => console.log(err));
    }
  }, [navigate, page]);


  const handleEdit = (user) => {
    setFormData(user);
    setShowModal(true);
  };

  const handleUpdate = () => {
    axios.put(`https://reqres.in/api/users/${formData.id}`, formData)
    .then((res) => {
      setUser((prev) =>
        (prev.map((u) => (u.id===formData.id  ? {...u, ...formData}: u))
      ));
      setShowModal(false);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`https://reqres.in/api/users/${id}`).then(() => {
      setUser((prev) => prev.filter((u) => u.id !== id));
    });
  };


  return (
    <div className="bg-cover bg-no-repeat w-full min-h-screen flex justify-center items-center flex-col space-y-4 bg-gray-800
" style={{ backgroundImage: "url('/bg.png')" }}>

      <h1 className="text-4xl font-extrabold uppercase tracking-widest text-gray-500 drop-shadow-md my-6">Users</h1>

      <div className="grid grid-cols-1 gap-4 text-center mx-5 md:grid-cols-2 lg:grid-cols-3">

        {users.map((user) => (
          <div className="rounded-2xl shadow-md p-6 bg-black text-white flex items-center gap-4" key={user.id}>

            <img src={user.avatar} alt="###" className="w-[80%] rounded-full" />

            <div className="flex flex-col space-y-2">

              <div className="flex text-base flex-col">
                <p className="text-base font-medium tracking-wider">{user.first_name} {user.last_name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="flex gap-2 justify-center items-center tracking-wider">
                <button className="px-3 py-1 text-base bg-gray-700 rounded-md hover:bg-gray-600 transition" onClick={() => handleEdit(user)}>Edit</button>
                <button className="px-3 py-1 text-base bg-gray-700 rounded-md hover:bg-gray-600 transition" onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-2 text-white">
        <button
          onClick={() => setPage(1)}
          className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-500 " : "bg-black"}`}>1</button>
        <button
          onClick={() => setPage(2)}
          className={`px-4 py-2 rounded ${page === 2 ? "bg-gray-500 " : "bg-black"}`}>2</button>
      </div>

      {/* Modal Popup */}
      {showModal && (<Modal
        formData={formData}
        setFormData={setFormData}
        onClose={() => setShowModal(false)}
        onUpdate={handleUpdate}
      />)}


    </div>
  );
}
export default UsersPage;

