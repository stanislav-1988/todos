import React from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class InputPanel extends React.Component {
  state = {
    lab: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { addTaskOfForm } = this.props;
    const { lab } = this.state;
    if (lab === '') {
      addTaskOfForm('Создайте задачу');
    } else {
      addTaskOfForm(lab);
    }
    this.setState({
      lab: '',
    });
  };

  inputValue = (e) => {
    this.setState({
      lab: e.target.value,
    });
  };

  render() {
    const { lab } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.inputValue} className="new-todo" placeholder="Добавить задачу" value={lab} />
        </form>
      </header>
    );
  }
}

InputPanel.defaultProps = {
  addTaskOfForm: () => {},
};

InputPanel.propTypes = {
  addTaskOfForm: PropTypes.func,
};
