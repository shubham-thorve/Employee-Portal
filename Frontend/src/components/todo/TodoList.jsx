import { useState, useEffect } from "react";
import "./TodoList.css";
import "./TodoCalendar.css";
import "./TodoCard.css";
import "./TodoResponsive.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import axios from "axios";
import { FaPen, FaTrash, FaAngleDown, FaAngleUp, FaPlus, FaCalendarPlus, FaCalendarMinus } from "react-icons/fa";
import Swal from 'sweetalert2'
import Mascot from './Mascot.jsx';
import Tippy from "@tippyjs/react";

function TodoList() {
    const [items, setItems] = useState([]); //maintain the list of todos to be displayed on the current selected createdDate
    const [newItem, setNewItem] = useState(""); //used to manage the text input field where users can add new todos.
    const [showPlaceholder, setShowPlaceholder] = useState(true); //manage the visibility of the placeholder text in the new todo input field.
    const [editIndex, setEditIndex] = useState(-1); //used to determine which todo item is currently being edited.
    const [editTodoValue, setEditTodoValue] = useState(""); //used to manage the text value of the todo item being edited.
    const [editStartTimeValue, setEditStartTimeValue] = useState(""); //used to manage the start time value of the todo item being edited.
    const [createdDate, setDate] = useState(new Date()); // set initial createdDate to the current createdDate
    const [todoName, setTodoName] = useState([]); //maintain the list of todos for each selected createdDate.
    const [showCalendar, setShowCalendar] = useState(false); //manage the visibility of the calendar component for selecting a createdDate.
    const [newItemStartTime, setNewItemStartTime] = useState(null); //manage the selected start time for the new todo item.
    const [newItemError, setNewItemError] = useState(""); //manage the error state for the new todo input field when no text has been entered.
    const [startTimeError, setStartTimeError] = useState(""); //manage the error state for the new todo time field when no time has been entered.
    const [showInputTimer, setShowInputTimer] = useState(true); // show or hide the input timer in the card
    const [editMode, setEditMode] = useState(false);
    const [tempIsCompleted, setTempIsCompleted] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showMore, setShowMore] = useState(Array(items.length).fill(false));
    

    useEffect(() => {
        // Get the createdDate string in the format MM/DD/YYYY
        const dateString = createdDate.toLocaleDateString();
        const parts = dateString.split("/");
        console.count(dateString);
        const yyyyMmDd = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
        console.log(yyyyMmDd);

        console.log("todos GET Method call: useEffect() ");
        // Make an API call to get the todos for the selected createdDate
        const token = sessionStorage.getItem("jwtToken");
        const email = sessionStorage.getItem("email");
        console.log("Email Id: " + email);

        axios.get('http://localhost:8085/employeeportal-service/' + email + '/todos/' + yyyyMmDd,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }

        )
            .then(function (response) {
                // Get the todos from the todoName state for the selected createdDate, or an empty array if no todos exist
                const newItems = todoName[dateString] || [];

                // Merge the new todos from the API call with the existing todos, and set the state
                const updatedItems = newItems.map((item) => ({
                    ...item,
                    isCompleted: item.isCompleted ?? false,
                }));
                setItems([...updatedItems, ...response.data]);

                // Initialize the showInputTimer state based on the length of the merged todos array
                setShowInputTimer(new Array([...updatedItems, ...response.data].length).fill(false));

                // Clear the new item input field and start time state variables
                setNewItem("");
                setNewItemStartTime(null);
            });
    }, [todoName, createdDate]);

    const handleStartTimeChange = (event) => {
        const today = new Date();
        const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (createdDate < now) { // disable input time for dates prior to today
            return;
        }

        setNewItemStartTime(event.target.value);
    };
    const handleInputChange = (event) => {
        const today = new Date();
        const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (createdDate < now) {
            // disable input field for dates prior to today
            return;
        }

        setNewItem(event.target.value);
        setShowPlaceholder(event.target.value === "");
    };

    // This function creates a new todo item by making a POST request to a server.
    const createTodo = async (todo) => {


        try {
            // Use the axios library to make a POST request to the server.
            // The response contains the new todo item.
            const token = sessionStorage.getItem("jwtToken");
            const email = sessionStorage.getItem("email");
            const response = await axios.post("http://localhost:8085/employeeportal-service/" + email + "/todos", todo,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }

            );
            console.log("add todo: ", response);
            // Return the data from the response.
            return response.data;
        }
        catch (error) {
            // If there is an error, log it to the console and re-throw it.
            console.error(error);
            throw error;
        }
    };

    // This function handles the logic for adding a new item to the todo list.
    const handleAddItem = async () => {
        const today = new Date();
        const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // If the createdDate is earlier than today, disable the input field and input time.
        if (createdDate < now) {
            setNewItemError(true);
            Swal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'You cannot add a new task for a past date',
            });
            return;
        }

        // If the newItem input has less than 3 non-space characters, set the state variable newItemError to true and return.
        if (newItem.replace(/\s/g, "").length < 3) {
            setNewItemError(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '"Add-Task" field is empty/Entered text is less than 3 characters',
            });
            return;
        }

        if (newItem.length > 100) {
            setNewItemError(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The maximum length can be 100 characters.Try adding a smaller task',
            });
            return;
        }

        // If the startTime input is not selected, set the state variable startTimeError to true and return.
        if (newItemStartTime === null) {
            setStartTimeError(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '"Start Time" field is empty, please add a valid time',
            });
            return;
        }

        // Convert the newItemStartTime to a formatted string.
        const startTime = new Date(`1970-01-01T${newItemStartTime}:00`);
        const formattedStartTime = format(startTime, "hh:mm a");

        // Get the createdDate string in the format MM/DD/YYYY.
        const dateString = createdDate.toLocaleDateString();

        // Make a copy of the todoName state variable.
        const newTodoName = { ...todoName };

        // If there is no entry for the createdDate in newTodoName, create one.
        if (!newTodoName[dateString]) {
            newTodoName[dateString] = [];
        }

        // Convert the createdDate to a yyyy-MM-dd string.
        const date = createdDate.toLocaleDateString();
        const parts = date.split("/");
        const yyyyMmDd = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;

        // Create a new todo item object.
        const newItemObject = { employeeId: 2, todoName: newItem.trim(), startTime: formattedStartTime, isCompleted: false, createdDate: yyyyMmDd };
        console.log(newItemObject);
        try {
            // Call the createTodo function to save the new todo item to the server.
            const savedTodo = await createTodo(newItemObject);
            // Add the saved todo item to the newTodoName state variable.
            newTodoName[dateString].push(savedTodo);
            // Update the todoName state variable with the newTodoName variable.
            setTodoName(newItemObject);
            // Add the saved todo item to the items state variable.
            setItems([...items, savedTodo]);
            // Reset the newItem and newItemStartTime state variables to their initial values.
            setNewItem("");
            setNewItemStartTime(null);
            // Reset the error state variables.
            setNewItemError(false);
            setStartTimeError(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleAddItem();
        }
    };

    const handleInputFocus = () => {
        setShowPlaceholder(false);
    };

    const updateTodo = async (updatedTodo) => {
        console.log("input method");
        try {
            const token = sessionStorage.getItem("jwtToken");
            const email = sessionStorage.getItem("email");
            // Make a PUT request to update the todo item in the backend database
            const response = await axios.put('http://localhost:8085/employeeportal-service/' + email + '/todos', updatedTodo,

                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditTodo = async (index, updatedItem) => {
        // Determine which fields have changed
        const todoChanged = updatedItem.todoName !== items[index].todoName;
        const timeChanged = updatedItem.startTime !== items[index].startTime;

        // If neither the todo nor the time have changed, exit early
        if (!todoChanged && !timeChanged) {
            return;
        }

        // Update the todo and/or time if they have changed
        if (updatedItem.todoName) {
            items[index].todoName = updatedItem.todoName;
        }
        if (timeChanged) {
            items[index].startTime = updatedItem.startTime;
        }


        // Save the updated items to state
        const newItems = [...items];
        setItems(newItems);

        // Call the updateTodo function to update the database
        const updatedTodo = {
            todoId: items[index].todoId,
            todoName: updatedItem.todoName || items[index].todoName, // Use the existing todoName if the updatedItem.todoName is not defined
            startTime: updatedItem.startTime,
            isCompleted: items[index].isCompleted,
            createdDate: items[index].createdDate,
            employeeId: items[index].employeeId,
        };
        console.log("Put Json");
        console.log(updatedTodo);
        updateTodo(updatedTodo);

        // Reset the edit index and edit todo value
        setEditIndex(-1);
        setEditTodoValue("");
        setEditStartTimeValue("");
    };

    const handleEditItem = (index) => {
        const item = items[index];
        setShowInput(true);

        if (editIndex !== -1 && editIndex !== index) {
            // Set the showInputTimer state to false for the previously edited item
            setShowInputTimer((showInputTimer) => {
                const updatedInputTimer = [...showInputTimer];
                updatedInputTimer[editIndex] = false;
                return updatedInputTimer;
            });
        }


        setEditMode(true);
        setEditIndex(index);
        setEditTodoValue(item.todoName); // Use the todoName property instead of todo
        // Format the startTime value using the same formatting function as for adding a new task
        setEditStartTimeValue(item.startTime.substring(0, 5));
        setTempIsCompleted(item.isCompleted); // Save the current checkbox state

        // Set the showInputTimer state for the item being edited
        setShowInputTimer((showInputTimer) => {
            const updatedInputTimer = [...showInputTimer];
            updatedInputTimer[index] = true;
            return updatedInputTimer;
        });
    };

    const handleSaveEdit = async () => {
        // Check if the editTodoValue is empty or contains less than 3 non-space characters
        if (!editTodoValue || editTodoValue.replace(/\s/g, "").length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid task name (minimum 3 characters)',
            });
            return;
        }

        if (editTodoValue.length > 100) {
            setNewItemError(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The maximum length can be 100 characters.Try adding a smaller task',
            });
            return;
        }

        const updatedItems = items.map((item, index) => {
            if (index === editIndex) {
                const updatedItem = {};

                // Format the start time value using the same formatting function as for adding a new task
                const startTime = new Date(`1970-01-01T${editStartTimeValue}:00`);
                if (startTime != "Invalid Date")
                    updatedItem.startTime = format(startTime, "hh:mm a");
                else
                    updatedItem.startTime = editStartTimeValue;

                if (editTodoValue && editTodoValue.trim() !== "") {
                    updatedItem.todoName = editTodoValue.trim();
                }

                handleEditTodo(index, updatedItem);
                setShowInputTimer(showInputTimer.map((_, i) => i === index ? false : showInputTimer[i]));

                return { ...item, ...updatedItem };
            }
            return item;
        });

        setItems(updatedItems);
        setEditIndex(-1);
        setEditTodoValue("");
        setEditStartTimeValue("");
        setEditMode(false);
    };

    // This function removes a todo item from the list of items
    const handleRemoveItem = (index) => {
        const item = items[index]; // Get the item to be removed from the items array using its index
        const itemDate = new Date(createdDate.toLocaleDateString() + " " + item.startTime); // Parse the todo item's start time and date into a new date object
        if (itemDate < new Date().setHours(0, 0, 0, 0)) {// Check if the todo item's date is before the current date

            setNewItemError(true);
            Swal.fire({
                icon: 'error',
                title: 'Sorry!',
                text: 'Tasks on past dates cannot be removed!',
            });
            return;
        }

        const todoId = item.todoId; // Get the id of the todo item from the todo item object
        const token = sessionStorage.getItem("jwtToken");
        const email = sessionStorage.getItem("email");
        // Send a request to the backend API to delete the todo item with the given id
        axios.delete(`http://localhost:8085/employeeportal-service/` + email + `/todos/${todoId}`,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
            .then(response => {
                if (response.status === 200) { // If the request is successful, update the items and todoName state
                    const newItems = [...items];
                    const dateString = createdDate.toLocaleDateString();
                    const newTodoName = { ...todoName };
                    if (newTodoName[dateString]) {
                        const todoIndex = newTodoName[dateString].findIndex((todo) => todo.todoName === newItems[index].todoName);
                        newTodoName[dateString].splice(todoIndex, 1);
                        setTodoName(newTodoName);
                    }
                    newItems.splice(index, 1);
                    setItems(newItems);
                } else { // If the request fails, log the status code to the console
                    console.log(`Unexpected status code received: ${response.status}`);
                }
            })
            .catch(error => { // If an error occurs while making the request, log it to the console
                console.log(`Error occurred while deleting todo item: ${error}`);
            });
    };

    // This function toggles the completed status of a todo item
    const handleToggleCompleted = (index, isChecked) => {
        const newItems = [...items];
        newItems[index].isCompleted = isChecked;
        setItems(newItems);

        // Update tempIsCompleted state in edit mode
        if (editIndex === index) {
            setTempIsCompleted(isChecked);
        }

        const updatedTodo = {
            todoId: items[index].todoId,
            todoName: items[index].todoName,
            startTime: items[index].startTime,
            isCompleted: isChecked,
            createdDate: items[index].createdDate,
            employeeId: items[index].employeeId,
        };
        updateTodo(updatedTodo);
    };

    const handleShowMore = (index) => {
        setShowMore((prevShowMore) => {
            const updatedShowMore = { ...prevShowMore };

            // If the clicked card is already expanded, hide its text
            if (updatedShowMore[index]) {
                updatedShowMore[index] = false;
            } else {
                // Otherwise, hide the expanded text for other cards and expand the clicked card's text
                Object.keys(updatedShowMore).forEach((key) => {
                    updatedShowMore[key] = false;
                });
                updatedShowMore[index] = true;
            }

            return updatedShowMore;
        });
    };

    return (
        <div className="todo-main-container">
            <div className="todo-container">
                <div className="todo-background"></div>
                {showCalendar && (
                    <div className="calendar-container">
                        <Calendar
                            value={createdDate}
                            onClickDay={(value) => { setDate(value); setShowCalendar(false); }}

                            className="my-calendar"
                        />
                    </div>
                )}
                <div className="todo-selected-date">{createdDate && format(createdDate, "MMMM dd, yyyy")}</div>




                <h2 className="todo-title">TODO LIST</h2>
                <div className="todo-input-container">

                    <button className="show-calendar-button" onClick={() => setShowCalendar(!showCalendar)}>
                        {showCalendar ? <FaCalendarMinus className="todo-icon" /> : <FaCalendarPlus className="todo-icon" />}
                        {/* setShowCalendar(!showCalendar)}>{showCalendar ? 'Hide Calendar' : 'Show Calendar'} */}
                        {/* <FaCalendarPlus className="todo-icon" /> */}
                    </button>

                    <input
                        type="text"
                        placeholder={showPlaceholder ? "Add a new item" : ""}
                        value={newItem}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        onFocus={handleInputFocus}
                        onClick={() => setNewItemError(false)} // Add onBlur event listener to update newItemError state variable
                        required
                    />

                    <input
                        type="time"
                        value={newItemStartTime || ""}
                        onChange={handleStartTimeChange}
                        onClick={() => setStartTimeError(false)} // Add onBlur event listener to update startTimeError state variable
                        required
                    />

                    {/* <button onClick={handleAddItem} className="todo-tooltip">
                        <FaPlus className="todo-icon" />
                        <span className="todo-tooltiptext">Click to add a new task</span>
                    </button> */}
                    <Tippy content="Click to add the new task">
                     <button onClick={handleAddItem}className="todo-tooltip">
                        <FaPlus className="todo-icon" />
                    </button></Tippy>

                </div>
                <div className={`todo-header`}>
                    <div className="todo-header-tc">TASK STATUS</div>
                    <div className="todo-header-st">START TIME</div>
                    <div className="todo-header-tn">TASK </div>
                    <div className="todo-header-e">EDIT</div>
                    <div className="todo-header-r">REMOVE</div>
                </div>

                <div className="todo-cards-container">
                    {items.map((item, index) => (

                        <div key={index} className="todo-card">
                            <div key={index} className={`todo-inner-card ${item.isCompleted ? "completed" : ""}`}>
                                <div className="todo-card-content">
                                    <input
                                        type="checkbox"
                                        checked={editIndex === index ? tempIsCompleted : item.isCompleted}
                                        onChange={(event) => handleToggleCompleted(index, event.target.checked)}
                                        disabled={(!editMode && item.isCompleted) || (editMode && index !== editIndex)}
                                    />
                                    <div key={index} className={`todo-task-start-time ${item.isCompleted ? "completed" : ""}`}>{item.startTime}</div>

                                    <div key={index} className={`todo-task-start-title ${item.isCompleted ? "completed" : ""}`}>
                                        {item.todoName.length <= 70 ? (
                                            item.todoName
                                        ) : (
                                            <>
                                                {showMore[index] ? (
                                                    <>
                                                        {item.todoName}
                                                        
                                                        <FaAngleUp onClick={() => handleShowMore(index)} />
                                                    </>
                                                ) : (
                                                    <>
                                                        {item.todoName.slice(0, 62) + "..."}
                                                        <FaAngleDown onClick={() => handleShowMore(index)} />
                                                    </>
                                                )}
                                            </>
                                        )}
                                        {showInput && editIndex === index ? (

                                            <input
                                                type="text"
                                                className="task-input"
                                                placeholder="Enter modified task..."
                                                value={editTodoValue}
                                                onChange={(event) => setEditTodoValue(event.target.value)}
                                                autoFocus
                                            />
                                        ) : (
                                            <span
                                                style={{
                                                    textDecoration: item.isCompleted ? "line-through" : "none",
                                                    marginLeft: "10px",
                                                }}
                                            >
                                                {item.todo}
                                            </span>
                                        )}
                                    </div>

                                    {showInputTimer[index] && (
                                        <div>
                                            <input
                                                type="time"
                                                value={editStartTimeValue}
                                                onChange={(event) => setEditStartTimeValue(event.target.value)}
                                                style={{ left: 40 }}
                                            />
                                        </div>
                                    )}

                                    <div>
                                        {editIndex === index ? (
                                            <div>
                                                <button onClick={handleSaveEdit}>Save</button>
                                                {/* <button onClick={handleCancelEdit}>Cancel</button> */}
                                            </div>
                                        ) : (
                                            <div className="TodoEditButton">
                                                <Tippy content="Edit the Start time/ Task">
                                                <button onClick={() => handleEditItem(index)}><FaPen /></button></Tippy>
                                                <Tippy content="Delete the task">
                                                <button onClick={() => handleRemoveItem(index)}><FaTrash /></button></Tippy>
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <Mascot />
        </div>

    );
}

export default TodoList;

