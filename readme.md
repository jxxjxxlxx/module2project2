## Hey hackers !

petlove.com is a website where shelters, rescues, and private owners list their pets for adoption. We don’t have the pets ourselves!

---

## You'll find the mission details below

- all pets are fetched from a mongo database

- the final user is able to signup and signin

- logged in Admin is able to create new pets

- logged in users are able to like and add pets as their favorites

- logged in Admin is able to delete some pets.

---

---

## Shop pages :

(see bonus below)

---

## DB Schemas

- User {  
   name: String,  
   lastname: String,  
   email: String,  
   password: String,
  admin:Boolean,
  favorite: [{type: [Schema.types.ObjectId, ref:"dog_Id" ]}
  }

- Dog {  
   breed:String,
  name: String,  
  img:String,
  description: String,  
  Location: String,  
   Adopted: Boolean,  
   ID_owner: [{String: [Schema.types.ObjectId, ref:"user_Id" ]}
  }

---

## .env infos

- PORT=
- MONGO_URI=
- CLOUDINARY_NAME=
- CLOUDINARY_KEY=
- CLOUDINARY_SECRET=
- SESSION_SECRET=

---

## Delivery

---

## Bonuses

---

## Hardcore bonus
