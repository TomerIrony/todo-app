import { useEffect, useState } from 'react';
import api from './utils/Api';
import './App.css';

function App() {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const res = await api.getItems();

      res.map((item) => {
        return (item.date =
          item.date[0] +
          item.date[1] +
          item.date[2] +
          item.date[3] +
          '/' +
          item.date[5] +
          item.date[6] +
          '/' +
          item.date[8] +
          item.date[9]);
      });

      setTodo(res);
      setLoading(false);
    };
    fetchItems();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    api
      .createItem(formProps.name)
      .then((res) => {
        const newArr = [...todo, res];
        setTodo(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRemove = (item) => {
    const id = item._id;
    api.deleteItem(id).then((res) => {
      const filteredArray = todo.filter((element) => {
        return element._id !== id;
      });
      setTodo(filteredArray);
    });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <fieldset>
          <legend>
            <h2>Todo name:</h2>
          </legend>
          <input required name="name" placeholder="todo"></input>
        </fieldset>
        <button type="submit" className="add__button">
          add item
        </button>
      </form>
      <div className="container">
        {todo.map((item) => {
          return (
            <div key={item._id} className="item-container">
              <span className="item-date">{item.date}</span>
              <p>{item.name}</p>
              <button
                onClick={() => {
                  onRemove(item);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
