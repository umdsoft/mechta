const Order = require('../models/order');
const User = require('../models/user');
// 5eeb48ceb35ebc296866f681
exports.checkUser = async (req, res) => {
    const {phone} = req.body;
    const existingUser = await User.findOne({ phone : phone });
    let user;
    if(!existingUser) {
        const user = new User({
            phone : phone,
            nextOrderId : 1,
            orders : [],
            date : Date.now()
        });
        try {
            const newUser = await user.save();
        } catch (error) {
            console.log(error);
        }
        return res.status(200).json({
            success  : true,
            user : user,
            message : "new User created"
        })
    }
    return res.status(200).json({
        user: existingUser,
        success : true
    });
}
exports.addOrder =  async (req, res) => {
    const data = req.body;
    // const orderIdCandidate = await Order.find().select({orderId: 1, _id: 0});
    // if(data.orderId === orderIdCandidate) {
    //     res.json({
    //         message: "id found"
    //     })
    // }
    const user = await User.findOne({phone: data.phone});

    if(data.address !== user.address) {
        user.address = data.address;
    }
    if(data.name !== user.name) {
        user.name = data.name;
    }
    if(data.region !== user.region){
        user.region = data.region;
    }


    try {
        const newOrder = new Order({
            name: data.name,
            phone: data.phone,
            address: data.address,
            totalPrice: data.totalPrice,
            totalNum: data.num,
            products: data.products,
            creatorId : data.userId,
            status : data.status,
            region : data.region,
            date: Date.now()
        });
        const order = await newOrder.save();
        user.orders.push({
            orderId : order._id,
            lastOrderId : user.nextOrderId
        });
        user.nextOrderId = ++user.nextOrderId;
        console.log("USER" , user);
        await user.save();
        return res.status(200).json({
            user : user,
            order : order,
            message: {
                uz : "Buyurtma qabul qilindi",
                ru : "Заказ принят"
            }
        });

    } catch (error) {
        console.log(error);
    }
};
// colorId: data.colorId,
// orderId: data.orderId,

exports.getAllOrders = async (req,res) => {
    const orders = await Order.find()
        .sort({date: -1})
    res.send(orders);
};

exports.getOrderStatus = async(req, res) => {
    console.log("GET ORDER STATUS");
    const { orderId } = req.params;
    console.log(orderId);
    try {
        const order = await Order.findOne({orderId:orderId});
        console.log(order);
        res.status(200).json({status: order.status});
    } catch (error) {
        console.log(error);
    }

};

