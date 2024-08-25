# BIMP Testing

## Prerequisites

Requirements:

- Docker.
- Node.js.

## Installation

1. Clone the repository.

```bash
git clone https://github.com/Fluffymuzzy/bimp_testing.git
```
2. Create a `.env` file and copy the variables from `.env.example` or use your own variables.

```plaintext
PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
DB_SCHEMA=public
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}"
```
## Running the project

1. Run the project with Docker.

```bash
docker compose up --build
```

2. Application will be available at `http://localhost:3000`.

3. The PostgreSQL database will also be running in a separate container.

## Testing 

You can test the API using tools like Postman, Insomnia or cURL. Below are some examples of how to test the API.

### Endpoints

1. **Register a User**

   - **URL**: `/auth/register`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "email": "example@example.com",
       "name": "Example",
       "password": "password"
     }
     ```

   - **Response**:
     - **Success**: Returns a success message and user base64 encoded credentials.
     - **Error**: Returns an error message if the user cannot be created.

2. **Login a User**

   - **URL**: `/auth/login`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "email": "example@example.com",
       "password": "password"
     }
     ```

   - **Response**:
     - **Success**: Returns a success message and user base64 encoded credentials.
     - **Error**: Returns an error message if the login fails.

3. **Get All Messages**

   - **URL**: `/messages/list` or `/messages/list?page=value&limit=value`
   - **Method**: `GET`
   - **Headers**:
     - **Authorization**: `Basic <base64-encoded-credentials>`
   - **Response**:
     - **Success**: Returns an array of messages and user who created them.
     - **Error**: Returns an error message if messages cannot be retrieved.

4. **Get a Message by ID**

   - **URL**: `/messages/content/:id`
   - **Method**: `GET`
   - **Headers**:
     - **Authorization**: `Basic <base64-encoded-credentials>`
   - **Response**:
     - **Success**: Returns the message object and user who created it.
     - **Error**: Returns an error message if the message is not found.

5. **Create a New Message (Text)**

   - **URL**: `/messages/text`
   - **Method**: `POST`
   - **Headers**:
     - **Authorization**: `Basic <base64-encoded-credentials>`
   - **Request Body**:
     ```json
     {
       "text": "Hello, world!",
     }
     ```

   - **Response**:
     - **Success**: Returns the created message object.
     - **Error**: Returns an error message if the message cannot be created.


7. **Create a New Message (File)**

   - **URL**: `/messages/file`
   - **Method**: `POST`
   - **Headers**:
     - **Authorization**: `Basic <base64-encoded-credentials>`
   - **Request Body**:
     - **file**: The file to be uploaded.
   - **Response**:
     - **Success**: Returns the created message object.
     - **Error**: Returns an error message if the message cannot be created.

### Note on Auth

After registering or logging in, you will receive a base64 encoded credentials in the response. You can use this credentials to authenticate your requests.





