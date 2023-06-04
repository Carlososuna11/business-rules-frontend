export * from './project';

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
