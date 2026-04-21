import projectsData from "../../lib/data/projects.json";

export async function load() {
  const { projects, work } = projectsData;

  return {
    projects: projects,
    work: work,
  };
}
