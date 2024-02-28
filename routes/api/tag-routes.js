const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// find all tags
router.get("/", (req, res) => {
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  })
    .then((tags) => res.status(200).json(tags))
    .catch((error) => res.status(400).json(err));
});

// find a single tag by its `id`
router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Product, through: ProductTag }],
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "no tag found with this id" });
        return;
      }
      res.status(200).json(tag);
    })
    .catch((error) => res.status(400).json(err));
});

//look to category post and puts for these next 2
// create a new tag
router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((error) => res.status(400).json(err));
});

// update a tag's name by its `id` value
router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((error) => res.status(400).json(error));
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "no tag found with this id" });
        return;
      }
      res.status(200).json(tag);
    })
    // .then((data) => res.status(200).json(data))
    .catch((error) => res.status(400).json(error));
});

module.exports = router;
