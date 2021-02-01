# Note-Taker


## About
Note-Taker is a Rest Api that allows people create, read, update and delete unique users, create, read, update and delete amazing notes seamlessly. Also with added feautures like exporting of notes to any file format and many other cool features.
Inspired by [Tania Rascia's](https://taniarascia.com) [Takenote.dev](https://takenote.dev). 
Note-Taker creates user by simply using a unique username and email, nothing else. For taking notes, all that's needed 
is a title and a body and you're good to go. It also allows users to export their notes in formats e.g a doc file;

###### Scenerios
	- Imagine going out without a laptop hanging close by, users can create notes and export them to any file format for free e.g the .doc format for MsWord Documents, without downloading any apps. (same with .pdf format [which I am currently working on]) 

Note-Taker is currently not hosted on any platform yet and many considerations are still being made;
 
	- As per the fact of using mongodb as its database (seeing there's firebase), 
	- No thoughts on UI designs have been made yet, 
	- No Frontend thoughts yet and all that. 

So for now, it's more like open source, feel free to contribute at anytime, and if you've got any issues or additional features, let me know or you could just go ahead and make a pull request. Have Fun and I hope this reaches you well 💖!


## Installation/How to Run

```sh
$ git clone https://github.com/adewolejosh/Note-Taker.git
$ npm install express mongoose pdfkit --save
$ cd Note-Taker
$ node index.js
```

- Launch your browser (Or even better, **PostMan** is preferable) 
- Go to localhost:3000 (this can be changed in the index.js file)

###### P.S: 
- I didn't take into consideration the npm/nodejs/mongodb setup as it is system variant.
- Almost all operations require the User's ObjectId in headers except e.g the creation of a New User.
- Endeavor to check db/db.js to make sure your database url corresponds.


## Authentication

Easy authentication 
- __Username__ (unique) 
- __Email__ (unique)

##### localhost:{port}/users
- GET (get a user(specifically to get their ObjectId))
- POST (create a new user)
- UPDATE (update user's details)
- DELETE (delete a user)


## Note 

Note 
- __Title__
- __Body__

##### localhost:{port}/notes 
- GET (all notes created from a User) 
- POST (create one new note as a User) 

##### localhost:{port}/notes/:noteId
- GET (get one note)
- UPDATE (update one note)
- DELETE (delete one note)

##### localhost:{port}/note/converter
- GET (export your notes in any format e.g .doc(Microsoft Word Document format))

##### localhost:{port}/note/pdf
- GET (export your notes in a pdf format)


## Additional features being considered:
	- Allow for users to upload documents and convert them into a Note-Taker's note.
	- Saving notes as little chunks of files instead of just strings
	- Creating a Note-Taker file format e.g .nt
	- Many other cool stuff


## Author
Joshua Adewole 
[Github](https://github.com/adewolejosh) [Twitter](https://twitter.com/adewole_josh/) [Website](https://adewolejosh.herokuapp.com)