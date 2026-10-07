import React, { useReducer, useState } from "react";
import hotelImg from './assets/grand-bella-hotel.jpg';
import hotelImg1 from './assets/hotel indigo.jpg';
import hotelImg2 from './assets/heritage hotel.jpg';
import hotelImg3 from './assets/hotel palazzo.jpg';
import hotelImg4 from './assets/royal national hotel.jpg';
import hotelImg5 from './assets/aman resorts.jpg';
import hotelImg6 from './assets/royal orchid hotel.jpg';
import hotelImg7 from './assets/bethlehem hotel.jpg';

const initialData = [
  { 
    id: 1, 
    title: "Grand Bella Hotel", 
    price: 120, 
    rating: 4.5, 
    orders: 154, 
    lat: 40.71, 
    lng: -74.00, 
    desc: "  Small to large properties that are privately owned and come in all kinds of styles and themes. ", 
    img: hotelImg 
  },
  { 
    id: 2, 
    title: "Hotel Indigo", 
    price: 65, 
    rating: 3.8, 
    orders: 73, 
    lat: 34.05, 
    lng: -118.24, 
    desc: "All-inclusive destinations that offer a variety of amenities, such as restaurants, pools, beaches, and activities.", 
    img: hotelImg1 
  },
  { 
    id: 3, 
    title: "Heritage Hotel", 
    price: 95, 
    rating: 4.8, 
    orders: 910, 
    lat: 51.50, 
    lng: -0.12, 
    desc: "Cozy scenic cabins with fireplace and mountain trails.", 
    img: hotelImg2 
  },
  { 
    id: 4, 
    title: "Hotel Palazzo", 
    price: 170, 
    rating: 4.5, 
    orders: 154, 
    lat: 40.71, 
    lng: -74.00, 
    desc: "Luxury rooms with complimentary breakfast,lunch.", 
    img: hotelImg3 
  }, 
  { 
    id: 5, 
    title: "Royal National Hotel", 
    price: 130, 
    rating: 4.5, 
    orders: 154, 
    lat: 40.71, 
    lng: -74.00, 
    desc: "our guestrooms are elegantly furnished with handmade furniture include luxury en-suite facilities with complimentary amenities pack, flat screen LCD TV, tea/coffee making facilities, fan, hairdryer and the finest pure white linen and towels.", 
    img: hotelImg4 
  }, 
  { 
    id: 6, 
    title: "Hotel Palazzo", 
    price: 177, 
    rating: 4.5, 
    orders: 154, 
    lat: 40.71, 
    lng: -74.00, 
    desc: "the room offers pleasant views of the ocean, lake, mountains, forest, park, pool, city, etc., include it in the name. If not, focus on other selling points.", 
    img: hotelImg5 
  },  
  { 
    id: 7, 
    title: "Royal Orchid Hotel", 
    price: 140, 
    rating: 4.5, 
    orders: 154, 
    lat: 40.71, 
    lng: -74.00, 
    desc: "A premium layout where the bedroom is completely separated from the living room by a door, ensuring total acoustic and visual privacy.", 
    img: hotelImg6 
  },  
  { 
    id: 8, 
    title: "Bethlehem Hotel", 
    price: 125, 
    rating: 4.5, 
    orders: 154, 
    lat: 40.71, 
    lng: -74.00, 
    desc: "We have 21 different types of rooms,Single Room ,Double Room, Double & Double Room,Triple Room,Quad Room,Twin room,Interconnecting Room", 
    img: hotelImg7 
  }
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD": 
      return { hotels: [action.payload, ...state.hotels], msg: "Hotel added!" };
    case "EDIT": 
      return { hotels: state.hotels.map(h => h.id === action.payload.id ? action.payload : h), msg: "Hotel updated!" };
    case "DELETE": 
      return { hotels: state.hotels.filter(h => h.id !== action.payload), msg: "Hotel deleted!" };
    default: 
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, { hotels: initialData, msg: "" });
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);
  const [formHotel, setFormHotel] = useState(null); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userUploadedImg, setUserUploadedImg] = useState("");

  
  const itemsPerPage = 5;
  const filtered = state.hotels.filter(h => 
    h.title.toLowerCase().includes(search.toLowerCase()) && h.price <= maxPrice
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const items = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

 
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserUploadedImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const openModal = (hotel = null) => {
    setFormHotel(hotel);
    setUserUploadedImg(hotel ? hotel.img : "");
    setIsFormOpen(true);
  };

 
  const closeModal = () => {
    setIsFormOpen(false);
    setUserUploadedImg("");
    setFormHotel(null);
  };

  
  const handleSave = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const item = {
      id: formHotel ? formHotel.id : Date.now(),
      title: fd.get("title"),
      price: parseFloat(fd.get("price")),
      lat: parseFloat(fd.get("lat")),
      lng: parseFloat(fd.get("lng")),
      desc: fd.get("desc"),
      rating: formHotel ? formHotel.rating : 4.5,
      orders: formHotel ? formHotel.orders : 10,
      img: userUploadedImg || (formHotel ? formHotel.img : hotelImg)
    };
    dispatch({ type: formHotel ? "EDIT" : "ADD", payload: item });
    closeModal();
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", 
    background: "#f4f6f8", 
    minHeight: "100vh" }}>
     
      <div style={{ 
        background: "#fff", 
        padding: "12px 24px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        borderBottom: "1px solid #ddd",
        position: "relative",
        zIndex: 10
      }}>
        <h2 style={{ margin: 0,
           color: "#1266f1", 
           cursor: "pointer" }} 
           onClick={() => setDetail(null)}>HERITAGE HOTELS</h2>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input 
            placeholder="Search title" 
            value={search} 
            onChange={e => { setSearch(e.target.value); setPage(1); }} 
            style={{ padding: "8px 12px", 
              width: "220px", 
              borderRadius: "4px", 
              border: "1px solid #ccc" }} 
          />
          <button 
            type="button"
            onClick={() => openModal(null)} 
            style={{ 
              background: "#1266f1", 
              color: "#fff", 
              border: "none", 
              padding: "8px 16px", 
              borderRadius: "4px", 
              cursor: "pointer", 
              fontWeight: "bold",
              whiteSpace: "nowrap"
            }}
          >
            Add Hotel
          </button>
        </div>
      </div>

      
      <div style={{ background: "#1266f1", 
        color: "#fff", 
        padding: "15px 20px" }}>
        <h3 style={{ margin: 0 }}>Hotels & Stays</h3>
      </div>

     
      {state.msg && <div style={{ background: "#28a745", 
        color: "#fff", 
        padding: "8px", 
        textAlign: "center" 
        }}>{state.msg}</div>}

      
      <div style={{ 
        maxWidth: "1000px", 
        margin: "20px auto", 
        padding: "0 15px" }}>
        {detail ? (
          
          <div style={{ background: "#fff", 
          padding: "20px", 
          borderRadius: "6px" }}>
            <button onClick={() => setDetail(null)} 
            style={{ 
              marginBottom: "15px", 
              cursor: "pointer", 
              padding: "6px 12px" 
              }}> Back to list</button>
            <img src={detail.img} 
            alt={detail.title} 
            style={{ 
              width: "100%", 
              height: "250px", 
              objectFit: "cover", 
              borderRadius: "6px" }} />

            <h2>{detail.title}</h2>
            <h3 style={{ 
              color: "#28a745" }}>${detail.price}</h3>
            <p>{detail.desc}</p>
            <iframe 
              title="map" 
              width="100%" 
              height="220" 
              style={{ border: "1px solid #ccc", 
                borderRadius: "4px" }}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${detail.lng - 0.05},${detail.lat - 0.05},${detail.lng + 0.05},${detail.lat + 0.05}&marker=${detail.lat},${detail.lng}`}
            ></iframe>
          </div>
        ) : (
         
          <div 
          style={{ 
            display: "flex", 
            gap: "20px" }}>
            
            <div style={{ width: "200px", 
              background: "#fff", 
              padding: "15px", 
              borderRadius: "6px", 
              height: "fit-content" }}>
              <h4>Max Price</h4>

              <input 
                type="range" 
                min="30" 
                max="500" 
                value={maxPrice} 
                onChange={e => { setMaxPrice(Number(e.target.value)); setPage(1); }} 
                style={{ width: "100%" }} 
              />
              <p>Up to: <strong>${maxPrice}</strong></p>
            </div>

            {/* Hotel Cards Feed */}
            <div style={{ flex: 1 }}>
              {items.map(h => (
                <div key={h.id} 
                style={{ 
                  display: "flex", 
                  background: "#fff", 
                  borderRadius: "6px", 
                  padding: "15px", 
                  marginBottom: "15px", 
                  border: "1px solid #eee" }}>

                  <img 
                    src={h.img} 
                    alt={h.title} 
                    style={{ width: "130px", 
                      height: "130px", 
                      objectFit: "cover", 
                      borderRadius: "4px", 
                      cursor: "pointer" }} 
                    onClick={() => setDetail(h)} 
                  />
                  
                 
                  <div style={{ 
                    flex: 1, 
                    padding: "0 15px" 
                    }}>
                    <h3 style={{ 
                      margin: "0 0 6px 0", 
                       cursor: "pointer" 
                      }} onClick={() => setDetail(h)}>{h.title}</h3>
                    <p style={{ 
                      color: "#666", 
                       fontSize: "13px", 
                        margin: "0 0 10px 0" }}>{h.desc}</p>
                    <span style={{ 
                      color: "#1266f1", 
                      cursor: "pointer",
                       marginRight: "10px",
                        fontSize: "13px" }} 
                        onClick={() => openModal(h)}>Edit</span>
                    <span style={{ 
                      color: "#dc3545",
                       cursor: "pointer",
                        fontSize: "13px" }} onClick={() => dispatch({ type: "DELETE", payload: h.id })}>Delete</span>
                  </div>

                  
                  <div style={{ 
                    width: "140px",
                     borderLeft: "1px solid #eee",
                      paddingLeft: "15px",
                       display: "flex",
                        flexDirection: "column",
                         justifyContent: "space-between" }}>
                    <div>
                      <div style={{ 
                        color: "#ff9900",
                         fontWeight: "bold" }}>★ {h.rating}</div>
                      <small style={{ 
                        color: "#888" }}>{h.orders} orders</small>
                    </div>
                    <div>
                      <h3 style={{ 
                        margin: "5px 0" }}>${h.price}</h3>
                      <button 
                      onClick={() => setDetail(h)} 
                      style={{
                         width: "100%",
                          background: "#1266f1",
                           color: "#fff",
                            border: "none",
                             padding: "6px",
                              borderRadius: "4px",
                               cursor: "pointer" }}>VIEW</button>
                    </div>
                  </div>
                </div>
              ))}

             
              <div style={{ display: "flex", 
                justifyContent: "center", 
                 alignItems: "center", 
                  gap: "8px", 
                  marginTop: "15px" }}>

                <button 
                  disabled={page === 1} 
                  onClick={() => setPage(page - 1)}
                  style={{ 
                    padding: "5px 10px", 
                     border: "1px solid #ddd", 
                      background: "#fff", 
                       cursor: page === 1 ? "not-allowed" : "pointer", 
                         opacity: page === 1 ? 0.5 : 1 }}
                >
                  «
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button 
                    key={p} 
                    onClick={() => setPage(p)} 
                    style={{ 
                      padding: "5px 10px", 
                      background: page === p ? "#1266f1" : "#fff", 
                      color: page === p ? "#fff" : "#000", 
                      border: "1px solid #ddd", 
                      cursor: "pointer",
                      fontWeight: page === p ? "bold" : "normal"
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button 
                  disabled={page === totalPages} 
                  onClick={() => setPage(page + 1)}
                  style={{ padding: "5px 10px", 
                    border: "1px solid #ddd", 
                    background: "#fff", 
                    cursor: page === totalPages ? "not-allowed" : "pointer", 
                    opacity: page === totalPages ? 0.5 : 1 }}
                >
                  »
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      
      {isFormOpen && (
        <div style={{ 
          position: "fixed", 
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          zIndex: 9999 
        }}>
          <form onSubmit={handleSave} 
          style={{ background: "#fff", 
          padding: "20px", 
          borderRadius: "8px", 
          width: "320px", 
          display: "flex", 
          flexDirection: "column", 
          gap: "10px", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            <h3 
            style={{ margin: "0 0 6px 0" }}>{formHotel ? "Edit Hotel" : "Add Hotel"}</h3>
            <input name="title" defaultValue={formHotel?.title || ""} placeholder="Hotel Title" required style={{ padding: "6px" }} />
            <input name="price" type="number" defaultValue={formHotel?.price || ""} placeholder="Price ($)" required style={{ padding: "6px" }} />
            <input name="lat" type="number" step="any" defaultValue={formHotel?.lat || 40.71} placeholder="Latitude" required style={{ padding: "6px" }} />
            <input name="lng" type="number" step="any" defaultValue={formHotel?.lng || -74.00} placeholder="Longitude" required style={{ padding: "6px" }} />
            
           
            <div 
            style={{ border: "1px dashed #ccc", 
            padding: "8px", 
            borderRadius: "4px", 
            background: "#fafafa" }}>
              <label 
              style={{ 
                fontSize: "12px", 
                color: "#555", 
                display: "block", 
                marginBottom: "4px", 
                fontWeight: "bold" }}>
                Upload Hotel Photo:
              </label>
              <input type="file" accept="image/*" onChange={handleImageFile} style={{ fontSize: "12px" }} />
              {userUploadedImg && (
                <img 
                  src={userUploadedImg} 
                  alt="Preview" 
                  style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "4px", marginTop: "6px", display: "block" }} 
                />
              )}
            </div>

            <textarea name="desc" defaultValue={formHotel?.desc || ""} placeholder="Description" required rows="3" style={{ padding: "6px" }} />
            
            <div style={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              gap: "8px" }}>
              <button type="button" onClick={closeModal} 
              style={{ 
                padding: "6px 12px", 
                cursor: "pointer" 
                }}>Cancel</button>
              <button type="submit" style={{ 
                background: "#1266f1", 
                color: "#fff", 
                border: "none", 
                padding: "6px 14px", 
                borderRadius: "4px", 
                cursor: "pointer" 
                }}>Save
                </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );  
}