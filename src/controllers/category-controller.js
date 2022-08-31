const repository = require('../repositories/category-repository');

exports.get = async(req, res, next)=> {
    const data = await repository.getCategory();
    res.status(200).send(data);
}

exports.getById = async(req, res, next)=> {
    const id = req.params.categoryId;
    const data = await repository.getCategoryById(id)
      .catch(() => undefined)
    if(!data) return res.status(404).send({ errors: "category not found" })
    res.status(200).send(data);
}

exports.post = async(req, res, next)=> {
    try {
        await repository.postCategory(req.body)
            .then(category => res.status(201).send(category))
      } catch (error) {
        if (error.name === "ValidationError") {
          let errors = [];
    
          Object.keys(error.errors).forEach((key) => {
            errors.push(error.errors[key].message);
          });
    
          return res.status(400).send({ errors: errors });
        }
        res.status(500).send("Something went wrong");
    }
}

exports.update = async(req, res, next) => {
  const id = req.params.categoryId;
  const category = await repository.getCategoryById(id)
    .catch(() => undefined);
  if(!category) return res.status(404).send({ errors: "category not found" })

  const name = req.body?.name
  if(!name) return res.status(400).send({ errors: "Path `name` is required." });

  const newCategory = { _id: id, name: name }

  await repository.updateCategory(id, newCategory)
    .then(res.status(200).send(newCategory));
}

exports.deleteById = async(req, res, next)=> {
  const id = req.params.categoryId;
  const data = await repository.deleteCategory(id)
    .catch(() => undefined)
  if(!data) return res.status(404).send({ errors: "category not found" })
  res.status(200).send(data);
}