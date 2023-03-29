const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Bikes' },
    { name: 'Backpacks' },
    { name: 'Cooking Utensils' },
    { name: 'Tents' },
    { name: 'Fishing Equipment' },
    { name: 'Clothing' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      title: 'Specialized Rockhopper 27inch',
      description:
        'Specialized Rockhopper in 27 inch rims. Suited for offroad trails.',
      image: 'specialized-rockhopper-27.5-401456-16.jpeg',
      category: categories[0]._id,
      price: 2.99,
      quantity: 5
    },
    {
      title: 'Hyperlite 3400 Southwest 55L Backpack - Unisex',
      description:
        'From bushwhacking to tight squeezes, this lightweight pack is designed to go where others falter. The ultra abrasion-resistant Dyneema handles the most rugged adventures while still being light enough for fast missions. Multiple external pockets and daisy chains provide additional storage options on the outside.',
       image: 'hyperlite-backpack.jpeg',
      category: categories[1]._id,
      price: 1.99,
      quantity: 500
    },
    {
      title: 'Sea to Summit X Set',
      category: categories[2]._id,
      description:
        'Sea to Summit X-Series has been an extremely popular and comprehensive range of collapsible dinnerware for years. The fundamental appeal of these items is how compact and functional they are. Now, Sea to Summit has extended those concepts to cookware with hard-anodized aluminum bases that allow camp stove cooking. The beauty is how they collapse and nest with our dinnerware and other X cookware, creating the most compact cooking and eating sets you will find. There are five set options suited to just about any activity and group size.',
       image: 'seatosummit-xpot.jpeg',
      price: 7.99,
      quantity: 20
    },
    {
      title: 'Zpacks Duplex Tent',
      category: categories[3]._id,
      description:
        'This ultralight tent will allow you to push your limits and hike greater distances; whether losing yourself in the beauty of the Pacific Crest Trail, or weathering an afternoon storm in the Swiss Alps. Specifically designed for the demands of long distance backpacking, the award-winning Duplex hits the sweet spot when it comes to size, weight, and features. The Duplex is lightweight, roomy, well-ventilated, packs down small, pitches easily, and can be set up in the tightest of spaces. You won’t find a lighter functional two person tent anywhere on the market. Voted the most popular ultralight tent by Appalachian Trail thru-hikers two years in a row.',
       image: 'zpacks-duplex-tent.jpeg',
      price: 3.99,
      quantity: 50
    },
    {
      title: 'Quantum® Accurist Baitcast Combo',
      category: categories[4]._id,
      description:
        'The Quantum Accurist is the rugged baitcast combo needed for your next fishing adventure. By pairing a baitcast reel developed with a ceramic-carbon drag system and a zero-friction design with a highly sensitive IM7 graphite rod, Quantum Accurist was crafted for anglers looking for increased sensitivity and unbeatable durability. With a guaranteed 5-year warranty, the Accurist baitcast combo is a no-brainer.',
       image: 'quantum-accurist-fishingrod.jpeg',
      price: 14.99,
      quantity: 100
    },
    {
      title: 'Arcteryx Beta LT Jacket - Mens',
      category: categories[5]._id,
      description:
        'With simplicity born of careful design, the Beta LT delivers breathability and protection. It meets the needs of fast-moving alpinists and skiers in demanding mountain conditions, or anyone looking to strike the right balance between weight and performance. A storm hood, drawcord hem and sealable cuffs are precisely adjustable to make if proof against the elements.',
       image: 'arcteryx-jacket-mens.jpeg',
      price: 399.99,
      quantity: 30
    }
   
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    username: 'reddit',
    email: 'pamela@testmail.com',
    password: 'password12345',
    // orders: [
    //   {
    //     products: [products[0]._id, products[0]._id, products[1]._id]
    //   }
    // ]
  });

  await User.create({
    username: 'youtube',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  await User.create({
    username: 'jhu8480',
    email: 'jhu8480@gmail.com',
    password: '12345',
    isAdmin: true
  });

  console.log('users seeded');

  process.exit();
});
