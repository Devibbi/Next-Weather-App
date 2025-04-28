import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { FaLocationArrow } from 'react-icons/fa';

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

  const handleGeo = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        // Reverse geocode to city name (use a robust API and handle errors)
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`);
        if (!res.ok) throw new Error('Failed to fetch location');
        const data = await res.json();
        // Use city name from response or fallback to coords
        if (data && data.results && data.results[0] && data.results[0].name) {
          setQuery(data.results[0].name);
          onSearch(data.results[0].name);
        } else {
          setQuery(`${latitude.toFixed(2)},${longitude.toFixed(2)}`);
          onSearch(`${latitude},${longitude}`);
        }
      } catch (err) {
        alert('Could not fetch your location. Please try again.');
      }
    }, (err) => {
      alert('Unable to get your location. Please allow location access.');
    });
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
          <GeoButton type="button" onClick={handleGeo} title="Use my location" aria-label="Detect my location">
            <FaLocationArrow size={20} style={{color:'#2563eb',verticalAlign:'middle'}} />
          </GeoButton>
          <button type="submit">Search</button>
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
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  form {
    display: flex;
    margin-bottom: 18px;
    background: rgba(255,255,255,0.22);
    box-shadow: 0 2px 16px 0 rgba(31,38,135,0.08);
    backdrop-filter: blur(6px);
    border-radius: 14px;
    width: 100%;
    padding: 0.7rem 1rem;
    align-items: center;
    border: 1.5px solid rgba(255,255,255,0.12);
    min-width: 0;
    max-width: 100vw;
    overflow-x: auto;
  }
  input {
    padding: 0.7rem 1rem;
    font-size: 1.1rem;
    border: none;
    border-radius: 8px;
    outline: none;
    flex: 1;
    min-width: 0;
    margin-right: 0.7rem;
    max-width: 100vw;
    box-sizing: border-box;
  }
  button {
    padding: 0.7rem 1.2rem;
    border: none;
    background: var(--accent);
    color: #fff;
    border-radius: 8px;
    margin-left: 7px;
    cursor: pointer;
    font-size: 1.08rem;
    font-weight: 600;
    box-shadow: 0 1px 4px rgba(31,38,135,0.04);
    transition: background 0.2s;
    min-width: 38px;
    max-width: 100vw;
  }
  @media (max-width: 900px) {
    form {
      flex-direction: row;
      width: 100%;
      max-width: 100vw;
      padding: 0.5rem 0.4rem;
      min-width: 0;
    }
    input {
      font-size: 1rem;
      padding: 0.5rem 0.7rem;
      margin-right: 0.4rem;
    }
    button {
      padding: 0.5rem 0.7rem;
      font-size: 1rem;
      margin-left: 5px;
    }
  }
  @media (max-width: 540px) {
    form {
      padding: 0.3rem 0.1rem;
    }
    input {
      font-size: 0.95rem;
      padding: 0.3rem 0.5rem;
    }
    button {
      padding: 0.3rem 0.5rem;
      font-size: 0.95rem;
    }
  }
  @media (max-width: 400px) {
    form {
      padding: 0.15rem 0;
    }
    input {
      font-size: 0.89rem;
      padding: 0.2rem 0.3rem;
    }
    button {
      padding: 0.2rem 0.3rem;
      font-size: 0.89rem;
    }
  }
`;

const GeoButton = styled.button`
  background: none;
  border: none;
  margin-left: 0.5rem;
  cursor: pointer;
  color: #2563eb;
  display: flex;
  align-items: center;
  &:hover { color: #1e40af; }
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
  box-shadow: 0 1px 4px rgba(31,38,135,0.10);
  border: none;
`;

const Suggestions = styled.ul`
  position: absolute;
  background: rgba(255,255,255,0.97);
  color: #222;
  width: 340px;
  max-width: 94vw;
  margin-top: 2px;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(31,38,135,0.13);
  list-style: none;
  padding: 0;
  z-index: 100;
  li {
    padding: 12px 18px;
    cursor: pointer;
    border-radius: 7px;
    font-size: 1.07rem;
    &:hover {
      background: #e2e8f0;
    }
  }
`;

const QuickAccess = styled.div`
  margin-top: 10px;
  text-align: left;
  font-size: 1.01rem;
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
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(31,38,135,0.07);
  &:hover { background: #bae6fd; }
`;
