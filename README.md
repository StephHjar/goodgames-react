# GoodGames

Welcome to the DRF API for GoodGames!

GoodGames is a website where you can share the video games you're currently playing, and leave a review for each game. You can like other users' posts, reviews, and games, and leave comments on other users' "Currently Playing" posts.

This is the backend API database, built with Django REST Framework. The deployed version of the API is HERE, and the deployed version of the full site built in React is HERE.

## Entity Relationship Diagram

In the planning stage of this project, I created this Entity Relationship Diagram (ERD) to better visualize the relationships between models in the database.
![ERD for GoodGames database](static/readme/PP5-ERD.png)

## User Stories

I have divided the functionality of the site and database into epics and user stories:

### **Epic:** Account Management

**User Stories:**

- As a **user** I can **sign up for an account** so that I can **make and like posts, and add games**
- As a **user** I can **log in and out of my account** so that I can **access the site from different devices and keep my account secure**
- As a **user** I can **add a profile photo and description** so that **I can personalise my profile**
- As a **user** I can **request to reset my password via email** so that **I can log back in to my account if I forget my login details**
- As a **user** I can **delete my profile** so that **my personal details are not saved if I don't want to use the site anymore**

### **Epic:** Managing Posts

**User Stories:**

- As a **user** I can **add a new post** so that **I can show when I start playing a game**
- As a **user** I can **edit my posts** so that **I can make updates, or mark when I have finished playing the game**
- As a **user** I can **delete my posts** so that **I can remove posts made in error, or that I don't want displayed on my profile anymore**
- As a **user** I can **like and unlike other users' posts** so that **I can engage with content that I enjoy**

### **Epic:** Managing Comments

**User Stories:**

- As a **user** I can **comment on other users' posts** so that **I can engage in conversations with other users**
- As a **user** I can **edit comments I have made** so that **I can correct mistakes in my comments**
- As a **user** I can **delete comments I have made** so that **I can remove comments posted by mistake**

### **Epic:** Managing Games

**User Stories:**

- As a **user** I can **request to add a new game to the site's database** so that **I can leave reviews and share the game on my profile**
- As a **user** I can **request edits to an existing game** so that **the information on the site is correct**
- As a **user** I can **add a review to a game** so that **I can share my thoughts on the game with other users**
- As a **user** I can **edit or delete my own reviews** so that **I can fix errors or change my review if my opinions change**
- As a **user** I can **like other users' reviews** so that **I can engage with other reviews I agree with**

### **Epic:** Admin Capabilities

**User Stories:**

- As a **site admin** I can **add, edit, and delete games from the database** so that **users have the most up-to-date list of games to choose from**
- As a **site admin** I can **remove posts or comments if they are not appropriate or relevant** so that **the site is enjoyable and accessible to all users**
- As a **site admin** I can **see lists of all user profiles, posts, games, reviews, likes, and comments** so that **I have an overview of all activity on the site**

## Testing

### Manual Testing

### Validator Testing

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fcode-institute-org.github.io%2Flove-running-2.0%2Findex.html)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvalidator.w3.org%2Fnu%2F%3Fdoc%3Dhttps%253A%252F%252Fcode-institute-org.github.io%252Flove-running-2.0%252Findex.html&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en#css)

### Unfixed Bugs

You will need to mention unfixed bugs and why they were not fixed. This section should include shortcomings of the frameworks or technologies used. Although time can be a big variable to consider, paucity of time and difficulty understanding implementation is not a valid reason to leave bugs unfixed.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub)

## Credits

### Content

### Media

- I used [Canva](https://www.canva.com/) to create the GoodGames Logo.
- I used [CloudConvert] to convert images to WEBP format.
- I used [Favicon Generator](https://favicon.io/) to create my favicon.
- The sign up form photo is by by [Javier Martinez](https://unsplash.com/@cjdante?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/hUD0PUczwJQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
- I used [Color Picker](https://imagecolorpicker.com/en) to generated hex codes for colours from images.
