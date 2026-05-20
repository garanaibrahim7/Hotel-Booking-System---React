import React from 'react';

const RoomDetail = ({ room, nights, currencySymbol }) => {
  const roomTotal = room.price * nights;

  return (
    <div className="d-flex align-items-center mb-3">
      <img
        src={`http://localhost:8000/storage/${room.path}`}
        alt={room.title}
        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        className="me-3 border"
      />
      <div className="flex-grow-1">
        <span className="small text-uppercase fw-bold d-block" style={{ fontSize: '11px' }}>{room.title}</span>
        <small className="text-muted text-uppercase" style={{ fontSize: '9px' }}>
          {currencySymbol} {Number(room.price).toFixed(2)} x {nights} {nights > 1 ? 'Nights' : 'Night'}
        </small>
      </div>
      <span className="fw-bold small">
        {currencySymbol} {Number(roomTotal).toFixed(2)}
      </span>
    </div>
  );
};

export default RoomDetail;