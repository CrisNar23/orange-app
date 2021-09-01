# Orange-app

## Steps for project installation

1. Create a MongoDB database named orangeAppDB into your local machine or in an cloud Atlas MonngoDB.
2. Replace **DB_CNN** variable with your connection string `mongodb://127.0.0.1:27017/orangeAppDB` or the string connection priveded by Atlas MongoDB.
3. Into the root folder **orange-app** type in the command line `npm i` for packages installation.
4. Run the project typing in the command line `npm start` or `npm run dev`.
5. In the postman folder is located a file with the collection to test the endpoints created in this application. To import the collection go to the file option in the top of Postman window and click on Import option. Then choose the file option and select `Orange App.postman_collection.json`.
6. To test the endpoints you must generate a token with signin request and copy this into `x-access-token` value.