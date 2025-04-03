import axios from "axios";

const API_URL = "https://developer.nrel.gov/api/solar/solar_resource/v1.json";
const API_KEY = "UrgPEfW3aOYcUa4f9HCz82T0nakAiqQcDPU6DIqs";
const CACHE_KEY = "projects_cache";

export const fetchProjects = async () => {
  const cache = localStorage.getItem(CACHE_KEY);

  if (cache) {
    console.log("Using cached data...");
    return JSON.parse(cache);
  }

  try {
    const response = await axios.get(`${API_URL}?api_key=${API_KEY}&lat=40.7128&lon=-74.0060`);
    localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
    console.log("Fetched new data from API...", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
