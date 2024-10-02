const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const response = require('../utils/response');
const CustomError = require('../utils/error');

const prisma = new PrismaClient();

// Schema for adding a service to the cart
const addToCartSchema = Joi.object({
  carWashServiceId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).required(),
});

// Add or update item in cart
exports.addToCart = async (req, res, next) => {
  try {
    // Validate input
    const { error, value } = addToCartSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      throw new CustomError(errorMessage, 400);
    }

    const { carWashServiceId, quantity } = value;

    // Check if the user has an active cart
    let cart = await prisma.carWashCart.findUnique({
      where: {
        userId: req.user.id,
      },
      include: {
        cartItems: true,
      },
    });

    // If no active cart exists, create one
    if (!cart) {
      cart = await prisma.carWashCart.create({
        data: {
          userId: userId,
          cartItems: {
            create: {
              carWashServiceId: carWashServiceId,
              quantity: quantity,
            },
          },
        },
      });
    } else {
      // Check if the service is already in the cart
      const existingCartItem = cart.cartItems.find((item) => item.carWashServiceId === carWashServiceId);

      if (existingCartItem) {
        // If the service is already in the cart, increase its quantity
        await prisma.carWashCartItem.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: existingCartItem.quantity + quantity,
          },
        });
      } else {
        // If the service is not in the cart, add it
        await prisma.carWashCartItem.create({
          data: {
            carWashCartId: cart.id,
            carWashServiceId: carWashServiceId,
            quantity: quantity,
          },
        });
      }
    }

    res.status(200).json(response(200, true, 'Item added to cart successfully', cart));
  } catch (error) {
    next(error);
  }
};

// Get cart items for a user
exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Fetch the cart with all items for the user
    const cart = await prisma.carWashCart.findUnique({
      where: { userId: userId },
      include: {
        cartItems: {
          include: {
            carWashService: true, // Assuming you have a carWashService relation in your schema
          },
        },
      },
    });

    if (!cart) {
      throw new CustomError('Cart not found for this user', 404);
    }

    res.status(200).json(response(200, true, 'Cart fetched successfully', cart));
  } catch (error) {
    next(error);
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const { cartItemId } = req.params;

    // Delete the cart item
    const deletedCartItem = await prisma.carWashCartItem.delete({
      where: { id: cartItemId },
    });

    res.status(200).json(response(200, true, 'Item removed from cart successfully', deletedCartItem));
  } catch (error) {
    next(error);
  }
};

// Clear the cart
exports.clearCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Delete all items in the user's cart
    const deletedItems = await prisma.carWashCartItem.deleteMany({
      where: { carWashCart: { userId: userId } },
    });

    res.status(200).json(response(200, true, 'Cart cleared successfully', deletedItems));
  } catch (error) {
    next(error);
  }
};
