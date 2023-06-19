import { env } from '$env/dynamic/public';
import type {
  Project,
  ProjectDto,
  DiagramDto,
  ImportProjectDto,
  ErrorResponse,
  SetContextDto,
  CommandInfo,
  Engine,
} from '../types';
import axios, { AxiosError } from 'axios';
import { alertStore } from '../stores';
import type { JSONSchema7 } from 'json-schema';

const BACKEND_URL = env.PUBLIC_BACKEND_BASE_URL;

const baseService = async (
  path: string,
  method: string,
  header: object = {},
  params: object = {},
  body?: object
) => {
  const url = `${BACKEND_URL}${path}`;
  try {
    const response = await axios({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...header,
      },
      params,
      data: body,
    });
    return response;
  } catch (error) {
    let message = 'Ups! Hubo un error. Revisa la consola para más detalles.';
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorResponse = axiosError.response.data as ErrorResponse;
        message = errorResponse.message;
      }
    } else {
      message = String(error);
    }
    alertStore.set({
      message: message,
      color: 'red',
      visible: true,
    });
    console.error(`Error Calling the API`, message);
    console.error(error);
    throw error;
  }
};

const getProjects = async (
  page = 1,
  limit = 10,
  search?: string,
  sort?: string
) => {
  const params = {
    page,
    limit,
    search,
    sort,
  };
  const response = await baseService(`/api/projects`, 'GET', {}, params);
  return response.data;
};

const getProject = async (uuid: string): Promise<Project> => {
  const response = await baseService(`/api/projects/${uuid}`, 'GET');
  return response.data;
};

const createProject = async (body: ProjectDto): Promise<Project> => {
  const response = await baseService(`/api/projects`, 'POST', {}, {}, body);
  return await response.data;
};

const updateProject = async (
  uuid: string,
  body: ProjectDto
): Promise<Project> => {
  const response = await baseService(
    `/api/projects/${uuid}`,
    'PATCH',
    {},
    {},
    body
  );
  return await response.data;
};

const deleteProject = async (uuid: string): Promise<void> => {
  const response = await baseService(`/api/projects/${uuid}`, 'DELETE');
  return await response.data;
};

const getDiagram = async (uuid: string): Promise<DiagramDto> => {
  const response = await baseService(`/api/projects/${uuid}/diagram`, 'GET');
  return await response.data;
};

const importProject = async (body: ImportProjectDto): Promise<Project> => {
  const response = await baseService(
    `/api/projects/upload`,
    'POST',
    { 'Content-Type': 'multipart/form-data' },
    {},
    body
  );
  return await response.data;
};

const getContext = async (uuid: string): Promise<JSONSchema7> => {
  const response = await baseService(`/api/projects/${uuid}/context`, 'GET');
  return await response.data;
};

const setContext = async (
  uuid: string,
  body: SetContextDto
): Promise<JSONSchema7> => {
  const response = await baseService(
    `/api/projects/${uuid}/context`,
    'POST',
    {},
    {},
    body
  );
  return await response.data;
};

const getCommands = async (): Promise<CommandInfo[]> => {
  const response = await baseService(`/api/engine/commands`, 'GET');
  return await response.data;
};

const getEngine = async (uuid: string): Promise<Engine> => {
  const response = await baseService(`/api/projects/${uuid}/engine`, 'GET');
  return await response.data;
};

const setEngine = async (uuid: string, body: Engine): Promise<Engine> => {
  const response = await baseService(
    `/api/projects/${uuid}/engine`,
    'POST',
    {},
    {},
    body
  );
  return await response.data;
};

const getDomains = async (page = 1, limit = 10) => {
  const params = {
    page,
    limit,
  };
  const response = await baseService(`/api/contexts`, 'GET', {}, params);
  return response.data;
};

const engineToDiagram = async (engine: Engine): Promise<DiagramDto> => {
  const response = await baseService(
    `/api/engine/to-diagram`,
    'POST',
    {},
    {},
    engine
  );
  return await response.data;
};

export const api = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getDiagram,
  importProject,
  getContext,
  setContext,
  getCommands,
  getEngine,
  setEngine,
  getDomains,
  engineToDiagram,
};
