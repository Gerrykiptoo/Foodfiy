import supabase from '../config/supabaseClient';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    // First create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: orderData.userId,
        total_amount: orderData.totalAmount,
        status: 'pending',
        shipping_address: orderData.shippingAddress,
        payment_method: orderData.paymentMethod,
        created_at: new Date()
      }])
      .select();
    
    if (orderError) throw orderError;
    
    // Then create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order[0].id,
      product_id: item.id,
      quantity: item.quantity,
      price: parseFloat(item.price.replace('$', '')),
      product_name: item.name
    }));
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;
    
    return order[0];
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders for a user
export const getUserOrders = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

// Get a single order by ID
export const getOrderById = async (orderId, userId) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};

// Update order status (admin functionality)
export const updateOrderStatus = async (orderId, status) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date() })
      .eq('id', orderId)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};