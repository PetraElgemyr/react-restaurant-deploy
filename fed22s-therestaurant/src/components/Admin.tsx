import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingComponent } from "./BookingComponent";
import {
  deleteBookingById,
  getBookingsByDate,
} from "../serivces/BookingServices";
import { Booking } from "../models/Booking";
import { useConvertDateToString } from "../hooks/useConvertDateToString";
import { ChangeBooking } from "./changeBooking";
import { Button } from "./styled/Buttons";

export const Admin = () => {
  const isAdmin = true;
  const [createNewBooking, setCreateNewBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookingsAtDate, setBookingsAtDate] = useState<Booking[]>([]);

  const handleDateClick = async (day: Date) => {
    let date: string = useConvertDateToString(day);
    setSelectedDate(date);
    if (date !== "") {
      console.log("Hämta bokningar för datum:", date);
      const bookingsFromApi = await getBookingsByDate(date);
      setBookingsAtDate(bookingsFromApi);
    } else {
      console.log("Inget datum valt");
    }
  };

  console.log("Bokningar på datumet: ", selectedDate, bookingsAtDate);

  const handleAddBookingClick = () => {
    setCreateNewBooking(true);
  };

  const handleDeleteClick = async (bookingId: string) => {
    await deleteBookingById(bookingId);
    const bookingsFromApi = await getBookingsByDate(selectedDate);
    setBookingsAtDate(bookingsFromApi);
  };

  if (!createNewBooking) {
    return (
      <>
        <div>
          <Button onClick={handleAddBookingClick}>Lägg till ny bokning</Button>
          <h2>Välj datum för att se bokningar</h2>
          <Calendar onClickDay={(day) => handleDateClick(day)} />
          <div>
            <h6>Bokningar för datumet {selectedDate}</h6>

            <div>
              <p>Sittning 1</p>
              {bookingsAtDate.map((booking) => {
                if (booking.sitting === 1) {
                  return (
                    <ChangeBooking
                      key={booking.bookingId}
                      booking={booking}
                      handleDeleteClick={handleDeleteClick}
                    ></ChangeBooking>
                  );
                }
              })}
            </div>

            <div>
              <p>Sittning 2</p>
              {bookingsAtDate.map((booking) => {
                if (booking.sitting === 2) {
                  return (
                    <ChangeBooking
                      key={booking.bookingId}
                      booking={booking}
                      handleDeleteClick={handleDeleteClick}
                    ></ChangeBooking>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <BookingComponent isAdmin={isAdmin}></BookingComponent>
      </>
    );
  }
};
