import type { Client as Client } from "./models/Client";

const baseUrl = "http://localhost:5206";

const getText = async (endpoint: string): Promise<String | null> => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.text() as String;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const get = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json() as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const post = async <T>(endpoint: string, data: any): Promise<T | null> => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json() as T;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};

const put = async <T>(endpoint: string, data: T): Promise<T | null> => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json() as T;
  } catch (error) {
    console.error("Error putting data:", error);
    return null;
  }
};

const del = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json() as T;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
};

export class ApiService {
  async getClients(): Promise<Client[] | null> {
    return await get<Client[]>("api/Client");
  }

  async exportClients(): Promise<String | null> {
    return await getText("api/Client/export");
  }

  async getClient(id: number): Promise<Client | null> {
    return await get<Client>("api/Client/" + id);
  }

  async deleteClient(id: number): Promise<Client | null> {
    return await del<Client>("api/Client/" + id);
  }

  async addClient(data: Client): Promise<Client | null> {
    return await post<Client>("api/Client", data);
  }

  async editClient(data: Client): Promise<Client | null> {
    return await put<Client>("api/Client/" + data.id, data);
  }
}
