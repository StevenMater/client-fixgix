import { makeVar } from '@apollo/client';

//Var
export const groupIdVar = makeVar('');

export const isEditorVar = makeVar(true);

export const newGigVar = makeVar(false);

export const openGigVar = makeVar(false);

export const openGigIdVar = makeVar('');

//Date
export const today = new Date();

export const date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
