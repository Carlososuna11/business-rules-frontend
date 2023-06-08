export * from './project';
import type { JSONSchema7 } from 'json-schema';

export type alertColor =
  | 'form'
  | 'gray'
  | 'red'
  | 'yellow'
  | 'green'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'blue'
  | 'light'
  | 'dark'
  | 'default'
  | 'dropdown'
  | 'navbar'
  | 'navbarUl'
  | 'primary'
  | 'none'
  | undefined;

export type Alert = {
  message: string;
  color: alertColor;
  visible: boolean;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
};

/* Object Domain */

export type fieldTypes =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null';

export type baseValueField = {
  objectName?: string;
  displayName?: string;
  type: fieldTypes;
  description?: string;
};

export type FieldSchema = {
  objectName: string;
  required?: boolean;
  schema: JSONSchema7;
};
