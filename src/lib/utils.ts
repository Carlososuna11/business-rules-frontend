import { encode } from 'plantuml-encoder';
import type { JSONSchema7 } from 'json-schema';
import type { Schema, Property, CommandTypesOptions, Engine } from './types';
import { api } from './services/api.services';
import { alertStore } from './stores';
export const replaceStateWithQuery = (
  values: Record<string, string | undefined | null>
) => {
  const url = new URL(window.location.toString());
  for (const [k, v] of Object.entries(values)) {
    if (v) {
      url.searchParams.set(k, v);
    } else {
      url.searchParams.delete(k);
    }
  }
  history.replaceState(history.state, '', url);
};

interface SearchParams {
  [key: string]: string;
}

export const getUrlSearchParams = (): SearchParams => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {} as SearchParams;

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};

type JsonSchema = {
  [key: string]: unknown;
};

function jsonToPlantUML(
  jsonSchema: JsonSchema,
  className: string,
  parents: string[] = []
): string {
  const schema = jsonSchema as JSONSchema7;
  let properties = '';
  let objects = '';
  let relationships = '';

  for (const key in schema) {
    const value = schema[key as keyof typeof schema];

    if (typeof value === 'object' && !Array.isArray(value)) {
      const nestedClassName = `${className}_${key}`;
      objects += `${key}: [object Object]\n`;
      relationships += `${className} -- ${nestedClassName}\n`;
      const nestedUML = jsonToPlantUML(value as JsonSchema, nestedClassName, [
        ...parents,
        className,
      ]);
      relationships += nestedUML;
    } else if (Array.isArray(value)) {
      objects += `${key}: [Array]\n`;
      value.forEach((item, index) => {
        if (typeof item === 'object' && !Array.isArray(item)) {
          const nestedClassName = `${key}[${index}]`;
          relationships += `${className}.${key} -- ${nestedClassName}\n`;
          const nestedUML = jsonToPlantUML(
            item as JsonSchema,
            nestedClassName,
            [...parents, className, key]
          );
          relationships += nestedUML;
        }
      });
    } else {
      properties += `${key}: ${value}\n`;
    }
  }

  const classUML =
    `class "${className}" as ${className} {\n` +
    (properties ? '.. Properties ..\n' + properties : '') +
    (objects ? '.. Objects ..\n' + objects : '') +
    '}\n';

  return classUML + relationships;
}

export function jsonSchemaToPlantUML(jsonSchema: JSONSchema7 | Schema) {
  return (
    '@startuml\n<style>\nclass {\nPadding 5\nRoundCorner 30\n}\n</style>\nleft to right direction\nscale 4000 width\n' +
    jsonToPlantUML(jsonSchema as JsonSchema, 'root') +
    '@enduml'
  );
}

export function encodeDiagram(diagram: string) {
  return encode(diagram);
}

export function getUrlDiagram(diagram: string) {
  return `${'https://www.plantuml.com/plantuml/png/'}${encodeDiagram(diagram)}`;
}

export function extractProperties(
  schema: JSONSchema7,
  prefixName = '',
  prefix = ''
): Property[] {
  const properties: Property[] = [];

  for (const key in schema.properties) {
    const property = schema.properties[key] as JSONSchema7;
    const title = property.title || key;
    const propertyName = prefixName ? `${prefixName} ➞ ${title}` : title;
    const propertyValue = prefix ? `${prefix}.${key}` : key;

    properties.push({
      name: propertyName,
      value: propertyValue,
      type: property.type as CommandTypesOptions,
    });
    if (property.type === 'object') {
      properties.push(
        ...extractProperties(property, propertyName, propertyValue)
      );
    }
  }

  return properties;
}

export async function engineToDiagram(engine: Engine) {
  try {
    const response = await api.engineToDiagram(engine);
    return getUrlDiagram(response.diagram);
  } catch (error) {
    alertStore.set({
      message: '',
      color: 'red',
      visible: false,
    });
    return '';
  }
}
