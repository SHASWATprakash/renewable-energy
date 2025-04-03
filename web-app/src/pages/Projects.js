import React, { useEffect, useState } from "react";
import { fetchProjects } from "../services/apiService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(Object.entries(data.outputs || {})); // Convert object to array
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading)
    return <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center font-bold">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Solar Resource Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3 text-left">Parameter</th>
              <th className="border p-3 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(([key, value], index) => (
              <tr
                key={key}
                className={`border p-4 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="border p-3 font-medium">{key}</td>
                <td className="border p-3">{JSON.stringify(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
