import './App.css';
import React, { useState, useEffect} from 'react';
import { Container, TextField, Button, List, ListItem, Checkbox, Typography } from '@mui/material';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'; 

Amplify.configure(awsconfig);

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

    const handlingSignOut = () => {
        Amplify.Auth.signOut()
          .then(() => {
            console.log('Signed out successfully');
          })
          .catch (err => console.log('Error signing out: ', err));
    };

  return (
    <Authenticator>
      <Container>
        <Button variant="outlined" color="secondary" onClick={handlingSignOut}>
          handlingSignOut
        </Button>
      <Typography variant="h1">My Bucket List </Typography>
    
      <TextField
        label = "New Item"
        value={newItem}
        onChange={(e) => setNewItems(e.target.value)}
      />

      <Button variant="contained" color='primary' onClick={addItem}>
        Add Item
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
    </Authenticator>
    );
  }
export default App;
