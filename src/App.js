import './App.css';
import React, { useState } from 'react';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [newGuestFirstName, setNewGuestFirstName] = useState('');
  const [newGuestLastName, setNewGuestLastName] = useState('');

  const addGuest = () => {
    if (newGuestFirstName.trim() !== '' && newGuestLastName.trim() !== '') {
      const newGuest = {
        firstName: newGuestFirstName,
        lastName: newGuestLastName,
        status: 'not attending',
      };

      setGuests([...guests, newGuest]);
      setNewGuestFirstName('');
      setNewGuestLastName('');
    }
  };

  const deleteGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const updateGuestStatus = (index, status) => {
    const updatedGuests = [...guests];
    const guest = updatedGuests[index];
    guest.status = status;
    setGuests(updatedGuests);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addGuest();
    }
  };

  return (
    <div>
      <h2>Guest List</h2>

      <div>
        {guests.map((guest, index) => (
          <div key={`guest-${guest.id}`} data-test-id="guest">
            <div>
              {guest.firstName} {guest.lastName}
            </div>
            <label>
              Attending:
              <input
                type="checkbox"
                checked={guest.status === 'attending'}
                onChange={() =>
                  updateGuestStatus(
                    index,
                    guest.status === 'attending'
                      ? 'not attending'
                      : 'attending',
                  )
                }
                aria-label={`${guest.firstName} ${guest.lastName} attending status`}
              />
            </label>
            <button onClick={() => deleteGuest(index)}>Remove</button>
          </div>
        ))}
      </div>

      <div>
        <label>
          First name:
          <input
            value={newGuestFirstName}
            onChange={(e) => setNewGuestFirstName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Last name:
          <input
            value={newGuestLastName}
            onChange={(e) => setNewGuestLastName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
      <button onClick={addGuest}>Add</button>
    </div>
  );
}
