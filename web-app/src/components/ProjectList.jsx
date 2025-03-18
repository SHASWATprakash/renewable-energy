import { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects(page);
      setProjects((prev) => [...prev, ...data.outputs]);
    };
    loadProjects();
  }, [page]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow-lg bg-white"
          >
            <h3 className="font-semibold">{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4"
        onClick={() => setPage(page + 1)}
      >
        Load More
      </button>
    </div>
  );
};

export default ProjectList;
