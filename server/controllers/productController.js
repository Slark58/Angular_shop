const uuid = require('uuid')
const path = require('path');
const {
    Device,
    DeviceInfo,
    Circuitbreakers,
    BreakingCapacityAvto,
    CharacteristicName,
    ShutdownCurveAvto,
    Product,
    ProductInfo,
    Img,
    ProductImgs,
    ProductChars,
    Type,
    Brand,
    Gender,
    Size
} = require('../models/models')
const ApiError = require('../error/ApiError');
const {
    json
} = require('express');

class ProductController {
    async createProduct(req, res, next) {
        try {
            let { name,price, oldPrice } = req.body
            console.log(name, price, oldPrice);
            const {imgs} = req.files

            const product = await Product.create({
                name,
                price,
                oldPrice
            })
            
            const createImg = async (fileName) => {
                const img = await Img.create({
                    img: fileName,
                    tag: 'test'
                })
                return img
            }

        
            if (imgs) {
                for (const img of imgs) {
                    let fileName = uuid.v4() + ".jpg"
                    img.mv(path.resolve(__dirname, '..', 'static', fileName))   
    
                    const imgNew = await createImg(fileName)
                    
                    console.log(imgNew);
    
                    ProductImgs.create({
                        productId: product.id,
                        imgId: imgNew.id
                    })
                }
            }
            



            // let fileName = uuid.v4() + ".jpg"
            // picture.mv(path.resolve(__dirname, '..', 'static', fileName))



            // const product = await Product.create(productData);

            // if (info) {
            //     info = JSON.parse(info)
            //     info.forEach(item =>
            //         ProductInfo.create({
            //             title: item.title,
            //             description: item.description,
            //             productId: product.id
            //         })
            //     )
            // }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({
            where: {id},
            include: [{
                model: ProductInfo,
                as: 'info'
            }]
        }, )
        return res.json(product)
    }


    async getAllProducts(req, res, next) {
        try {
            // let {page, limit} = req.query
      
            // page = page || 1
            // limit = limit || 35
            // let offset = page * limit - limit

            const products = await Product.findAll({
                include: [
                    {
                        model: ProductChars,
                        include: [
                            {model: Type},
                            {model: Brand},
                            {model: Gender},
                            {model: Size},
                        ]
                    },
                    {
                        model: ProductImgs,
                        include: [
                            {model: Img}
                        ]
                    },
                ],
            })

            // const productWithChars = await ProductChars.findAll({
            //     include: [
            //         {model: Product},
            //         {model: Type},
            //         {model: Brand},
            //         {model: Gender},
            //         {model: Size},
            //     ]
            // })
            // const productWithImgs = await ProductImgs.findAll({
            //     include: [
            //         {model: Product},
            //         {model: Img},
            //     ]
            // })


            // const result = await Promise.all([productWithChars, productWithImgs])


            if (!products) {
                return next(ApiError.badRequest('Продукты не найдены'))
              }
          
            return res.json(products)

        } catch (error) {
            return next(ApiError.badRequest(error))
        }

    }


}

module.exports = new ProductController()