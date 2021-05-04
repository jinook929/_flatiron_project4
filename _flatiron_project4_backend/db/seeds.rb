# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: "abc@users.com", password: "123")
User.create(email: "aaa@users.com", password: "123")

Notice.create(title: "20190426", description: "The schedule for this week is: Monday - Advanced Function Usage (finish) / Tuesday - Object-Orientation in JavaScript (All) / Wednesday - Object-Oriented JavaScript Inheritance (All) / Thursday - Prototypal Inheritance (All) / Friday - OPTIONAL Additional Practice. At 1 PM EST today we will be continuing the live build and adding full CRUD functionality. This session will be recorded and will turn into an OOH if there is time left over! Check out these ES6 challenges for some extra practice!", category: "Today's Works", user_id: 1)
Notice.create(title: "20190427", description: "Today’s goal is to complete all lessons in the Object-Orientation in JavaScript section! We have a study session at 11 AM EST where we will cover ES6! Note that we have an additional study session this Friday at 12 PM EST in which we will focus on execution context and the this keyword. We will touch on these topics today but we will need more time than we have today! Plus, it will be helpful to revisit these concepts following the OOJS lecture!", category: "Today's Works", user_id: 1)
Notice.create(title: "BALOCK", description: "I just added this document to the homeroom page: BALOCK. It is a HUGE resource document that I recommend you check out!", category: "Tips", user_id: 2)
Notice.create(title: "Tuesday Study Group", description: "study session starting now --> https://flatironschool.zoom.us/j/6137234275?pwd=SFNmQUIvT0tRaHlDaVYrN3l5bzJVQT09", category: "Meetings", user_id: 2)