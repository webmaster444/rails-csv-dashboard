class AddTagsIdToMaps < ActiveRecord::Migration[5.1]
  def change
    add_column :maps, :tags_id, :int
  end
end
