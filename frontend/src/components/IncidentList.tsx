import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIncidentForm from "./EditIncidentForm";

export interface Incident {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
}

interface Props {
  onCreateNew: () => void;
}

const IncidentList: React.FC<Props> = ({ onCreateNew }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = () => {
    axios
      .get("http://localhost:8080/incidents")
      .then((res) => setIncidents(res.data))
      .catch((err) => console.error("Error fetching incidents:", err));
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/incidents/${id}`);
      setIncidents(incidents.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Failed to delete incident:", err);
    }
  };

  const handleUpdate = (updated: Incident) => {
    setIncidents(incidents.map((i) => (i.id === updated.id ? updated : i)));
    setEditingIncident(null);
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
        className="list-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Incident List</h2>
        <button
          onClick={onCreateNew}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FFAC1C",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create New Incident
        </button>
      </div>

      {incidents.length === 0 ? (
        <p>No incidents found. Create a new incident to get started.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="incident-card"
              style={{
                backgroundColor: "#f5f5f5",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>{incident.title}</h3>
              <p style={{ margin: "0 0 10px 0", flexGrow: 1 }}>
                {incident.description}
              </p>
              <p
                className="created-at"
                style={{ margin: "0 0 10px 0", color: "#666" }}
              >
                Created at:{" "}
                {new Date(incident.created_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </p>
              <p
                className="meta"
                style={{ margin: "0 0 10px 0", color: "#666" }}
              >
                Category: {incident.category} | Status: {incident.status}
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleDelete(incident.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#ff4444",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingIncident(incident)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingIncident && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <EditIncidentForm
            incident={editingIncident}
            onUpdate={handleUpdate}
            onCancel={() => setEditingIncident(null)}
          />
        </div>
      )}
    </div>
  );
};

export default IncidentList;
