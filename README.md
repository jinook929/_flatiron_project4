# WeBoard JS Single Page App

by Jinook Jung

* * * * * * * * * *

## How To Set Up the App

1. Visit my [Github repository](https://github.com/jinook929/_flatiron_project4) and clone the code to your local directory:

 `git clone https://github.com/jinook929/_flatiron_project4.git`

2. Enter into the *_flatiron_project4/_flatiron_project4_backend* folder: `cd _flatiron_project4/_flatiron_project4_backend`.
3. Execute `bundle install` and run `rails s` in terminal.
4. Then, change directory to *_flatiron_project4/_flatiron_project4_frontend* folder: `cd ..` & `cd _flatiron_project4/_flatiron_project4_frontend`.
5. Open the `index.html` in your browser (*please avoid using live server*).

## How To Use the App

1. You can either sign up for your own account or use the existing accounts to log in (4 users are pre-set: `ann@email.com`, `lurk@email.com`, `eve@email.com`, `abc@email.com` [password for everyone is `123`]).
2. Before logging in, user can see all the notices.
3. Each notice has its category (please refer to the keys).
4. After logging in, you can create new notices/comments, and edit or delete your own notices.
5. Keyword search is available for any user via the search box on the navbar.
6. There are a couple of Easter Eggs, so try to find them~^^√

## Screen Captures

### Landing Page

![Landing Page](./_flatiron_project4_frontend/images/01_landing.png)

### Signup Modal

![Signup Modal](./_flatiron_project4_frontend/images/02_signup_modal.png)

### Login Modal

![Login Modal](./_flatiron_project4_frontend/images/03_login_modal.png)

### New Notice Modal

![New Notice Modal](./_flatiron_project4_frontend/images/04_new_notice_modal.png)

### Notice Card (not owned)

![Notice Card (not owned)](./_flatiron_project4_frontend/images/05_notice_card.png)

### Notice Card (owned)

![Notice Card (owned)](./_flatiron_project4_frontend/images/06_notice_card_owned.png)

### Notice Card (editing mode)

![Notice Card (editing mode)](./_flatiron_project4_frontend/images/07_notice_card_edit.png)

### Search Function (found)

![Search Function (found)](./_flatiron_project4_frontend/images/08_search.png)

### Search Function (not found)

![Search Function (not found)](./_flatiron_project4_frontend/images/09_search_not_found.png)

## Data Structure

### Tables

#### users

``` ruby
  t.string :email
  t.string "username"
  t.string :password_digest
  ...
```

#### notices

``` ruby
  t.string :title
  t.string :description
  t.string :category
  t.integer :user_id
  t.datetime :updated_at
  ...
```

#### comments

``` ruby
  t.string :content
  t.integer :user_id
  t.integer :notice_id
  ...
```

### Model Associations & Validations

#### User

``` ruby
  has_many :notices, dependent: :destroy
  has_many :comments, through: :notices

  has_secure_password
  validates :email, presence: true
  validates_uniqueness_of :email, :case_sensitive => false
```

#### Notice

``` ruby
  belongs_to :user
  has_many :comments, dependent: :destroy

  validates_presence_of :title, :description, :category, :user_id
```

#### Comment

``` ruby
  belongs_to :notice

  validates_presence_of :content, :user_id, :notice_id
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jinook929/_flatiron_project4. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](contributor-covenant.org) code of conduct.

## Contributors

* Jinook Jung <jinook929@gmail.com>

## License & Copyright

© Jinook Jung

The app is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
