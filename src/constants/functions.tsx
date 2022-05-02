export const statusColorPicker = (gigStatus: string) => {
  let color: string;

  switch (gigStatus) {
    case 'requested': {
      color = '#eee83C';
      break;
    }
    case 'offered': {
      color = '#fd7520';
      break;
    }
    case 'confirmed': {
      color = '#51AC0C';
      break;
    }
    case 'cancelled': {
      color = '#f21313';
      break;
    }
    case 'afterSale': {
      color = '#b9d6f2';
      break;
    }
    default: {
      color = 'black';
    }
  }

  return color;
};
