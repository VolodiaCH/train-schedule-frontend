export class ApiService {
  static async request<T, Body = unknown>(
    url: string,
    method: string,
    body?: Body
  ): Promise<T> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('access_token')
        : null;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      switch (response.status) {
        case 401:
          localStorage.clear();
          window.location.href = '/sign-in';

          break;
        case 404:
          window.location.href = '/not-found';

          break;
        default:
          break;
      }

      throw new Error(`Error ${response.status}: ${await response.text()}`);
    }

    return response.json() as Promise<T>;
  }

  static get<T>(url: string): Promise<T> {
    return this.request<T>(url, 'GET');
  }

  static post<T, Body>(url: string, body: Body): Promise<T> {
    return this.request<T, Body>(url, 'POST', body);
  }

  static put<T, Body>(url: string, body: Body): Promise<T> {
    return this.request<T, Body>(url, 'PUT', body);
  }

  static patch<T, Body>(url: string, body: Body): Promise<T> {
    return this.request<T, Body>(url, 'PATCH', body);
  }

  static delete<T>(url: string): Promise<T> {
    return this.request<T>(url, 'DELETE');
  }
}

export default ApiService;
