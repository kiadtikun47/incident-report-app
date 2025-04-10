import "./App.css";
import React, { useState } from "react";
import CreateIncidentForm from "./components/CreateIncidentForm";
import IncidentList from "./components/IncidentList";
import { Incident } from "./components/IncidentList";

function App() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [currentView, setCurrentView] = useState<"create" | "list">("create");

  const handleCreateIncident = (incident: Incident) => {
    setIncidents([...incidents, incident]);
    setCurrentView("list");
  };

  const handleViewIncidents = () => {
    setCurrentView("list");
  };

  const handleCreateNew = () => {
    setCurrentView("create");
  };

  return (
    <div className="App">
      <h1>Incident Reporting System</h1>

      {currentView === "create" ? (
        <CreateIncidentForm
          onCreate={handleCreateIncident}
          onViewIncidents={handleViewIncidents}
        />
      ) : (
        <IncidentList onCreateNew={handleCreateNew} />
      )}
    </div>
  );
}

export default App;
