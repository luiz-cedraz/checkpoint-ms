const repository = require('../repositories/product-repository')
const categoryRepository = require('../repositories/category-repository')

exports.get = async(req, res, next)=> {
    const data = await repository.getProduct();
    res.status(200).send(data);
}

exports.getById = async(req, res, next)=> {
    const id = req.params.productId;
    const data = await repository.getById(id)
        .catch(() => undefined)
    if(!data) return res.status(404).send({ errors: "product not found" })
    res.status(200).send(data);
}

exports.post = async(req, res, next) => {
    const product = req.body
    if(!product?.category?.id) return res.status(400).send({ errors: "Path `category.id` is required." });

    const category = await categoryRepository.getCategoryById(product.category.id)
        .catch(() => undefined)
    if(!category) return res.status(404).send({ errors: "category not found" })

    product.category = { ...product.category, name: category.name }
    try {
        await repository.postProduct(product)
            .then(product => res.status(201).send(product))
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

exports.deleteById = async(req, res, next)=> {
    const id = req.params.productId;
    const data = await repository.deleteProduct(id)
        .catch(() => undefined)
    if(!data) return res.status(404).send({ errors: "category not found" })
    res.status(200).send(data);
}

exports.update = async(req, res, next) => {
    const id = req.params.productId;
    const product = await repository.getById(id)
        .catch(() => undefined);
    if(!product) return res.status(404).send({ errors: "product not found" });

    let newProduct = req.body;
    if(!newProduct?.category?.id) return res.status(400).send({ errors: "Path `category.id` is required." });

    const newCategory = await categoryRepository.getCategoryById(newProduct.category.id)
        .catch(() => undefined)
    if(!newCategory) return res.status(404).send({ errors: "category not found" })

    newProduct.category = { ...product.category, name: newCategory.name }
    newProduct = {...newProduct, _id: id}
    
    let errors = []
    const fields = ['title', 'description', 'price', 'active', 'category']
    fields.forEach(field => {
        if(!newProduct[field]) errors.push(`Path ${field} is required.`)
    });
    if(errors.length !== 0) return res.status(400).send({errors: errors})
    
    await repository.updateProduct(id, newProduct)
        .then(res.status(200).send(newProduct))
}