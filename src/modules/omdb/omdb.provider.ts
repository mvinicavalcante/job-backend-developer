import axios, { AxiosInstance } from 'axios';

export class OmdbProvider {
  private static readonly BASE_URL = 'http://www.omdbapi.com/';
  private static readonly API_KEY = 'aa9290ba';
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: OmdbProvider.BASE_URL,
      params: {
        apikey: OmdbProvider.API_KEY,
      },
    });
  }

  public async searchMovies(search: string) {
    const response = await this.axiosInstance.get('', {
      params: {
        s: search,
      },
    });
    return response.data;
  }

  public async getMovieByImdbID(id: string) {
    const response = await this.axiosInstance.get('', {
      params: {
        i: id,
      },
    });
    return response.data;
  }
}
