import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';




const App = () => {

const [selectedDate, setSelectedDate] = useState(null);
const [eventName, setEventName] = useState("");
const [events, setEvents] = useState([]);

const Date_Selected = (date) =>{
  setSelectedDate(date)
}

const Event_Name = (event) =>{
  setEventName(event.target.value)
}

const Create_Event = () =>{
  if (selectedDate && eventName){
    const newEvent = {
      id: new Date().getTime(),
      date: selectedDate,
      title: eventName
    };
    setEvents([...events, newEvent]);
    setSelectedDate(null);
    setEventName("");
    setSelectedDate(newEvent.date);
  }
}

const Update_Event = (eventId, newName)=> {
  const Updated_Events = events.map((event) => {
     if(event.id === eventId ){
      return {
        ...event,
        title:newName
      }; }
      return event;
});
  setEvents(Updated_Events);
}

const Delete_Event = (eventId) =>{
  const Updated_Events = events.filter((event) => event.id !== eventId);
  setEvents(Updated_Events);
}

  return (
    <div className='app'>
      <h1> Calender EOH</h1>
      <div className='container'>
        <div className = 'calendar-container'>
          <Calendar
            value = {selectedDate}
            onClickDay = {Date_Selected}
            tileClassName = { ({date}) =>
              selectedDate && 
                date.toDateString() === selectedDate.toDateString()? 'selected' :
                events.some( (event) => 
                event.date.toDateString() === date.toDateString() )?
                'event-marked'
                :''         
            }
          />
        </div>
        <div className = 'event-container'>
          {
            selectedDate && 
            <div className = 'event-form'>
              <h2>Create Event</h2>
              <p>Selected Date: {selectedDate.toDateString()}</p>
              <input
                type ="text"
                placeholder = "Event Name"
                value = {eventName}
                onChange = {Event_Name}
              />
              <button
                className = 'create-btn'
                onClick = {Create_Event}
              >
                Create New Event
              </button>
            </div>
          }
          
          
            {
              events.length > 0 && selectedDate && (
              <div className = 'event-list'>
                <div className = 'event-cards'>
                  {events.map((event) => 
                  event.date.toDateString() === selectedDate.toDateString()?
                  (
                <div 
                  key = {event.id}
                  className = 'event-card'>
                  <div className = 'event-card-header'>
                    <span className = 'event-date'>
                      {event.date.toDateString()}
                    </span>
                    <div className ='event-actions'>
                       <button 
                    className = 'update-btn'
                    onClick = { () => {
                      Update_Event(
                        event.id,
                        prompt("ENTER NEW TITLE",)
                      )}
                    }
                  >
                    Update Event
                  </button>
                  <button 
                    className = 'delete_btn'
                    onClick={() =>Delete_Event(event.id)}
                  >
                    Delete Event
                  </button>
                    </div>
                  </div>
                 
                <div
                  className = 'event-card-body'
                >
                  <p className = 'event-title'>{event.title}</p>
                </div>
              </div>)
              : null
                  
            )        
          }
          </div>
            
        </div>
            )}  
            </div>
      </div>
    </div>
  );
};
export default App;
