# Create Blogs for Authenticated Users

* Create separate endpoints for user to create update and delete blog
* use the same components in the front end
* use the same controller methods in the backend
* only change the submit endpoint based on user role
* if user is admin this what the route looks like:
  
  ```javascript
    router.post('/blog', requireSignin, adminMiddleware, create);
  ```

* if user is a regular user this is what the route looks like:
  
  ```javascript
    router.post('/blog', requireSignin, adminMiddleware, create);
  ```
  