class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status} ${res.statusText}`);
    }
  }

  getItems() {
    return fetch(`${this._url}/items`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  createItem(item) {
    return fetch(`${this._url}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: item,
      }),
    }).then(this._checkResponse);
  }

  deleteItem(id) {
    return fetch(`${this._url}/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;
