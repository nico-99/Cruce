const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const DB = require('../database/models')
const OP = DB.Sequelize.Op


const mainController = {
    index: async (req, res) => {
        try {
            const products = await DB.Product.findAll()
            res.render('catalogo', { products })
        } catch (error) {
            res.send(error)
        }
    },

    list: async (req, res) => {
        try {
            const products = await DB.Product.findAll()
            res.render('index', { products })
        } catch (error) {
            res.send(error)
        }
    },

    filter: async (req, res) => {
        try {
            const lowFilterProducts = await DB.Product.findAll({
                where: {
                    price: [
                        ['price','DESC']
                    ]
                }
            })
            res.render('lowFilter', {lowFilterProducts})
        } catch (error) {
            res.send(error)
        }
    },

    detail: async (req, res) => {
        try {
            const product = await DB.Product.findByPk(req.params.id)
            res.render('detailProduct', { product: product })
        } catch (error) {
            res.send(error)
        }
    },

    create: (req, res) => {
        res.render('createForm')
    },

    store: async (req, res) => {
        try {
            const newProduct = {
                ...req.body,
                image: req.files[0].filename,
            }
            await DB.Product.create(newProduct)
            res.redirect('/list')
        } catch (error) {
            res.send(error)
        }
    },

    edit: async (req, res) => {
        try {
            const productFound = await DB.Product.findOne({ where: { id: req.params.id } })
            res.render("editForm", { productFound })
        } catch (error) {
            res.send(error)
        }
    },

    update: async (req, res) => {
        try {
            let productToUpdate = await DB.Product.update({
                name: req.body.name,
                price: req.body.price,
            }, {
                where: {
                    id: req.body.id
                }
            });
            res.redirect('/')
        } catch (error) {
            res.send('no funca')
        }
    },

    delete: async (req, res) => {
        await DB.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/list')
    },
}

module.exports = mainController
