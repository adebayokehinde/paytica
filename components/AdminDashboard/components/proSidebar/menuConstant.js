export  const navItems = [
    {
      category: "Dashboard",
      iClass:'bi bi-grid-1x2-fill',
      subItem: [
        {
          name: "My Orders",
          iClass:'bi bi-person-bounding-box',
          items: [
            {
              name: "My Orders",
              link: "/userDashboard/userOrders/ordersList",
            },
            {
              name: "Create Order",
              link: "/userDashboard/userOrders/createOrder",
            }
          ]
        }
      ],
    },
    
  ];