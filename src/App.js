import React, { Component } from 'react';
import './App.css';
import ListItem from './Components/ListItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      },
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('items')) {
      var items = JSON.parse(localStorage.getItem('items'));
      this.setState({
        items: items
      })
    }
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    });
  }
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: '',
          key: ''
        }
      })
      localStorage.setItem('items', JSON.stringify(newItems))
    };
  }
  deleteItem(key) {
    const filteredItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filteredItems
    });
    localStorage.setItem('items', JSON.stringify(filteredItems))
  }
  setUpdate(text, key) {
    const items = this.state.items;
    items.forEach(item => { 
      if (item.key === key) {
        item.text = text;
      }
    });
    this.setState({
      items: items
    });
    localStorage.setItem('items', JSON.stringify(items))
  }
  render() {
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input type="text" placeholder="Enter Text"
              value={this.state.currentItem.text}
              onChange={this.handleInput} />
            <button type="submit" >Add</button>
          </form>
        </header>
        <ListItem items={this.state.items}
          deleteItem={this.deleteItem} setUpdate={this.setUpdate} />
      </div>
    );
  }
}

export default App;