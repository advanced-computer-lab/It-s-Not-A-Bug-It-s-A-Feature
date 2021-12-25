![logo](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/client/myapp/src/assets/img/icons/whitelogo.png) 
![header](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/header.jpg)

OverReact is an Airline Reservation System through which users can reserve and pay for flights in order to travel to various countries and cities. :earth_americas: :airplane:

# Motivation :fire:
The purpose of this project is to learn how to work as a team on a large-scale MERN Stack project and meet specific Functional and Non-Functional Requirements. Learn how to deal with various APIs and write code in a consistent style.

# **Build Status** :hammer:
- The website currently offers round trips only. However, in the future we intend to offer one-way trips.

- The website allows you to choose one cabin class per reservation, in the future we may allow the same reservation to have different cabin classes.

- For reporting bugs or offering contributions or enhancements please check our Contributions section below.

# **Code Style** :scroll:
### We are following this [Code Style](.editorconfig) for consistency. 

# **Tech/Frameworks used**
## MERN Stack was used to create this project.
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

   #### MongoDB - document database
   #### Express(.js) - Node.js web framework
   #### React(.js) - a client-side JavaScript framework
   #### Node(.js) - the premier JavaScript web server

# **Features** :sparkles:

- Interesting news about the world's top travel destinations are featured at the Home page. :round_pushpin:
- Users can personalize their experience by adding their favourate quote and profile photo. :boy:
- Users can update their personal information any time.
- Users can search for flights and reserve them. :airplane: 
- Auto-complete of textboxes is supported to ease the search experience. :mag:
- Online payments are supported.
- Users are emailed with any changes the make in their resrevations or if a flight is edited or cancelled. :mailbox:


![Top Destinations](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/Top%20Destinations.PNG)
    

# **Installation** :arrow_down:

   ### A) Clone the Repository to your device :computer:

   ### B) Open 2 Terminals

   ### C) In the first terminal, run the front end by running the following commands in order:

```
cd client/myapp 
```

```
npm install
```

```
npm start
```

  ### D) In the second terminal, run the back end by running the following commands in order:

```
cd server 
```


```
node App.js
```



# **API Reference** :bookmark_tabs:

   [Axios](https://axios-http.com/docs/api_intro) for communication between the front end and back end
   
   [Stripe](https://stripe.com/docs/api) for online payments
   
   [Nodemailer](https://nodemailer.com/about/) for sending emails to clients :mailbox:


# **How to Use?**

   Open http://localhost:3000/search to view the homepage in your browser.


## In the Home Page, you can:

  ### A) Specify your Round Trip Details: :airplane: :mag:
   In the home page you can specify the dates of your departure and return, cabin class, number of travellers,
    and then click "Search" in order to find departure flights that match your preferences.
    
![Search Flights](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/search.PNG)

  ### B) Choose Departure Flight: :airplane:
   After clicking search, a list of all departure flights matching your search criteria will be displayed,
    from which you can choose your preferred departure flight. 
    
![Search Results](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/searchResult.PNG)

  ### C) Choose Return Flight: :airplane:
   After choosing a departure flight, click 'return flight' to view the list of return flights that match your
    search criteria, from which you can choose your preferred return flight.

  ### D) Reserve The Trip: 
   You can now reserve a flight by clicking 'Confirm Reservation'.
    
  ### D) Choose Seats: :seat:
   - You can then choose the seats you prefer both the departure plane and the return plane.

   - If you are not logged in, you will be prompted your username and password first.

![Login](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/LogIn.PNG)

   - If you do not have an account click "I Don't Have an Account" so you can sign up.
    
![Sign Up](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/signUp.PNG)

  ### E) Pay Using Credit Card: :credit_card:
   Finally, you can pay using a credit card (Do not enter real credit card information, this is only a demo). :moneybag:

![Payment](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/payment.png)

If you get this page, your transaction was successful. You should expect a confirmation email. 

![PaymentSuccess](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/PaymentSuccess.png)

If you get this page, your transaction has failed. You need to revise your card details and try again. 

![PaymentError](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/PaymentError.png)


  ## In My Profile Page, you can:

   ### A) Change Your Personal Details :boy:
   
   ![Edit Info](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/editInfo.PNG)

   
   ### b)  Change Your Password
   
![Change Password](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/changePassword.PNG)

   ### C) View Your Upcoming Flights:

   #### a) Cancel Reservation :x:
   
  #### b) Edit Reservation 

  ##### 1) Change Seats :seat:

![Change Seats](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/changeSeats.PNG)

 #####  2) Change Departure Flight

 #####  3) Change Return Flight

 #### c) Email Yourself With Your Trip Itenrary :mailbox:
   
   
        
  ## Admins can:
  
  ### A) View All Flights
   
   ![All Flights](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/AllFlights.PNG)

  ### B) Edit Flights
  
   If you wish to edit a flight, click the 'update' button in the All Flights Page on the right of the row of the flight you wish to update.
    
  ### C) Delete Flights
  
  If you wish to delete a flight, click the 'delete' button in the All Flights Page on the right of the row of the flight you wish to delete.
  
  ### D) Create New Flights

   ![New Flight](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/createFlight.PNG)

  ### E)  Search for a Flight :mag:

![Admin Search](https://github.com/advanced-computer-lab/It-s-Not-A-Bug-It-s-A-Feature/blob/dev3/Screenshots/adminSearch.PNG)

  ## In the About Us Page:
   You can find out more about us, OverReact Team. You can find different social media platforms through which you can contact us. :grinning:


# **Contribute** :handshake:

   If you would like to contribute to our website, check our [Contribution Guidelines](CONTRIBUTING.md) 
    

# **Credits** :star2:

### The main resources we used in creating this project are:

  https://blog.logrocket.com/mern-stack-tutorial/

  https://www.youtube.com/watch?v=leNCfU5SYR8

  https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

  https://www.youtube.com/watch?v=mI_-1tbIXQI

  https://www.youtube.com/watch?v=71wSzpLyW9k

  https://www.youtube.com/watch?v=lbEFSP1WAv0

  https://www.youtube.com/watch?v=7CqJlxBYj-M

  https://ant.design/components/auto-complete/

# **License** :copyright:
  [MIT License](LICENSE)
