import axios from 'axios'

export class GogoanimeApi {
    BASE_URL: string

    constructor() {
        this.BASE_URL = "https://gogoanime-api.herokuapp.com/api/v1";
    }

    async getAnimeIframeUrl(id: string): Promise<any> {
        return axios.get(this.BASE_URL + "/AnimeEpisodeHandler/" + id).then(response => {
            return response.data;
        });
    }

    async getAnimeDirectLink(iframe: string): Promise<any> {
        return axios.get(this.BASE_URL + "/DecodeVidstreamingIframeURL/" + iframe).then(response => {
            return response.data;
        })
    }
}

