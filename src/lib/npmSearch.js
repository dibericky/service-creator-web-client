import axios from 'axios'

export default async function npmSearch(searchKey, {limit}) {
    const {data} = await axios.get('/api/dependencies', {
        params: {
            limit,
            q: searchKey
        }
    })
    return data
}