import {useState} from 'react';

const Todo = () => {
// initalizing state varibles.
  const [currentTodo, setCurrentTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [counter, setCounter]= useState(0);

// function to create todo list
   const createNewTodo = (currentTodo, time) => {
     let todosArray = [...todos];
     todosArray.push({
       todo: currentTodo,
       isCompleted: false,
       CreatedTime : time,
       CompletedTime: ""
     });
     setTodos(todosArray);
   }

   const completeTodo = (index, ctime) => {
     let todosArray = [...todos];
     todosArray[index].isCompleted = !todosArray[index].isCompleted;
     todosArray[index].CompletedTime = ctime;
     setTodos(todosArray);
   }
//function to delete with selected index
   const deleteTodo = (index) => {
     let todosArray = [...todos];
     todosArray.splice(index, 1);
     setTodos(todosArray);
   }

   return (
     // div to enter input and add by hitting return key.
     <div>
       <input
         className="todo-input"
         value={currentTodo}
         onChange={e => {
           setCurrentTodo(e.target.value);
         }}
         onKeyPress={(e) => {
           if (e.key === "Enter") {
             // convert timestamp in to time.
             let time = new Intl.DateTimeFormat('en-US', {
                        hour: '2-digit', minute: '2-digit', second: '2-digit' })
                       .format(e.timestamp)
             createNewTodo(currentTodo ,time);
             setCurrentTodo("");
           }
         }}
         placeholder="What needs to get done?"
       />
       {todos.map((todo, index) => (
         <div key={todo} className="todo">
           <div className="checkbox" onClick={(e) => {
              setCounter(counter+1);
              let ctime = new Intl.DateTimeFormat('en-US', {
                          hour: '2-digit', minute: '2-digit', second: '2-digit' })
                          .format(e.timestamp)
              completeTodo(index, ctime)
            }}>
             {todo.isCompleted && <span>&#x2714;</span>}
           </div>
           {
             // check and change style with help of isCompleted.
             todo.isCompleted?
               <div className="done"
                     style={counter===1?{color:"yellow"}:counter===2?{color:"#FF00FF"}:
                          counter===3?{color:"green"}:{color:"grey"}}>
                  {todo.todo}
                </div>
             :
             <div className= "undone" >
                {todo.todo}
              </div>
           }
           {todo.CreatedTime} {todo.CompletedTime}
           <div className="delete" onClick={() => deleteTodo(index)}>
             &#9746;
           </div>
         </div>
       ))}
     </div>
   );
}

export default Todo;
