class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.string :content
      t.integer :notice_id
      t.integer :user_id
      t.string :username

      t.timestamps
    end
  end
end
