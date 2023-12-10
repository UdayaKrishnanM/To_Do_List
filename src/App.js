import Header from './Header'
import Content from './Content';
import AddItem from './AddItem';
import Footer from './Footer';
import { useState } from 'react';
import './index.css'
import SearchItem from './SearchItem';


function App() {
  
  // const [items, setItems] = useState([
  //   {
  //       id: 1,
  //       checked: true,
  //       item: "One half pound bag of Coca Covered"
  //   },
  //   {
  //       id: 2,
  //       checked: false,
  //       item: "Item 2"
  //   },
  //   {
  //       id: 3,
  //       checked: false,
  //       item: "Item 3"
  //   }
  // ])


  // below code is set because the added items are stored in localStorage while refreshing so that the objects are not removed

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')))


  // this will add new list 
  const [newItem, setNewItem] = useState('')

  const [search, setSearch] = useState('')


  const setAndSaveItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem('shoppinglist', JSON.stringify(newItems))
  }


  const addItem = (item) =>{
    const id = items.length ? items[items.length-1].id +1 : 1
    const myNewItem = {id, checked: false, item}
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems)
  }


  const handleCheck = (id) => {
    // below like of code is to convert a tick to untick when handleCheck is invoked or viceversa.
    // here the above prop 'id' checked whether the invoked id is same or not. If it is same. The '!item.checked' converts to opposite of its value. 

    // If true, it creates a new object with the spread (...) operator, copying all properties of the current item, but toggling the checked property to its opposite value using 
    const listItems = items.map((item)=>item.id === id? { ...item, checked: !item.checked} : item)
    setAndSaveItems(listItems)
  }

  const handleDelete = (id) =>{
    const listItems = items.filter((item) =>  item.id !==id)
    setAndSaveItems(listItems)
  }

  const handleSubmit = (e) => {
    // below line does not allow page reload while submitting
    e.preventDefault();
    if(!newItem) return;
    // console.log(newItem)
    addItem(newItem)
    //addItem 
    setNewItem('')
  }


  return (
    <div className="App">
      <Header title="Grocery List" />



      <AddItem 
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}
      />
      
      <SearchItem
        search = {search}
        setSearch = {setSearch}        
      />

      <Content
        items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
      />
      <Footer length = {items.length}/>
    </div>
  );
}

export default App;
