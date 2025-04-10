import React, { useState } from "react";
import axios from "axios";
import { Incident } from "./IncidentList";

interface Props {
  incident: Incident;
  onUpdate: (incident: Incident) => void;
  onCancel: () => void;
}

const EditIncidentForm: React.FC<Props> = ({
  incident,
  onUpdate,
  onCancel,
}) => {
  const [updatedIncident, setUpdatedIncident] = useState({ ...incident });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdatedIncident((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/incidents/${incident.id}`,
        updatedIncident
      );
      onUpdate(res.data);
    } catch (err) {
      console.error("Failed to update incident:", err);
    }
  };

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
    padding: "5px",
    borderRadius: "5px",
    width: "100%",
    boxSizing: "border-box" as const,
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="incident-card"
      style={{
        backgroundColor: "#f5f5f5",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
        width: "600px",
      }}
    >
      <h4 style={{ margin: "0 0 15px 0" }}>Edit Incident</h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <div>
          <input
            name="title"
            value={updatedIncident.title}
            onChange={handleChange}
            placeholder="Title"
            required
            style={inputStyle}
          />
        </div>
        <div>
          <select
            name="category"
            value={updatedIncident.category}
            onChange={handleChange}
            required
            style={{ ...inputStyle, appearance: "menulist" }}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Safety">Safety</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <textarea
            name="description"
            value={updatedIncident.description}
            onChange={handleChange}
            placeholder="Description"
            required
            style={{
              ...inputStyle,
              height: "100px",
              resize: "vertical",
              verticalAlign: "top",
              textAlign: "left",
            }}
          />
        </div>
        <div>
          <select
            name="status"
            value={updatedIncident.status}
            onChange={handleChange}
            required
            style={{ ...inputStyle, appearance: "menulist" }}
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Success">Success</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >
        <button
          type="submit"
          style={{
            padding: "5px 10px",
            backgroundColor: "#FFAC1C",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "5px 10px",
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditIncidentForm;
