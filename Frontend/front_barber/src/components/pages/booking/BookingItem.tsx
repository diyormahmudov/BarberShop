import type { BookingType } from "../../types/BookingType/BookingType";

interface BookingItemProps {
  bookingData: BookingType[];
}

const BookingItem = ({ bookingData }: BookingItemProps) => {
  return (
    <div>
      {bookingData.map((booking) => (
        <div key={booking.id} className="booking-item">
          <p>Barber: {booking.barberName}</p>
          <p>User: {booking.userName}</p>
          <p>Phone: {booking.phoneNumber}</p>
          <p>Service: {booking.service}</p>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.time}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingItem;