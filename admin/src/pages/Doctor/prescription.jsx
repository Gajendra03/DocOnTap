// AddPrescription.jsx
import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from 'react-toastify'

const backendurl = import.meta.env.VITE_BACKEND_URL;

const AddPrescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientDisease, setPatientDisease] = useState("");
  const [editorHtml, setEditorHtml] = useState('<div><b>1. </b></div>');

  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false });
  const editorRef = useRef(null);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  useEffect(() => {
    const appointment = appointments.find((a) => a._id === id);
    if (appointment) {
      setPatientName(appointment.userData?.name || "");
      setPatientAge(appointment.userData?.age || 0);
      
    }
  }, [appointments, id]);

  // Prevent cursor jump issue
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorHtml;
    }
  }, []);

  // Executes commands like bold, italic, lists, etc.
  const exec = (command, param = null) => {
    if (command === "createLink" && !param) {
      const url = prompt("Enter URL");
      if (!url) return;
      document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, param);
    }
    setEditorHtml(editorRef.current.innerHTML);
    updateActiveFormats();
  };

  // Tracks whether bold/italic are active
  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
    });
  };

  // Keep track of selection changes to update toolbar state
  useEffect(() => {
    const handler = () => updateActiveFormats();
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editorHtml.trim()) {
      alert("Prescription content is empty.");
      return;
    }
    try {
      toast.success("Prescription sent successfully!");
      navigate("/doctor-appointments");
      await axios.post(
        `${backendurl}/api/doctor/add-prescription`,
        {
          appointmentId: id,
          patientAge,
          patientDisease,
          prescriptioncontents: editorHtml,
        },
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );


    } catch (err) {
      console.error(err);
      toast.error("Failed to send prescription.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 mt-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-[#42839b] mb-4">
        Create Prescription Content
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Patient Info */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[180px]">
            <label className="block font-semibold mb-1 text-sm">Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block font-semibold mb-1 text-sm">Age</label>
            <input
              type="text"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block font-semibold mb-1 text-sm">Disease</label>
            <input
              type="text"
              value={patientDisease}
              onChange={(e) => setPatientDisease(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-2 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => exec("bold")}
            className={`border px-2 py-1 rounded ${activeFormats.bold ? "bg-black text-white" : ""}`}
          >
            <b>B</b>
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            className={`border px-2 py-1 rounded ${activeFormats.italic ? "bg-black text-white" : ""}`}
          >
            <i>I</i>
          </button>
          <button type="button" onClick={() => exec("insertUnorderedList")} className="border px-2 py-1 rounded">
            • List
          </button>
          <button type="button" onClick={() => exec("insertOrderedList")} className="border px-2 py-1 rounded">
            1. List
          </button>
          <button type="button" onClick={() => exec("createLink")} className="border px-2 py-1 rounded">
            Link
          </button>
          <button type="button" onClick={() => exec("undo")} className="border px-2 py-1 rounded">
            Undo
          </button>
          <button type="button" onClick={() => exec("redo")} className="border px-2 py-1 rounded">
            Redo
          </button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          className="border border-gray-300 rounded p-3 min-h-[200px] mb-2"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => setEditorHtml(e.currentTarget.innerHTML)}
        ></div>

        {/* Preview */}
        <label className="block font-semibold mb-1 text-sm">Preview (rendered HTML)</label>
        <div
          className="bg-gray-50 border border-gray-300 rounded p-3 mb-4 max-h-[200px] overflow-auto"
          dangerouslySetInnerHTML={{ __html: editorHtml }}
        ></div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setEditorHtml(editorRef.current.innerHTML)}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Update Preview
          </button>
          <button type="submit" className="bg-[#42839b] text-white px-4 py-2 rounded">
            Submit Prescription
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPrescription;