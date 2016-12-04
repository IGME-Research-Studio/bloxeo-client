import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class ErrorSnackbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Snackbar
          bodyStyle={{ backgroundColor: '#FFFFFF' }}
          contentStyle={{ color: '#F06E7F' }}
          open={this.props.open}
          message={this.props.error}
          autoHideDuration={4000}
          onRequestClose={this.props.close}
        />
      </div>
    );
  }
}
