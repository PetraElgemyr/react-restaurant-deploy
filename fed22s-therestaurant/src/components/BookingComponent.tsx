import { JSXElementConstructor, useEffect, useReducer, useState } from "react";
import { BookGuests } from "./BookGuests";
import { BookingForm } from "./BookingForm";
import { CalendarPage } from "./CalendarPage";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { User } from "../models/User";
import { CurrentBookingContext } from "../contexts/BookingsContext";
import { CurrentBookingReducer } from "../reducers/CurrentBookingReducer";
import { defaultBooking } from "../models/Booking";


export const BookingComponent = () => {
  const [showGuests, setShowGuests] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [currentBooking, dispatch] = useReducer(CurrentBookingReducer, defaultBooking);
  
  useEffect(() => {
    console.log("booking updated:", currentBooking)
  })

  const goToCalendar = () => {
    setShowCalendar(true);
    setShowGuests(false);
    setShowForm(false);
  };

  const goToGuests = () => {
    setShowGuests(true);
    setShowCalendar(false);
    setShowForm(false);
  };

  const goToForm = () => {
    setShowForm(true);
    setShowCalendar(false);
    setShowGuests(false);
  };

  const [html, setHtml] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (showGuests) {
      setHtml(<BookGuests goToCalendar={goToCalendar}></BookGuests>);
    }
    if (showCalendar) {
      setHtml(
        <CalendarPage
          goToGuests={goToGuests}
          goToForm={goToForm}
        ></CalendarPage>
      );
    }
    if (showForm) {
      setHtml(<BookingForm goToCalendar={goToCalendar}></BookingForm>);
    }
  }, [showGuests, showCalendar, showForm]);

  const endBooking = (user: User) => {};
  return (
    <>
      <CurrentBookingContext.Provider value={currentBooking}>
        <BookingDispatchContext.Provider value={dispatch}>
          {html}
          {/* <BookGuests goToCalendar={goToCalendar}></BookGuests> */}
          {/* <CalendarPage goToForm={}></CalendarPage> */}
          {/* <BookingForm endBooking={endBooking}></BookingForm> */}
        </BookingDispatchContext.Provider>
      </CurrentBookingContext.Provider>
    </>
  );
};

/*

function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}



*/