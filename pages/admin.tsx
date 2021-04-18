import React from 'react';

function Admin() {
  const registerWindFarm = async (event: any) => {
    event.preventDefault();

    const res = await fetch('/api/register/wind/farm', {
      body: JSON.stringify({
        name: event.target.name.value,
        // type: event.target.type.value,
        manufacturer: event.target.manufacturer.value,
        windfarm: event.target.name.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();
  };
  const registerWindTurbine = async (event: any) => {
    event.preventDefault();

    const res = await fetch('/api/register/wind/turbine', {
      body: JSON.stringify({
        name: event.target.name.value,
        windfarm: event.target.windfarm.value,
        manufacturer: event.target.manufacturer.value,
        model: event.target.model.value,
        location: event.target.location.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const result = await res.json();
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="RegisterWindFarm">RegisterWindFarm</label>
        <form onSubmit={registerWindFarm}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" autoComplete="name" required />
          <label htmlFor="type">Type</label>
          <select required>
            <option value="WindFarmLandBased">Land Based</option>
            <option value="WindFarmOffShore">Off Shore</option>
          </select>
          <label htmlFor="manufacturer">Constructor</label>
          <input id="manufacturer" type="text" autoComplete="manufacturer" required />
          <button type="submit">Register</button>
        </form>
      </div>
      <div>
        <br></br>
      </div>

      <div>
        <label htmlFor="RegisterWindTurbine">RegisterWindTurbine</label>
        <form onSubmit={registerWindTurbine}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" autoComplete="name" required />
          <label htmlFor="name">WindFarm</label>
          <input id="windfarm" type="text" autoComplete="windfarm" required />
          <label htmlFor="manufacturer">Manufacturer</label>
          <input id="manufacturer" type="text" autoComplete="manufacturer" required />
          <label htmlFor="model">Model</label>
          <input id="model" type="text" autoComplete="model" required />
          <label htmlFor="location">Location</label>
          <input id="location" type="text" autoComplete="location" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
