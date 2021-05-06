# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: "ann@email.com", password: "123", username: "ANN")
User.create(email: "lurk@email.com", password: "123", username: "LURK")
User.create(email: "eve@email.com", password: "123", username: "EVE")
User.create(email: "abc@email.com", password: "123", username: "ABC")

sleep 1
Notice.create(title: "20210426", description: "Good morning!! Welcome to week 3 of JS! The schedule for this week is: Monday - Advanced Function Usage (finish), Tuesday - Object-Orientation in JavaScript (All), Wednesday - Object-Oriented JavaScript Inheritance (All), Thursday - Prototypal Inheritance (All), Friday - OPTIONAL Additional Practice. At 1 PM EST today we will be continuing the live build and adding full CRUD functionality. This session will be recorded and will turn into an OOH if there is time left over! Check out these ES6 challenges for some extra practice! Keep up the good work, everyone!!!!", category: "Today's Works", user_id: 1)
sleep 1
Notice.create(title: "BALOCK", description: "I just added this document to the homeroom page: BALOCK. It is a HUGE resource document that I recommend you check out! https://github.com/leonardomso/33-js-concepts << This one in particular!", category: "Tips", user_id: 3)
sleep 1
Notice.create(title: "Live Build", description: "here live build full CRUD functionality starting now --> https://flatironschool.zoom.us/j/6137234275?pwd=SFNmQUIvT0tRaHlDaVYrN3l5bzJVQT09", category: "Meetings", user_id: 2)
sleep 1
Notice.create(title: "20210427", description: "Good morning!!! Today’s goal is to complete all lessons in the Object-Orientation in JavaScript section! We have a study session at 11 AM EST where we will cover ES6! Note that we have an additional study session this Friday at 12 PM EST in which we will focus on execution context and the this keyword. We will touch on these topics today but we will need more time than we have today! Plus, it will be helpful to revisit these concepts following the OOJS lecture! After tomorrow’s lessons you should be prepared to complete the following challenges: ES6, Advanced Functions, OOP Challenge, ES6 Exercises, Execution Context Exercises. Keep up the good work!!", category: "Today's Works", user_id: 1)
sleep 1
Notice.create(title: "Study Group", description: "here study session starting now! --> https://flatironschool.zoom.us/j/6137234275?pwd=SFNmQUIvT0tRaHlDaVYrN3l5bzJVQT09", category: "Meetings", user_id: 2)
sleep 1
Notice.create(title: "20210428", description: "Good Morning!!! Today’s goal is to complete all lessons in the Object-Oriented JavaScript Inheritance section! We have a study session at 11 AM EST on Object Oriented JS. We will be focusing on how JS is prototype-based rather than class-based. I know many of you may not have gotten to the prototype lessons yet, but do not worry! I think it will be easier to understand OOJS if we dive straight into prototypes today Keep up the good work, everyone!!", category: "Today's Works", user_id: 1)
sleep 1
Notice.create(title: "Study Group", description: "study session starting now --> https://flatironschool.zoom.us/j/6137234275?pwd=SFNmQUIvT0tRaHlDaVYrN3l5bzJVQT09", category: "Meetings", user_id: 2)
sleep 1
Notice.create(title: "Too Much...", description: "Seriously 4 days left until project week!!! All in 3 weeks versus 2 months of Ruby and Rails.... no wonder why I am so lost! Am I right? LOL", category: "etc", user_id: 4)
sleep 1
Notice.create(title: "20210429", description: "Good morning!! Today’s goal is to complete all lessons in the Prototypal Inheritance section! We have a study session at 11 AM EST. We will cover the project requirements and then start converting our live build code to utilize the class syntax! PLEASE be sure to attend today’s session or watch the recording as there are a few requirements that need clarifying!! You all are doing an amazing job!!", category: "Today's Works", user_id: 1)
sleep 1
Notice.create(title: "Study Group", description: "here study session beginning now --> https://flatironschool.zoom.us/j/6137234275?pwd=SFNmQUIvT0tRaHlDaVYrN3l5bzJVQT09", category: "Meetings", user_id: 2)
sleep 1
Notice.create(title: "GROUP TABS for Chrome", description: "GOOGLE JUST ADDED THE ABILITY TO GROUP TABS. I AM EXCITED", category: "Tips", user_id: 3)
sleep 1
Notice.create(title: "Additional Resource", description: "I have added this additional resource to the homeroom page. It is some info on getting started with your projects. You will see linked in that file a link to a repo with a sample file structure for your applications. The example has both frontend AND backend in a single repo (remember you can go back and watch the rails as an api study session to see this repo built out live!) You can also create two separate repositories - one for your frontend and one for your backend. REMINDER: your frontend and backend have NO inherent connection. The only thing that connects them in any way is when you make fetch requests. You could built out 100 applications that ALL make fetch requests to that same rails api. Think about any public api that you have used - there might be thousands of people building applications that request to that same API! In our case, you are building these apis specificlaly to serve your frontend but that does NOT “connect” them and it does not mean that you could not use that api to serve another frontend application, too! ALSO: do NOT be intimidated by the same rails/js projects that are linked on canvas. You are NOT expected to build out anything that huge! I have no doubts that all of you CAN but that would be a major feat in a week!", category: "Tips", user_id: 3)
sleep 1
Notice.create(title: "20210430", description: "Good Morning!!! TGIF! Today’s goal is to complete the Additional Practice lessons. These will be great prep for your projects! We have OOH at 11 AM EST followed by a mini lecture on execution context! I have added the OOHs for next week to the calendar. I will add more as needed! I will also be adding some live build sessions to finish off our todo list app! I am working on some cheatsheets about execution context and fetch/then! Should have at least one of them up today! Keep up the good work and have a great weekend, everyone!", category: "Today's Works", user_id: 1)
sleep 1
Notice.create(title: "Extra Study Group", description: "execution context session starting now --> https://flatironschool.zoom.us/j/6137234275?pwd=SFNmQUIvT0tRaHlDaVYrN3l5bzJVQT09 (just updated the calendar event to the correct url!)", category: "Meetings", user_id: 2)
sleep 1
Notice.create(title: "Additional Resource", description: "I put together an execution context cheatsheet! It is on the homeroom page! Links in the cheatsheet are some exercises you can use to get in some practice!", category: "Tips", user_id: 3)
sleep 1
Notice.create(title: "Social!!!", description: "here social starting now!!!!! --> https://flatironschool.zoom.us/j/91775967563?pwd=dTVreXJLQXFzdVNrTUp0aVpZUzdJUT09", category: "Meetings", user_id: 2)
sleep 1
Notice.create(title: "One More Person!", description: "Yo people we need ONE more person for codenames", category: "etc", user_id: 2)
sleep 1
Notice.create(title: "Our Star~", description: "ZBF was featured by flatiron!", category: "etc", user_id: 3)

Comment.create(content: "Hi there~", notice_id: 18, user_id: 4, username: "ABC")
sleep 1
Comment.create(content: "Hey~~~", notice_id: 18, user_id: 2, username: "LURK")