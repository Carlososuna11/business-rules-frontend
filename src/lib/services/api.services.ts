import { env } from '$env/dynamic/public';
import type { Project, ProjectDto, DiagramDto } from '../types';

const BACKEND_URL = env.PUBLIC_BACKEND_BASE_URL;

const baseService = async (
  path: string,
  method: string,
  header: object = {},
  params: object = {},
  body?: object
) => {
  const url = `${BACKEND_URL}${path}`;
  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...header,
    },
    body: JSON.stringify(body),
    ...params,
  });
};

const getProjects = async (
  page = 1,
  limit = 10,
  search?: string,
  sort?: string
) => {
  // ignore search and sort if not provided
  let query = `?page=${page}&limit=${limit}`;
  query += search ? `&search=${search}` : '';
  query += sort ? `&sort=${sort}` : '';
  const response = await baseService(`/api/projects${query}`, 'GET');
  return await response.json();
};

const getProject = async (uuid: string): Promise<Project> => {
  const response = await baseService(`/api/projects/${uuid}`, 'GET');
  return await response.json();
};

const createProject = async (body: ProjectDto): Promise<Project> => {
  const response = await baseService(`/api/projects`, 'POST', {}, {}, body);
  return await response.json();
};

const updateProject = async (
  uuid: string,
  body: ProjectDto
): Promise<Project> => {
  const response = await baseService(
    `/projects/${uuid}`,
    'PATCH',
    {},
    {},
    body
  );
  return await response.json();
};

const deleteProject = async (uuid: string): Promise<void> => {
  const response = await baseService(`/api/projects/${uuid}`, 'DELETE');
  return await response.json();
};

const getDiagram = async (uuid: string): Promise<DiagramDto> => {
  const response = await baseService(`/api/projects/${uuid}/diagram`, 'GET');
  return await response.json();
};

export const api = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getDiagram,
};
