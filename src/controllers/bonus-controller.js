import axios from 'axios'

export const bonus = async (req, res) => {
  try {
    // Fetch data from a url endpoint
    const response = await axios({
      method: 'get',
      url: 'https://pokeapi.co/api/v2/pokemon'
    })
    // Data validation
    response.data !== []
      ? res.status(200).json({ dataBonus: response.data.results })
      : res.status(404).json({ message: 'Data not found' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
