Mongo DB 
```
db.books.insertMany(
[
    {
        title: "string",
        description: "string",
        authors: "string"

    },
    {

        title: "string",
        description: "string",
        authors: "string"
    }
]
)

db.books.find({title: "string"})

db.books.findOneAndUpdate({"_id": "id"}, {"description": "string", "authors": "string"})

// db.books.findByIdAndUpdate(_id,  {description: "string", authors: "string"}) - mongoose
```
