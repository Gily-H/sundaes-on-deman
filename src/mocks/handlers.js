import { rest } from "msw";

export const handlers = [
  // handler based on server code - use same URL as one implemented in backend server
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        // provide hardcoded responses to test against
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),

  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "images/cherries.png" },
        { name: "M&Ms", imagePath: "images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "images/hot-fudge.png" },
      ])
    );
  }),

  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(ctx.json(123456789));
  }),
];
