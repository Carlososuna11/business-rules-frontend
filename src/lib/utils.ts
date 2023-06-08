import { encode } from 'plantuml-encoder';
import type { JSONSchema7 } from 'json-schema';

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

export function jsonSchemaToPlantUML(jsonSchema: JSONSchema7) {
  return (
    '@startuml\n' + jsonToPlantUML(jsonSchema as JsonSchema, 'root') + '@enduml'
  );
}

export function encodeDiagram(diagram: string) {
  return encode(diagram);
}

export function getUrlDiagram(diagram: string) {
  return `${'https://www.plantuml.com/plantuml/png/'}${encodeDiagram(diagram)}`;
}
