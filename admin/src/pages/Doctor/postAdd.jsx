import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from "axios";

const AddCommunityPost = () => {
  const {backendUrl } = useContext(AppContext)
  const getFormattedDateTime = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yy = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${dd}-${mm}-${yy} ${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    docName: "",
    createdTime: getFormattedDateTime(),
    image: "",
    contents: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      

      const res = await axios.post(`${backendUrl}/api/community/posts-to-add`, data, {
  headers: {
    "Content-Type": "multipart/form-data", // since you're likely sending FormData
  },
});

      if (res.data.success === true) {
        setStatus("✅ Post created successfully!");
        setFormData({
          docName: "",
          createdTime: getFormattedDateTime(),
          image: "",
          contents: "",
        });
      } else {
        setStatus(res.message);
      }
    } catch (err) {
      setStatus("❌ Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-screen bg-gradient-to-br p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Create Community Post
        </h2>

        {status && (
          <p
            className={`text-center mb-4 ${
              status.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Doctor Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              name="docName"
              value={formData.docName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter doctor's name"
            />
          </div>

          {/* Created Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Created Time
            </label>
            <input
              type="text"
              name="createdTime"
              value={formData.createdTime}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-600"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image (optional)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50"
            />
          </div>

          {/* Contents */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contents
            </label>
            <textarea
              name="contents"
              value={formData.contents}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Write your post content..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCommunityPost;