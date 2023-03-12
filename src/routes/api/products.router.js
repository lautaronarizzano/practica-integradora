import { Router } from 'express'
import Products from '../../dao/dbManagers/products.js'

const productManager = new Products()
const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.send({status: 'success', payload: products})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const pid = Number(req.params.pid)
        const products = await productManager.getProductById(pid)
        res.send({status: 'success', payload: products})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock} = req.body
    if(!title || !description || !price || !code || !stock) return res.status(400).send({ status: 'error', error: 'Incomplete values'})

    try {
        const result = await productManager.createProduct({
            title,
            description,
            price,
            thumbnail,
            code,
            status: true,
            stock
        })
        res.send({result: 'success', payload: result})
    } catch (error) {
        res.status(500).send({error: error})
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const pid = Number(req.params.pid)
        const product = req.body

        const result = await productManager.updateProduct(pid, product)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        const pid = Number(req.params.pid)
        const result = await productManager.deleteProduct(pid)
        res.send({status: 'success', payload: result})
    } catch (error) {
        res.status(500).send({ error })
    }
})

export default router