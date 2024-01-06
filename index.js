const express=require("express");
const app = express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');



let posts=[
    {
        id:uuidv4() ,
        name:"vaibhav",
        content:"i'm a boy",
        followers:225,
        following:255
    },
    {
        id:uuidv4() ,
        name:"sneha",
        content:"i'm a girl",
        followers:115,
        following:115
    },
    {
        id:uuidv4(),
        name:"mamta",
        content:"i'm a student",
        followers:100,
        following:100
    }
];


app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`req on port ${port}`);
});

app.get("/",(req,res)=>{
    console.log("get req occur on root");
    res.render("root.ejs");
});

app.get("/posts",(req,res)=>{
    res.render("posts.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new_post.ejs");
});

app.post("/posts",(req,res)=>{
    let id = uuidv4(); 
    let {name,content,followers,following}=req.body;
    posts.push({id,name,content,followers,following});
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let id = req.params.id;
    
    console.log(id);

    let p = null;

    for (let i = 0; i < posts.length; i++) {
        if (id == posts[i].id) {
            p = posts[i];
            break;
        }

    }
    console.log(p);

    res.render("update.ejs",{p});
})

app.post("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    for (let i = 0; i < posts.length; i++) {
        if (id == posts[i].id) {
            p= posts[i];
            break;
        }

    }
    p.content = newContent;
   res.redirect("/posts");

})


app.get("/post/:id/delete",(req,res)=>{
    let {id} = req.params;
    console.log(id);


    posts=posts.filter((post) =>id != post.id);

     res.redirect("/posts");

    console.log(posts);
})
