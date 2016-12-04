import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class ErrorSnackbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

    return (
      <div class='error-snackbar'>
        <Snackbar
          bodyStyle={{ backgroundColor: '#FFFFFF', color: '#F06E7F' }}
          open={this.props.open}
          message={this.props.error}
          autoHideDuration={4000}
          onRequestClose={this.props.close}
        />
      </div>
    );
  }
}
