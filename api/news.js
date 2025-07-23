export default async function handler(req, res) {
  const { page, pageSize, country, category } = req.query;

  const apiKey = process.env.NEWS_API_KEY; // Use plain name, no REACT_APP_

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
