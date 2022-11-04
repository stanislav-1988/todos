/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import './task.css';

export default class OneTask extends React.Component {
  state = {
    date: 'less than 5 seconds ago',
  };

  taskCreationTimeUpdate = () => {
    const { timeСreation } = this.props;
    this.setState(() => {
      const taim = `${formatDistanceToNow(timeСreation, {
        includeSeconds: true,
      })}`;
      return { date: taim };
    });
  };

  render() {
    const { lab, delEl, completedTask, editingTaskBut } = this.props;
    setInterval(this.taskCreationTimeUpdate, 5000);
    const { date } = this.state;
    return (
      <div className="view">
        <input onChange={completedTask} className="toggle" type="checkbox" />
        <label>
          <span className="description ">{lab}</span>
          <span className="created">{`Created ${date}`}</span>
        </label>
        <button type="button" onClick={editingTaskBut} className="icon icon-edit" />
        <button type="button" onClick={delEl} className="icon icon-destroy" />
      </div>
    );
  }
}

OneTask.defaultProps = {
  delEl: () => {},
  completedTask: () => {},
  editingTaskBut: () => {},
};

OneTask.propTypes = {
  delEl: PropTypes.func,
  completedTask: PropTypes.func,
  editingTaskBut: PropTypes.func,
};
