document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Rouge - Jayrosse",
        img: "1.jpg",
        price: 89000,
        detail:
          "EAU DE PERFUME 30ml Character: Manly Romantic Longevity: Up To 6-8 Hours • Top notes: Calabrian bergamot and Pepper • Middle notes: Sichuan Pepper, Lavender, Pink Pepper, Vetiver, Patchouli, Geranium and elemi • Base notes: Ambroxan, Cedar and Labdanum",
      },
      {
        id: 2,
        name: "Cool Water Intense - Davidoff",
        img: "2.jpg",
        price: 640000,
        detail:
          "Discover Cool Water Intense, Davidoff, Eau de Parfum. A new take on Cool Water freshness with an ethically sourced ingredient, the handpicked green mandarin from Brazil. The scent unfolds into oriental notes of coconut water blended with the sensuality of amber accord. Your ultimate call of freshness, hedonism and seduction.",
      },
      {
        id: 3,
        name: "Y Eau de Parfum - YSL",
        img: "3.jpg",
        price: 2720000,
        detail:
          "Top Note: Bergamot, Ginger, Apple Middle Note: Sage, Juniper Berries, GeraniumBase Note: Vetiver, Cedar, Amberwood, Tonka Bean, Olibanum",
      },
      {
        id: 4,
        name: "Got My Mojo Back - Alchemist",
        img: "4.jpg",
        price: 249000,
        detail:
          "An elegant combination of gourmand notes and woodiness, Got My Mojo Back is a magnificent tribute to long nights under the neon lights. The aroma of praline and jasmine make for a euphoric and unforgettable scent. Sit down, treat yourself for a drink and wait for the compliments to roll in.",
      },
      {
        id: 5,
        name: "California - Mykonos",
        img: "5.jpg",
        price: 249000,
        detail:
          "It creates a seductive and inviting summer impression with an exotic twist. In the base, Teak wood and vetiver beautifully cut through the freshness of California, giving a classic & gentle reminder of old wealth, an incredibly sensual and sophisticated impression.",
      },
      {
        id: 6,
        name: "Vanilla Clouds - Mykonos",
        img: "6.jpg",
        price: 140000,
        detail:
          "That ultimate tempting, velvety vanilla fragrance, a staple in every girl’s wardrobe. Gourmand vanilla meets sweet marshmallow and fresh musks, evoking a sugary, warm, cozy feel, almost like you’re floating amongst the fluffiest clouds. Sensastion Warm & Flirty",
      },
      {
        id: 7,
        name: "The Most Wanted - Azzaro",
        img: "7.jpg",
        price: 1640000,
        detail:
          "Azzaro The Most Wanted membuka babak penciuman baru dengan aroma Fougere Woody Ambery, menciptakan jejak yang adiktif, canggih, dan magnetis.",
      },
      {
        id: 8,
        name: "Le Male Le Parfum - JPG",
        img: "8.jpg",
        price: 2525000,
        detail:
          "Drawing on the potency of cardamom in its top notes and the freshness of lavender and iris at its heart, this intense eau de parfum ultimately promises to immerse you in its wonderfully addictive and prominent vanilla base note. An olfactory odyssey full of contrasts to disorient and delight the senses, its masculine trail revealing the charisma of an officer.",
      },
      {
        id: 9,
        name: "Stronger With You Intensely - Armani",
        img: "9.jpg",
        price: 2190000,
        detail:
          "Discover Stronger With You Eau de Toilette, the energetic fragrance for men. Indulge in the spicy pink peppercorn accord in the top notes coupled with a warm mix of cardamom, chestnut and violet leaves.",
      },
    ],
  }));

  Alpine.data("productDetail", () => ({
    open: false,
    item: {},

    show(item) {
      this.item = item;
      this.open = true;
    },

    close() {
      this.open = false;
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika sudah ada, cek apakah barang beda atau sama
        this.items = this.items.map((item) => {
          // jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang berbeda, tambah quantity dan totalnya
            cartItem.quantity++;
            cartItem.total = cartItem.price * cartItem.quantity;
            this.quantity++;
            this.total += newItem.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // remove item berdasarkan idnya
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if (item.id !== id) {
            return item;
          } else {
            cartItem.quantity--;
            cartItem.total = cartItem.price * cartItem.quantity;
            this.quantity--;
            this.total -= cartItem.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const checkoutForm = document.querySelector("#checkoutForm");

checkoutForm.addEventListener("input", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (name && email && phone) {
    checkoutButton.classList.remove("disabled");
    checkoutButton.disabled = false;
  } else {
    checkoutButton.classList.add("disabled");
    checkoutButton.disabled = true;
  }
});

// Mata uang rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
