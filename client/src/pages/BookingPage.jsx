import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { api } from '../api/client.js';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9\s-]{7,15}$/;

const BookingPage = () => {
  const { id } = useParams();

  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [bookedSlots, setBookedSlots] = useState([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    notes: ''
  });

  // Static slots
  const allTimeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  // Remove booked slots
  const availableTimeSlots = allTimeSlots.filter(
    (slot) =>
      !bookedSlots.some(
        (item) =>
          item.date === form.date &&
          item.timeSlot === slot
      )
  );

  // Remove slot locally
  const setSlotBookedLocally = (payload) => {
    setBookedSlots((prev) => [
      ...prev,
      {
        date: payload.date,
        timeSlot: payload.timeSlot
      }
    ]);
  };

  // Fetch expert
  useEffect(() => {
    const fetchExpert = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await api.getExpertById(id);

        console.log('Expert Data:', data);

        setExpert(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id]);

  // Socket.io real-time updates
  useEffect(() => {
    const socket = io(api.getSocketUrl());

    socket.emit('join_expert_room', `expert:${id}`);

    socket.on('slot_booked', (payload) => {
      console.log('Slot booked:', payload);

      setSlotBookedLocally(payload);

      setForm((prev) => {
        if (
          prev.date === payload.date &&
          prev.timeSlot === payload.timeSlot
        ) {
          return {
            ...prev,
            timeSlot: ''
          };
        }

        return prev;
      });
    });

    return () => {
      socket.emit('leave_expert_room', `expert:${id}`);
      socket.disconnect();
    };
  }, [id]);

  // Form validation
  const validate = () => {
    if (!form.name.trim()) return 'Name is required';

    if (!emailRegex.test(form.email))
      return 'Valid email is required';

    if (!phoneRegex.test(form.phone))
      return 'Valid phone number is required';

    if (!form.date) return 'Date is required';

    if (!form.timeSlot)
      return 'Time slot is required';

    return null;
  };

  // Submit booking
  const submit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        expertId: id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        timeSlot: form.timeSlot,
        notes: form.notes
      };

      const data = await api.createBooking(payload);

      setSuccess(
        data.message ||
          'Booking created successfully'
      );

      // Remove slot instantly
      setSlotBookedLocally({
        date: form.date,
        timeSlot: form.timeSlot
      });

      // Reset fields
      setForm((prev) => ({
        ...prev,
        date: '',
        timeSlot: '',
        notes: ''
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <LoadingState text="Loading booking form..." />
    );

  if (error && !expert)
    return <ErrorState message={error} />;

  return (
    <section>
      <h2>
        Book Session{' '}
        {expert ? `with ${expert.name}` : ''}
      </h2>

      {error && <ErrorState message={error} />}

      {success && (
        <p className="state success">
          {success}
        </p>
      )}

      <form className="form" onSubmit={submit}>
        {/* Name */}
        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value
              })
            }
          />
        </label>

        {/* Email */}
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />
        </label>

        {/* Phone */}
        <label>
          Phone
          <input
            type="tel"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value
              })
            }
          />
        </label>

        {/* Date */}
        <label>
          Date
          <input
            type="date"
            min={
              new Date()
                .toISOString()
                .split('T')[0]
            }
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
                timeSlot: ''
              })
            }
          />
        </label>

        {/* Time Slot */}
        <label>
          Time Slot
          <select
            value={form.timeSlot}
            onChange={(e) =>
              setForm({
                ...form,
                timeSlot: e.target.value
              })
            }
            disabled={!form.date}
          >
            <option value="">
              Select time slot
            </option>

            {availableTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

        {/* Notes */}
        <label>
          Notes
          <textarea
            rows="4"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value
              })
            }
          />
        </label>

        <button className="btn" type="submit">
          Submit Booking
        </button>
      </form>
    </section>
  );
};

export default BookingPage;