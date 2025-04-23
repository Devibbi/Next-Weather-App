import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search?name=';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('weather_favorites') || '[]');
    setFavorites(fav);
    const rec = JSON.parse(localStorage.getItem('weather_recents') || '[]');
    setRecents(rec);
  }, []);

  useEffect(() => {
    localStorage.setItem('weather_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('weather_recents', JSON.stringify(recents));
  }, [recents]);

  const handleSearch = (e, city = null) => {
    if (e) e.preventDefault();
    const searchCity = city || query;
    if (searchCity) {
      onSearch(searchCity);
      setShowSuggestions(false);
      // Add to recents
      setRecents((prev) => {
        const updated = [searchCity, ...prev.filter(r => r !== searchCity)].slice(0, 6);
        return updated;
      });
    }
  };

  const handleInputChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const res = await fetch(GEO_API + encodeURIComponent(val));
      const data = await res.json();
      setSuggestions(data.results ? data.results.slice(0, 5) : []);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    handleSearch(null, name);
    setShowSuggestions(false);
  };

  const handleGeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Reverse geocode to city name
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`);
        const data = await res.json();
        if (data && data.name) {
          setQuery(data.name);
          handleSearch(null, data.name);
        }
      });
    } else {
      alert('Geolocation not supported');
    }
  };

  const toggleFavorite = () => {
    if (!query) return;
    setFavorites((prev) =>
      prev.includes(query)
        ? prev.filter(f => f !== query)
        : [query, ...prev].slice(0, 8)
    );
  };

  return (
    <Container>
      <div className='center1' style={{position:'relative'}}>
        <form onSubmit={handleSearch} autoComplete="off">
          <input
            type="text"
            placeholder="Enter city..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
          />
          <button type="submit">Search</button>
          <GeoButton type="button" onClick={handleGeo} title="Use my location">📍</GeoButton>
          <FavButton type="button" onClick={toggleFavorite} title="Add/Remove Favorite">
            {favorites.includes(query) ? '★' : '☆'}
          </FavButton>
        </form>
        {showSuggestions && suggestions.length > 0 && (
          <Suggestions>
            {suggestions.map((s, i) => (
              <li key={i} onClick={() => handleSuggestionClick(s.name)}>{s.name}{s.country ? ', ' + s.country : ''}</li>
            ))}
          </Suggestions>
        )}
        {(favorites.length > 0 || recents.length > 0) && (
          <QuickAccess>
            {favorites.length > 0 && <div><b>Favorites:</b> {favorites.map((f, i) => <QuickBtn key={i} onClick={()=>handleSearch(null, f)}>{f}</QuickBtn>)}</div>}
            {recents.length > 0 && <div><b>Recent:</b> {recents.map((r, i) => <QuickBtn key={i} onClick={()=>handleSearch(null, r)}>{r}</QuickBtn>)}</div>}
          </QuickAccess>
        )}
      </div>
    </Container>
  );
};

export default SearchBar;
const Container = styled.div`
.center1 {
width:75%;
margin:0 auto;
}

form{
  display: flex;
  margin-bottom: 20px;
  background:white;
  width:100%;
  padding: 10px;
  border-radius: 10px;
}

input{
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #ccc;
}

button{
  padding: 10px;
  border: none;
  background: #0070f3;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1rem;
}
`;

const GeoButton = styled.button`
  background: #38bdf8;
  margin-left: 6px;
  font-size: 1.2rem;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FavButton = styled.button`
  background: #fde68a;
  margin-left: 6px;
  font-size: 1.2rem;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f59e42;
`;

const Suggestions = styled.ul`
  position: absolute;
  background: #fff;
  color: #222;
  width: 300px;
  max-width: 90vw;
  margin-top: 2px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  list-style: none;
  padding: 0;
  z-index: 100;
  li {
    padding: 10px 18px;
    cursor: pointer;
    &:hover {
      background: #e2e8f0;
    }
  }
`;

const QuickAccess = styled.div`
  margin-top: 8px;
  text-align: left;
  font-size: 0.97rem;
  div { margin-bottom: 4px; }
`;
const QuickBtn = styled.button`
  background: #e0e7ef;
  color: #222;
  border: none;
  border-radius: 1.2em;
  margin: 0 4px 4px 0;
  padding: 0.2em 0.9em;
  font-size: 1em;
  cursor: pointer;
  &:hover { background: #bae6fd; }
`;
