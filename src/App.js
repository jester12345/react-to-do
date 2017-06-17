import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      items: [
        // Start with some defaults:
        {id: 1, text: 'Make a new ToDo item'},
        {id: 2, text: 'Test deleting items'}
      ]
    };
  }

  render() {
    const items = this._getItems();

    return (
      <main className="App">
        <section className="App-header">
          <i className="fa fa-check-square-o" aria-hidden="true"></i>
          <h2>Arthur's ToDo App</h2>
        </section>

        <section className="App-add-form">
          <form className="form-group form-group-lg" onSubmit={this._addItem.bind(this)}>
            <label htmlFor="add_todo" className="control-label form-control-static add-label">New Item:</label>
            <div>
              <input
                type="text"
                className="form-control input-lg"
                id="add_todo"
                placeholder="new todo item"
                ref={(input) => this._newItem = input}
              />
            </div>
            <input className="btn btn-primary btn-lg add-button" type="submit" value="add" />
          </form>
        </section>

        <section className="App-items">
          <h2>ToDo Items:</h2>
          <ul>
            {items}
          </ul>
        </section>
      </main>
    );
  }

  _addItem(event) {
    event.preventDefault();

    const newItem = {
        id: this.state.items.length + 1,
        text: this._newItem.value
    };

    // Don't add blank items
    if( this._newItem.value.length ) {
      this.setState({items: this.state.items.concat([newItem])});

      // Clear out the old value
      this._newItem.value = '';
    }
  }

  _deleteItem(id) {
    const items = this.state.items.filter(
      item => item.id !== id
    );
    
    this.setState({ items });
  }

  _getItems() {
    return this.state.items.map((item) => {
        return (
            <ToDoItem key={item.id} id={item.id} text={item.text} onDelete={this._deleteItem.bind(this)} />
        );
    });
  }
}

class ToDoItem extends Component {
  render() {
    return(
      <li>
        {this.props.text}
        <button type="button" className="btn btn-link" onClick={this._deleteItem.bind(this)}>
          <i className="fa fa-trash remove" aria-hidden="true" title="Remove item"></i>
        </button>
      </li>
    );
  }

  _deleteItem() {
    this.props.onDelete(this.props.id);
  }
}

export default App;
