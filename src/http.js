/**
 * EasyHTTP3 Library
 *
 * @ Author: Sitharaman Deepak Guptha
 * @ Description: Library for making the HTTP Requests
 */

class EasyHTTP {
  // Make a HTTP Get Request
  async get(url) {
    const response = await fetch(url);
    const respData = await response.json();
    return respData;
  }

  // Make a HTTP Post Request
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    });

    const respData = await response.json();
    return respData;
  }

  // Make a HTTP PUT Request
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const respData = await response.json();
    return respData;
  }

  // Make a HTTP Delete Request
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const respData = await "Resource Deleted";
    return respData;
  }
}

// Export the EasyHTTP Class
export const http = new EasyHTTP();
