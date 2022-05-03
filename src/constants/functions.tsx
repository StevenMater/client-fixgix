import { afterSale, cancelled, confirmed, offered, requested } from './colors';

export const statusColorPicker = (gigStatus: string) => {
  let color: string;

  switch (gigStatus) {
    case 'requested': {
      color = requested;
      break;
    }
    case 'offered': {
      color = offered;
      break;
    }
    case 'confirmed': {
      color = confirmed;
      break;
    }
    case 'cancelled': {
      color = cancelled;
      break;
    }
    case 'afterSale': {
      color = afterSale;
      break;
    }
    default: {
      color = 'black';
    }
  }

  return color;
};
