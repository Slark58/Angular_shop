const sequelize = require('../db')
const {DataTypes} = require('sequelize')


//////////////////////////////////////////////////////////////////////////////////////////////////////////?
//////////////////////////////////////////? информатион ?///////////////////////////////////////////////////?
////////////////////////////////////////////////////////////////////////////////////////////////////////////?
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    oldPrice: {type: DataTypes.INTEGER, allowNull: true},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: true},
})
const Comments = sequelize.define('comments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    comment: {type: DataTypes.INTEGER, allowNull: true},
})
const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: "Не оплачен"},
    address: {type: DataTypes.STRING, allowNull: false},
    paymentId: {type: DataTypes.STRING, allowNull: true},
})
const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////@
//////////////////////////////////////////@ ХАРАКТЕРИСТИКИ @///////////////////////////////////////////////////@
////////////////////////////////////////////////////////////////////////////////////////////////////////////@
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const Gender = sequelize.define('gender', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const Size = sequelize.define('size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const Color = sequelize.define('color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull:false},
    code: {type: DataTypes.STRING, allowNull: true},
}, {timestamps: false})
const Stock = sequelize.define('stock', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, allowNull: true},
}, {timestamps: false})
const Img = sequelize.define('img', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})


//////////////////////////////////////////////////////////////////////////////////////////////////////////*
//////////////////////////////////////////* СВЯЗЫВАЮЩИЕ ?///////////////////////////////////////////////////?
////////////////////////////////////////////////////////////////////////////////////////////////////////////*

const ProductChars = sequelize.define('product_chars', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, allowNull: false},
}, {timestamps: false})

const ProductImgs = sequelize.define('product_imgs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, {timestamps: false})



//////////////////////////////////////////////////////////////////////////////////////////////////////$
//////////////////////////////////////////$ ДРУГОЕ ?///////////////////////////////////////////////////$
//////////////////////////////////////////////////////////////////////////////////////////////////////$


const Promocode = sequelize.define('promocode', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
    percent: {type: DataTypes.INTEGER, allowNull: false},
}, {timestamps: false})


//////////////////////////////////////////////////////////////////////////////////////////////////////0
//////////////////////////////////////////0 Связи ?///////////////////////////////////////////////////0
//////////////////////////////////////////////////////////////////////////////////////////////////////0


//////! USERS 

User.hasOne(Basket) 
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Comments)
Comments.belongsTo(User)

//////! BASKET

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

//////! ORDER

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

//////! PRODUCT

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(Comments)
Comments.belongsTo(Product)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product)

Product.hasMany(ProductChars, {as: 'chars'})
ProductChars.belongsTo(Product)

Product.hasMany(ProductImgs, {as: 'imgs'})
ProductImgs.belongsTo(Product)

ProductChars.hasOne(Stock)
Stock.belongsTo(ProductChars)

//////! CHARSiristis


Type.hasMany(ProductChars)
ProductChars.belongsTo(Type)

Gender.hasMany(ProductChars)
ProductChars.belongsTo(Gender)

Size.hasMany(ProductChars)
ProductChars.belongsTo(Size)

Color.hasMany(ProductChars)
ProductChars.belongsTo(Color)

Color.hasMany(ProductImgs)
ProductImgs.belongsTo(Color)

Img.hasMany(ProductImgs)
ProductImgs.belongsTo(Img)

module.exports = {

    User,
    Basket,
    BasketProduct,

    Comments,
    Product,
    Rating,
    ProductInfo,
    Order,
    OrderProduct,
    ProductImgs,
    ProductChars,
    
    Promocode,
    
    Type,
    Color,
    Gender,
    Size,
    Img,
    Stock
}