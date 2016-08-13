import {
  indigo600, indigo700,
  grey600,
  pink100, pink400, pink500,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default getMuiTheme({
  fontFamily: 'Lato, sans-serif',
  palette: {
    primary1Color: indigo600,
    primary2Color: indigo700,
    primary3Color: grey600,
    accent1Color: pink500,
    accent2Color: pink400,
    accent3Color: pink100,
  },
});
