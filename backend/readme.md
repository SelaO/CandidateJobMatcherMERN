to run this:

1. make sure you have mongodb installed and mongod running
2. npm install
3. node src/init.js to fill the db with items
4. npm start to get the server running


To make lookup faster I added a many to many relationship between the Candidates and Skills entities, see dbUtils.createCandidate()
I'm aware there might be problems with race conditions where a candidate is added and then fetched before its skills are updated
