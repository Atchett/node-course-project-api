exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "Some first post content" }],
  });
};

exports.postPost = (req, res, next) => {
  const { title, content } = req.body;
  res.status(201).json({
    message: "post created successfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
