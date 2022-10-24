# jaah-whatssapp-web-js

Send message

  

Sample request:

curl -X POST http://localhost:8080/sendmsg \
  
{
      "number": "962799849386",
      "message": "the number is not registered"
}

Sample response:

{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "firstName": "John",
  "middleName": "Doe",
  "nickName": "Zen",
  "email": "zed@allegro.pl",
  "createdAt": "2012-01-01T12:00:00.000Z",
  "updatedAt": "2012-01-01T13:00:00.000Z"
}