import React from 'react';
import { TextField, Toggle } from 'material-ui';
import { any, values } from 'ramda';

import { updateBoard } from '../../actionCreators';
import d from '../../dispatcher/AppDispatcher';
import ModalFooter from './ModalFooter';
import { getBoardOptions } from '../../stores/BoardOptionsStore';
import { isntPosIntValidator, updateValues,
  updateValuesWithError, isNilorEmpty  } from '../../utils/helpers';

class RoomOptions extends React.Component {
  constructor(props) {
    super(props);
    const { boardName, boardDesc, userColorsEnabled,
      numResultsShown, numResultsReturn } = getBoardOptions();

    this.state = {
      values: {
        boardName, boardDesc,
        userColorsEnabled, numResultsShown, numResultsReturn,
      },
      errors: {
        boardName: '', boardDesc: '',
        numResultsShown: '', numResultsReturn: '',
      },
    };
  }

  _updateBoardName = ({target: { value } }) => {
    this.setState(updateValues('boardName', value, this.state));
  };

  _updateBoardDesc = ({target: { value } }) => {
    this.setState(updateValues('boardDesc', value, this.state));
  };

  _updateNumResultsShown = ({target: { value } }) => {
    const errMsg = isntPosIntValidator(
      'Number of results requires positive integers', value);
    this.setState(
      updateValuesWithError('numResultsShown', value, errMsg, this.state)
    );
  };

  _updateNumResultsReturn = ({target: { value } }) => {
    const errMsg = isntPosIntValidator(
      'Number of results returned requires positive integers', value);
    this.setState(
      updateValuesWithError('numResultsReturn', value, errMsg, this.state)
    );

  };

  _updateUserColorsEnabled = ({target: { checked }}) => {
    this.setState(updateValues('userColorsEnabled',
                               checked, this.state));
  };

  _onSubmit = () => {
    if (any(isNilorEmpty, values(this.state.errors))) {
      d.dispatch(updateBoard(this.state.values));
    }
    this.props.onSubmit();
  };

  render() {
    return (
      <div className="roomOptions">
        <div className="optionContent">

          <TextField
            fullWidth
            floatingLabelText='Project name'
            value={this.state.values.boardName}
            errorText={this.state.errors.boardName}
            onChange={this._updateBoardName}
            onBlur={this._updateBoardName}
          />

          <TextField
            fullWidth
            multiLine
            rows={2}
            floatingLabelText={"Project description"}
            value={this.state.values.boardDesc}
            errorText={this.state.errors.boardDesc}
            onChange={this._updateBoardDesc}
            onBlur={this._updateBoardDesc}
          />

          <TextField
            fullWidth
            type='number'
            min={0}
            step={1}
            floatingLabelText='Number of results to show *'
            value={this.state.values.numResultsShown}
            errorText={this.state.errors.numResultsShown}
            onChange={this._updateNumResultsShown}
            onBlur={this._updateNumResultsShown}
          />

          <TextField
            fullWidth
            type='number'
            min={0}
            step={1}
            floatingLabelText='Number of results to return *'
            value={this.state.values.numResultsReturn}
            errorText={this.state.errors.numResultsReturn}
            onChange={this._updateNumResultsReturn}
            onBlur={this._updateNumResultsReturn}
          />

          <Toggle
            label='User colors? *'
            toggled={this.state.values.userColorsEnabled}
            onToggle={this._updateUserColorsEnabled}
          />

        </div>

        <ModalFooter
          onSubmit={this._onSubmit}
          buttonText='Apply changes'
        />
      </div>
    );
  }
}

module.exports = RoomOptions;
