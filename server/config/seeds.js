const db = require("./connection");
const { User, Product, Order, Cart } = require("../models");

db.once("open", async () => {
  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      title: "Specialized Rockhopper 27inch",
      description:
        "Specialized Rockhopper in 27 inch rims. Suited for offroad trails.",
      image: "specialized-rockhopper-27.5-401456-16.jpg",
      category: "Bikes",
      price: 859.99,
      quantity: 5,
    },
    {
      title: "Trek Rail 9.9 XX1 AXS Gen 4",
      description:
        "Rail 9.9 is our best long-travel electric mountain bike. You get an extra-beefy carbon frame, unbelievably smooth RockShox suspension, SRAM's best wireless electronic drivetrain, and a powerful Bosch smart system Performance Line CX motor with an extra-long range battery and the new Mini Remote. The new System Controller display sits almost flush with the top tube for a sleek look wherever you roll that stays out of the way when you're riding hard.",
      image: "rail99xx1axs-23-37031-c-primary.jpg",
      category: "Bikes",
      price: 6599.99,
      quantity: 12,
    },
    {
      title: "Santa Cruz V10",
      description:
        "The V10 is designed to be exactly the right bike for anyone who steps up to the startline with eyes on a podium. The racer who chooses a V10 is the recipient of every bit of work and puzzling that has gone into the Syndicates race bikes. The continuous fine-tuning that the V10 has undergone with the Syndicate for World Cup season after season has guaranteed regular, high-level feedback. The result is perhaps the most refined suspension performance available outside of a World Cup pit. 215mm of VPP™ travel is exquisitely refined and the ease of tuning and serviceability of the VPP system makes it a hit in the pits with mechanics and privateers.",
      image: "santa-cruz-v10.jpg",
      category: "Bikes",
      price: 9349.99,
      quantity: 12,
    },
    {
      title: "Arcteryx Mantis 26 Backpack",
      description:
        "Made to expand horizons, the exceptionally versatile Mantis delivers its organization, durability, and balanced carry with a clean, minimalist design and recycled materials. A drawbridge opening allows easy access to the large main compartment, multiple pockets provide intuitive organization, and an internal sleeve carries a hydration reservoir or laptop. The padded back, frame sheet, and aluminum stay combine for a comfortable carry, and adjustable side pockets hold water bottles, windshell, or camera.",
      image: "Mantis-26-Backpack-Black.jpg",
      category: "Backpacks",
      price: 179.99,
      quantity: 12,
    },
    {
      title: "Osprey Rook 65L Backpack",
      description:
        "Backpacking is not easy. But it should be. So, in an effort to make your walk in the woods as effortless as possible, we developed a pack that is capable, comfortable, innovative, and approachable. With lightweight performance, a new adjustable torso system for a seamless fit, an integrated raincover, and superb ventilation, the Rook 65 has your overnight needs covered—whether it is your first time sleeping under the stars or your fiftieth. The packs straightforward feature set, rugged construction, and super comfortable carrying system should tempt backpackers of every ability.",
      image: "osp-rook6557-7emallard-20green.jpg",
      category: "Backpacks",
      price: 249.99,
      quantity: 12,
    },
    {
      title: "Stanley Adventure Camp Cook Set 24oz Stainless Steel",
      description:
        "Anyone can be a seasoned outdoorsman with this simple, smart cook set. Cook in the stainless pot. Eat out of the two 10oz cups included inside. Tailgate, campsite, fishing approved.",
      image: "Stanley-cookset.jpg",
      category: "Cooking Utensils",
      price: 27.99,
      quantity: 12,
    },
    {
      title: "MSR Ultralight Kitchen Set",
      description:
        "This lightweight, basic kitchen set includes all your favorite utensils and accessories wrapped in one convenient package. It includes a folding Spoon, spatula, Ultralight cutting Board, Salt & Pepper Shaker, squeeze bottle and dish towel",
      image: "msr-cookset.jpg",
      category: "Cooking Utensils",
      price: 54.99,
      quantity: 12,
    },
    {
      title: "FE Active Waterproof Camping Tent",
      description:
        "The Grindavik fits 3-4 people and is crafted with durable materials to be suitable for all 4 seasons! Fitted with high-end aluminum poles, this heavy duty compact tent includes a full cover rainfly for winter temps & a mosquito insect mesh half dome for a bug-free summer",
      image: "feactive-tent.jpg",
      category: "Tents",
      price: 142.99,
      quantity: 12,
    },
    {
      title: "Big Agnes Blacktail 3 person tent",
      description:
        "The Blacktail 3-person tent is light enough for the backcountry, and strong enough for the front country. A tried and true shelter with excellent value for backpackers who want a super comfortable tent after a long day on the trail. The Blacktail 3 tent offers spacious sleeping areas with easy access through two, side-entry doors and vestibules, making an early morning entry and exit with a tent mate more stealth when nature calls.",
      image: "bigagnesca-tbt3_green__01.jpg",
      category: "Tents",
      price: 369.99,
      quantity: 12,
    },
    {
      title: "Forclaz Mens Hiking Jacket - MT 100 Khaki",
      description:
        "This hooded padded jacket combines warmth, light weight, and durability. It allows you to trek comfortably in cool weather down to -5°C when active. The technical advances applied to this padded jacket make it compact and thin while keeping you warm. For lighter hikes.",
      image: "mens-hiking-jacket-mt-100-khaki.jpg",
      category: "Clothing",
      price: 54.99,
      quantity: 12,
    },
    {
      title: "Forclaz MT 500 Hiking 2-in-1 Pants – Women",
      description:
        "These pants were designed to be quickly converted into shorts. The fabric is stretchy to provide maximum comfort. Durable fabric inserts on areas that are prone to chafing.",
      image: "mt-500-hiking-2-in-1-pants-women.jpg",
      category: "Clothing",
      price: 49.99,
      quantity: 12,
    },
    {
      title: "Fishing Lure Kits, 185Pcs",
      description:
        "185Pcs Professional Fishing Tackle Kit - The Fishing Lure Kit made of premium metal and soft plastic. 185pcs fishing accessories collects nearly all accessories including Crank bait/ Frog/ Spinner/ Metal Lures/ Plastic Worms/ Simulation of Shrimp/ Fishing Hooks/ Jig Head/ Fishing Lines and so on. Make you enjoy the moment of fishing and get more big fish.",
      image: "fishing-lures.jpg",
      category: "Fishing Equipment",
      price: 21.99,
      quantity: 12,
    },

    {
      title: "Bubba® Medium Carbon Fiber Net",
      description:
        "Never let another one off your hook. The all-new Bubba® Medium Carbon Fiber Net is ready to help you land your next trophy fish. With a 75-pound rating, it'll snag up the lakes biggest without hesitation. The net hoop is made from aerospace aluminum to uphold brutal force. Its PVC-coated nylon netting makes cleaning and sifting through the waters a breeze. The knotless net also protects your fish from any roughness that traditional nets may cause. The yoke of the net features a diecast aluminum black chrome giving it a weather-resistant finish and durability that will outlast years of use in saltwater. As always, Bubbas iconic non-slip grip will come in handy while you wrangle in that prized catch. For ultimate durability and strength, the Bubba® Medium Carbon Fiber Net is top-of-the-line for you and your mates.",
      image: "fishing-net.jpg",
      category: "Fishing Equipment",
      price: 219.99,
      quantity: 12,
    },

    {
      title: "Hyperlite 3400 Southwest 55L Backpack - Unisex",
      description:
        "From bushwhacking to tight squeezes, this lightweight pack is designed to go where others falter. The ultra abrasion-resistant Dyneema handles the most rugged adventures while still being light enough for fast missions. Multiple external pockets and daisy chains provide additional storage options on the outside.",
      image: "hyperlite-backpack.jpg",
      category: "Backpacks",
      price: 399.99,
      quantity: 500,
    },
    {
      title: "Sea to Summit X Set",
      category: "Cooking Utensils",
      description:
        "Sea to Summit X-Series has been an extremely popular and comprehensive range of collapsible dinnerware for years. The fundamental appeal of these items is how compact and functional they are. Now, Sea to Summit has extended those concepts to cookware with hard-anodized aluminum bases that allow camp stove cooking. The beauty is how they collapse and nest with our dinnerware and other X cookware, creating the most compact cooking and eating sets you will find. There are five set options suited to just about any activity and group size.",
      image: "seatosummit-xpot.jpg",
      price: 7.99,
      quantity: 20,
    },
    {
      title: "Zpacks Duplex Tent",
      category: "Tents",
      description:
        "This ultralight tent will allow you to push your limits and hike greater distances; whether losing yourself in the beauty of the Pacific Crest Trail, or weathering an afternoon storm in the Swiss Alps. Specifically designed for the demands of long distance backpacking, the award-winning Duplex hits the sweet spot when it comes to size, weight, and features. The Duplex is lightweight, roomy, well-ventilated, packs down small, pitches easily, and can be set up in the tightest of spaces. You won’t find a lighter functional two person tent anywhere on the market. Voted the most popular ultralight tent by Appalachian Trail thru-hikers two years in a row.",
      image: "zpacks-duplex-tent.jpg",
      price: 499.99,
      quantity: 50,
    },
    {
      title: "Quantum® Accurist Baitcast Combo",
      category: "Fishing Equipment",
      description:
        "The Quantum Accurist is the rugged baitcast combo needed for your next fishing adventure. By pairing a baitcast reel developed with a ceramic-carbon drag system and a zero-friction design with a highly sensitive IM7 graphite rod, Quantum Accurist was crafted for anglers looking for increased sensitivity and unbeatable durability. With a guaranteed 5-year warranty, the Accurist baitcast combo is a no-brainer.",
      image: "quantum-accurist-fishingrod.jpg",
      price: 129.99,
      quantity: 100,
    },
    {
      title: "Arcteryx Beta LT Jacket - Mens",
      category: "Clothing",
      description:
        "With simplicity born of careful design, the Beta LT delivers breathability and protection. It meets the needs of fast-moving alpinists and skiers in demanding mountain conditions, or anyone looking to strike the right balance between weight and performance. A storm hood, drawcord hem and sealable cuffs are precisely adjustable to make if proof against the elements.",
      image: "arcteryx-jacket-mens.jpg",
      price: 399.99,
      quantity: 30,
    },
  ]);

  console.log("products seeded", products.length);

  await User.deleteMany();

  await User.create({
    username: "reddit",
    email: "pamela@testmail.com",
    password: "password12345",
    // orders: [
    //   {
    //     products: [products[0]._id, products[0]._id, products[1]._id]
    //   }
    // ]
  });

  await User.create({
    username: "youtube",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  await Cart.deleteMany();
  const response = await Cart.create({ products: [] });
  console.log(response);

  await User.create({
    username: "jhu8480",
    email: "jhu8480@gmail.com",
    password: "12345",
    isAdmin: true,
    cart: response._id,
  });

  await User.create({
    username: "test",
    email: "test@gmail.com",
    password: "test",
    isAdmin: true,
  });

  console.log("users seeded");

  process.exit();
});
