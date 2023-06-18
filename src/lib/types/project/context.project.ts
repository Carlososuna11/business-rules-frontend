import type { JSONSchema7 } from 'json-schema';

export type Schema = {
  title: string;
  type: string;
  properties: {
    data: JSONSchema7;
    extra: JSONSchema7;
  };
  required: string[];
};

export type SetContextDto = {
  context: JSONSchema7 | Schema;
};
