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
    Size,
    Color
} = require('../models/models')
const ApiError = require('../error/ApiError');
const {
    json
} = require('express');

class ProductController {
    async createProduct(req, res, next) {
        try {
            let {
                name,
                price,
                oldPrice,
                chars,
                colorId,
                info
            } = req.body
            const {
                imgs
            } = req.files
            // console.log("chars: ", JSON.parse(chars));

            // console.log("color: ", JSON.parse(chars)[0].color);
            // console.log("ColorId: ", Number(colorId));
            const product = await Product.create({
                name,
                price,
                oldPrice
            })

            const createImg = async (fileName) => {
                const img = await Img.create({
                    img: fileName,
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
                        colorId: colorId,
                        imgId: imgNew.id
                    })
                }
            }


            if (chars) {
                chars = JSON.parse(chars)
                for (const char of chars) {
                    ProductChars.create({
                        productId: product.id,
                        typeId: char.type,
                        genderId: char.gender,
                        sizeId: char.size,
                        colorId: char.color,
                        count: char.count
                    })

                }
            }



            if (info) {
                info = JSON.parse(info)
                info.forEach(item =>
                    ProductInfo.create({
                        title: item.title,
                        description: item.description,
                        productId: product.id
                    })
                )
            }


            return res.json(product)
            // return res.json({})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async getOne(req, res) {
        const {
            id
        } = req.params
        const product = await Product.findOne({
            where: {
                id
            },
            include: [{
                    model: ProductChars,
                    as: 'chars',
                    include: [{
                            model: Type
                        },
                        {
                            model: Color
                        },
                        {
                            model: Gender
                        },
                        {
                            model: Size
                        },
                    ]
                },
                {
                    model: ProductImgs,
                    as: "imgs",
                    include: [{
                            model: Img
                        },
                        {
                            model: Color
                        },
                    ]
                },
                {
                    model: ProductInfo,
                    as: "info",
                },
            ],
        }, )
        return res.json(product)
    }


    async getAllProducts(req, res, next) {
        try {
            const {
                Colors,
                Types,
                Sizes,
                Genders
            } = req.query;
            const filters = {};

            console.log(Colors, Types, Sizes, Genders);
            console.log(req.query);

            if (Colors) filters.colorId = Colors.split(',');
            if (Types) filters.typeId = Types.split(',');
            if (Sizes) filters.sizeId = Sizes.split(',');
            if (Genders) filters.genderId = Genders.split(',');

            console.log(filters);
            // let {page, limit} = req.query

            // page = page || 1
            // limit = limit || 35
            // let offset = page * limit - limit

            const products = await Product.findAll({
                include: [{
                        model: ProductChars,
                        as: 'chars',
                        where: filters,
                        include: [{
                                model: Type
                            },
                            {
                                model: Color
                            },
                            {
                                model: Gender
                            },
                            {
                                model: Size
                            },
                        ]
                    },
                    {
                        model: ProductImgs,
                        as: 'imgs',
                        include: [{
                                model: Img
                            },
                            {
                                model: Color
                            },
                        ]
                    },
                ],
            })

            console.log('products: ', products);

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