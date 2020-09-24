Overview 
--

> This is a Node.js Api to handle Authentication, we can use this api in any other project to authenticate the users, this api uses the famous JWT method of authentication and bcrypt.js to hash the password, it also uses MonogoDB as the database.

features 
--
 ###  **Registering a _new_ user**
<img width="1392" alt="Screen Shot 2020-09-24 at 2 40 13 PM" src="https://user-images.githubusercontent.com/38424188/94135047-f39bf580-fe73-11ea-9256-be5cdef248b4.png">

### **Login to get the JWT token**
![Screen Shot 2020-09-23 at 8 04 06 PM](https://user-images.githubusercontent.com/38424188/94135607-c1d75e80-fe74-11ea-9d2d-fc20478b575a.png)

- for login mistakes in email and password, we made a dedicated code to validate the email & password using the "@hapi/Joi" model, so if the password was less than 6 chars it will show the corresponding msg that it isn’t valid, if the email isn't valid it will show you "email must be valid" msg.
```
const registerValidation = (data) => {
  //data validation
  //according to new version
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
}; 
```
### **what do you do with the token given?**
when you take the login token given and put it in the headers field, it will show you the private posts that only the person logged in should see, this is a much more secure way than the none secure session id.

![Screen Shot 2020-09-23 at 8 08 08 PM](https://user-images.githubusercontent.com/38424188/94144521-47154000-fe82-11ea-8608-73cd8b1f9c37.png)


we also made some code to **hash your password**, as you can see it became understandable gibberish in the collection db -so even staff cant see it- using 
bcrypt. 

```
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
```
<img width="1044" alt="Screen Shot 2020-09-24 at 4 35 44 PM" src="https://user-images.githubusercontent.com/38424188/94145812-264dea00-fe84-11ea-9a66-a43595c5ce40.png">

