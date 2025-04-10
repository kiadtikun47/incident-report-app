import React, { useState } from "react";
import axios from "axios";
import { Incident } from "./IncidentList";

interface Props {
  onCreate: (incident: Incident) => void;
  onViewIncidents: () => void;
}

const CreateIncidentForm: React.FC<Props> = ({ onCreate, onViewIncidents }) => {
  const [incident, setIncident] = useState({
    title: "",
    description: "",
    category: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setIncident((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/incidents", incident);
      onCreate(res.data);
      setIncident({ title: "", description: "", category: "", status: "" });
    } catch (err) {
      console.error("Failed to create incident:", err);
    }
  };

  const inputStyle = {
    backgroundColor: "white",
    color: "black",
    padding: "5px",
    borderRadius: "5px",
    width: "100%",
    boxSizing: "border-box" as const,
    marginBottom: "10px",
  };

  return (
    <div
      className="incident-list"
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        className="form-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="incident-card"
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>Create Incident</h3>
        <input
          name="title"
          value={incident.title}
          onChange={handleChange}
          placeholder="Title"
          required
          style={inputStyle}
        />
        <select
          name="category"
          value={incident.category}
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
        <select
          name="status"
          value={incident.status}
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
        <textarea
          name="description"
          value={incident.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={{
            ...inputStyle,
            height: "100px",
            resize: "vertical",
            verticalAlign: "top",
            textAlign: "left",
            fontFamily: "inherit",
            fontSize: "inherit",
          }}
        />
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
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
            Create
          </button>
        </div>
      </form>
      <button
        onClick={onViewIncidents}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "50px",
        }}
      >
        View Incidents
      </button>
    </div>
  );
};

export default CreateIncidentForm;
