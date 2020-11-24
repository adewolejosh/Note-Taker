# Note-Taker


## About
Note-Taker is a Rest Api that allows people create unique users, create, update and delete amazing notes seamlessly. 
Inspired by [Tania Rascia's](https://taniarascia.com) [Takenote.dev](https://takenote.dev). 
Note-Taker creates user by simply using a unique username and email, nothing else. For taking notes, all that's needed 
is a title and a body and you're good to go. It also allows users to export their notes in formats e.g a doc file; In a scenerio whereby you don't have a system nearby, users can create amazing notes, export in MsWord format and later edit with MsWord or it's likes and save for later; Same goes for the pdf format, which I am currently working on. 
Note-Taker is currently not hosted on any platform yet and many considerations are still being made; as per the fact of using mongodb as its database (seeing there's firebase), no UI designs have been made yet, no  Frontend thoughts yet and all that. So for now, it's more like open source, feel free to contribute at anytime, and if you've got any issues or additional features, let me know or you could just go ahead and make a pull request. Have Fun and I hope this reaches you well 💖!

### Installation/How to Run

'''sh
$ git clone https://github.com/adewolejosh/Note-Taker.git
$ npm install express mongoose --save
$ cd Note-Taker
$ node index.js
'''

- Launch your browser (Or even better, **PostMan** is preferable) 
- Go to localhost:3000 (this can be changed in the index.js file)



###### P.S: 
- I didn't take into consideration the mongodb setup as it is system variant.
- Almost all operations require the User's ObjectId except the creation of a New User.
- Endeavor to check db/db.js to make sure your database url corresponds.

### Authentication

Easy authentication 
- __Username__ (unique) 
- __Email__ (unique)

##### localhost:{port}/users/
- GET 
- POST 
- UPDATE 
- DELETE 

### Note 

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
- GET (export your notes in any format e.g doc)