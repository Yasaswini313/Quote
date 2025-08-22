# Quote API

A simple RESTful API that returns a random inspirational quote, with IP-based rate limiting.

## Setup

1. Install Node.js (v14+ recommended).
2. Clone/download this repository.
3. Install dependencies:

   ```
   npm install
   ```

4. Start the server:

   ```
   npm start
   ```

5. The API will be available at: `http://localhost:3000/api/quote`

## Usage

### Get a random quote

```
curl http://localhost:3000/api/quote
```

**Example response:**
```json
{
  "quote": "The only way to do great work is to love what you do. - Steve Jobs"
}
```

### Rate Limiting

- Each IP can make **5 requests per minute**.
- If exceeded, you'll get:

```json
{
  "error": "Rate limit exceeded. Try again in X seconds."
}
```

## Design Decisions

- Used `express-rate-limit` for robust, thread-safe in-memory rate limiting.
- No persistent storage or database required.
- All requests are logged (IP and status code).

## Backend Endpoint

- `GET /api/quote`
