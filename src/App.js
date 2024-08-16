import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import { Container, TextField, Button, List, ListItem, Checkbox } from '@mui/material';

function App() {
    const [items, setItems] = useState([]); 
    const [newItem, setNewItems] = useState(''); 

    useEffect(() => {
      const savedItems = JSON.parse(localStorage.getItem('bucketListItems')) || [];
      setItems(savedItems);
    }, []); 

    const addItem = () => {
      if(newItem.trim()){
        const updatedItems = [...items, { text: newItem, completed: false}];
        setItems(updatedItems);
        setNewItems('');
        localStorage.setItem('bucketListItems', JSON.stringify(updatedItems));
      }
    };

    const toggleComplete = (index) => {
      const updatedItems = items.map((item, i) => 
        i === index ? {...item, completed: !item.completed} : item 
    );
      setItems(updatedItems); 
      localStorage.setItem('buckeListItems', JSON.stringify(updatedItems));
    };

  return (
    <Container>
      <h1>My Bucket List</h1>
      <TextField
        label = "New Item"
        value={newItem}
        onChange={(e) => setNewItems(e.target.value)}
      />

      <Button variant="contained" color='primary' onClick={addItem}>
        addItem
      </Button>

      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <Checkbox
              checked={item.completed}
              onChange={() => toggleComplete(index)}
              />
              {item.text}
          </ListItem>
        ))}
      </List>
      </Container>
    );
  }

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
//   );
// }

export default App;
