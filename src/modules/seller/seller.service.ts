import { connect } from "http2";
import ApiError from "../../shared/apiError";
import excludeField from "../../shared/excludeField";
import prisma from "../../shared/prisma";
import { sellerType } from "./seller.interface";

function getLast30Days(): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }

  return dates.reverse();
}
function getDatePart(dateTimeString: string): string {
  // Extract the date part by slicing the string
  const datePart = dateTimeString.slice(0, 10);
  return datePart;
}

const getSellerById = async (
  sellerId: string
): Promise<Partial<sellerType>> => {
  const result: sellerType | null = await prisma.seller.findUnique({
    where: { id: sellerId },
  });
  if (result) {
    const seller = excludeField(result, ["password"]);
    return seller;
  } else {
    throw new ApiError(400, "seller not found");
  }
};

const createStore = async (sellerId: string, storeData: any) => {
  const result = await prisma.store.create({
    data: { ...storeData, seller: { connect: { id: sellerId } } },
  });

  return result;
};

const getStore = async (sellerId: string) => {
  const store = await prisma.store.findFirst({
    where: { sellerId: sellerId },
    include: {
      products: true,
      orders: true,
      followers: true,
    },
  });
  return store;
};

// const getSellerOverview = async (sellerId: string) => {
//   const store = await prisma.store.findFirst({ where: { sellerId } });
//   console.log("hitting get seller overview service");
//   const storeId = store?.id;

//   //   const lastTenDaysOrders: any = await prisma.$queryRaw`
//   //   WITH last_ten_days AS (
//   //     SELECT generate_series(
//   //       CURRENT_DATE - interval '30 days',
//   //       CURRENT_DATE,
//   //       interval '1 day'
//   //     )::date AS date
//   //   )
//   //   SELECT
//   //     lsd.date::text AS date,
//   //     COALESCE(SUM(CAST(o."paymentAmount" AS NUMERIC)), 0) AS "totalPaymentAmount",
//   //     COALESCE(COUNT(DISTINCT o."id"), 0) AS "orderCount",
//   //     COALESCE(json_agg(DISTINCT o.items), '[]'::json) AS items
//   //   FROM
//   //     last_ten_days lsd
//   //   LEFT JOIN
//   //     "Order" o
//   //   ON
//   //     DATE(o."createdAt") = lsd.date AND o.status != 'canceled' AND o."storeId" = ${store?.id}
//   //   GROUP BY
//   //     lsd.date
//   //   ORDER BY
//   //     lsd.date DESC;
//   // `;

//   //   const formattedOrders = lastTenDaysOrders.map((order: any) => ({
//   //     date: order.date,
//   //     totalPaymentAmount: order.totalPaymentAmount.toString(),
//   //     orderCount: order.orderCount.toString(),
//   //     // items: JSON.parse(JSON.stringify(order.items)),
//   //     items: order.items.reduce((prev: number, curr: any) => {
//   //       if (curr) {
//   //         curr.forEach((c: any) => (prev = prev + c.productQuantity));
//   //       }
//   //       return prev;
//   //     }, 0),
//   //   }));

//   // function getStartOfWeek(date: any) {
//   //   const currentDate = new Date(date);
//   //   const day = currentDate.getDay();
//   //   const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
//   //   return new Date(currentDate.setDate(diff));
//   // }

//   // function getEndOfWeek(date: any) {
//   //   const startOfWeek = getStartOfWeek(date);
//   //   return new Date(startOfWeek.setDate(startOfWeek.getDate() - 6));
//   // }

//   // async function getSalesData() {
//   //   const today = new Date();
//   //   const startOfThisWeek = getStartOfWeek(today);
//   //   const endOfThisWeek = getEndOfWeek(today);
//   //   const startOfLastWeek = new Date(startOfThisWeek);
//   //   startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
//   //   const endOfLastWeek = new Date(endOfThisWeek);
//   //   endOfLastWeek.setDate(endOfLastWeek.getDate() - 7);

//   //   console.log(
//   //     "date data: start of the week: ",
//   //     startOfThisWeek,
//   //     " end of this week: ",
//   //     endOfThisWeek,
//   //     " start of last week: ",
//   //     startOfLastWeek,
//   //     " end of last week: ",
//   //     endOfLastWeek
//   //   );
//   //   // Query to get the total sales, sales for this week, and sales for last week
//   //   const salesData = await prisma.product.findMany({
//   //     where: { storeId },
//   //     select: {
//   //       sales: true,
//   //       updatedAt: true,
//   //       reviews: {
//   //         select: {
//   //           rating: true,
//   //         },
//   //       },
//   //     },
//   //   });

//   //   // Initialize sales counts
//   //   let totalSales = 0;
//   //   let salesThisWeek = 0;
//   //   let salesLastWeek = 0;
//   //   let totalRatings = 0;
//   //   let reviewCount = 0;

//   //   // Calculate the sales and ratings
//   //   for (const product of salesData) {
//   //     totalSales += product.sales;

//   //     const updatedAtDate = new Date(product.updatedAt);

//   //     if (updatedAtDate >= startOfThisWeek && updatedAtDate < endOfThisWeek) {
//   //       salesThisWeek += product.sales;
//   //     } else if (
//   //       updatedAtDate >= startOfLastWeek &&
//   //       updatedAtDate < endOfThisWeek
//   //     ) {
//   //       salesLastWeek += product.sales;
//   //     }

//   //     for (const review of product.reviews) {
//   //       totalRatings += review.rating;
//   //       reviewCount += 1;
//   //     }
//   //   }

//   //   // Calculate average rating
//   //   const averageRating = reviewCount ? totalRatings / reviewCount : 0;

//   //   // Calculate sales percentage change
//   //   const salesDifference = salesThisWeek - salesLastWeek;
//   //   const salesChangePercentage = salesLastWeek
//   //     ? (salesDifference / salesLastWeek) * 100
//   //     : salesThisWeek
//   //     ? 100
//   //     : 0; // Handle case where last week's sales are 0

//   //   return {
//   //     totalSales,
//   //     salesThisWeek,
//   //     salesLastWeek,
//   //     salesChangePercentage,
//   //     averageRating,
//   //   };
//   // }

//   // const to = await getSalesData();

//   // the next one, may be not usable
//   const lastTenDaysOrders: any = await prisma.$queryRaw`
//   WITH last_ten_days AS (
//     SELECT generate_series(
//       CURRENT_DATE - interval '30 days',
//       CURRENT_DATE,
//       interval '1 day'
//     )::date AS date
//   ),
//   orders_with_items AS (
//     SELECT
//       o.id,
//       o."createdAt",
//       o."paymentAmount",
//       o.items,
//       (jsonb_array_elements(o.items) ->> 'productQuantity')::int AS product_quantity
//     FROM "Order" o
//     WHERE o.status != 'canceled' AND o."storeId" = ${store?.id}
//   )
//   SELECT
//     lsd.date::text AS date,
//     COALESCE(SUM(CAST(owi."paymentAmount" AS NUMERIC)), 0) AS "totalPaymentAmount",
//     COALESCE(COUNT(DISTINCT owi.id), 0) AS "orderCount",
//     COALESCE(json_agg(DISTINCT owi.items) FILTER (WHERE owi.id IS NOT NULL), '[]'::json) AS items,
//     COUNT(owi.id) AS "totalOrders",
//     COALESCE(SUM(owi.product_quantity), 0) AS "totalSales"
//   FROM
//     last_ten_days lsd
//   LEFT JOIN
//     orders_with_items owi
//   ON
//     DATE(owi."createdAt") = lsd.date
//   GROUP BY
//     lsd.date
//   ORDER BY
//     lsd.date DESC;
//   `;
//   const formattedOrders = lastTenDaysOrders.map((order: any) => ({
//     date: order.date,
//     totalPaymentAmount: order.totalPaymentAmount.toString(),
//     orderCount: order.orderCount.toString(),
//     totalOrders: order.totalOrders.toString(),
//     totalSales: order.totalSales.toString(),
//     items: order.items.reduce((prev: number, curr: any) => {
//       if (curr) {
//         curr.forEach((c: any) => (prev = prev + c.productQuantity));
//       }
//       return prev;
//     }, 0),
//   }));

//   return { salesOverview: {}, orderOverview: formattedOrders };
// };

const getSellerOverview = async (sellerId: string) => {
  const store = await prisma.store.findFirst({ where: { sellerId } });
  const storeId = store?.id;

  const result = await prisma.$queryRaw`
  WITH OrderStats AS (
    SELECT 
      COUNT(*) AS "totalOrders",
      SUM(CASE WHEN "status" = 'pending' THEN "paymentAmount" ELSE 0 END) AS "pendingAmount",
      SUM(CASE WHEN "status" = 'delivered' THEN "paymentAmount" ELSE 0 END) AS "clearedAmount",
      COUNT(CASE WHEN "status" = 'canceled' THEN 1 END) AS "cancelRate",
      COUNT(CASE WHEN "status" = 'pending' THEN 1 END) AS "pendingRate",
      COUNT(CASE WHEN "status" = 'confirmed' THEN 1 END) AS "confirmedRate",
      COUNT(CASE WHEN "status" = 'shipped' THEN 1 END) AS "shippedRate",
      COUNT(CASE WHEN "status" = 'delivered' THEN 1 END) AS "deliveredRate",
      COALESCE(SUM(sub.productQuantity), 0) AS "totalSales"
    FROM "Order"
    LEFT JOIN LATERAL (
      SELECT SUM((item->>'productQuantity')::int) AS productQuantity
      FROM jsonb_array_elements("Order"."items") AS item
      WHERE "Order"."status" NOT IN ('pending', 'canceled')
    ) sub ON true
    WHERE "storeId" = ${storeId}
  )
  SELECT 
    "totalOrders",
    "pendingAmount",
    "clearedAmount",
    "cancelRate",
    "pendingRate",
    "confirmedRate",
    "shippedRate",
    "deliveredRate",
    "totalSales"
  FROM OrderStats;
`;

  const serializedResult = JSON.stringify(result, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
  const overview = await JSON.parse(serializedResult);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentOrders = await prisma.order.findMany({
    where: {
      updatedAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  const last30Days = getLast30Days();

  const chartOverview: Record<string, any> = {};
  const chartOverviewArray: any = [];

  console.log(getDatePart(recentOrders[0].createdAt.toISOString()));
  last30Days.forEach((day) => {
    const matchedOrders = recentOrders.filter(
      (order) => getDatePart(order.updatedAt.toISOString()) == day
    );

    // if matched order length is greater than 0 then there are orders that needs to be formatted
    if (matchedOrders.length > 0) {
      let obj = {
        date: day,
        orderCount: matchedOrders.length,
        items: 0,
        cash: 0,
      };
      console.log({});
      matchedOrders.forEach((o) => {
        if (o.status == "delivered") {
          obj.cash += o.paymentAmount;
        }
        if (o.status != "pending" && o.status != "canceled") {
          let count = 0;
          (o.items as [any]).forEach(
            (i) => (count = i.productQuantity + count)
          );
          obj.items = count;
        }
      });
      chartOverviewArray.push(obj);
    } else {
      chartOverviewArray.push({ date: day, orderCount: 0, items: 0, cash: 0 });
    }

    //else push and empty object to array
  });

  console.log("recent orders: ", recentOrders);

  return {
    overview,
    chartOverviewArray,
    recentOrders: recentOrders.slice(-3),
  };
};

const updateStoreById = async (
  storeId: string,
  sellerId: string,
  data: any
) => {
  const update = await prisma.store.update({
    where: { id: storeId, sellerId },
    data,
  });
  return update;
};

const getStoreById = async (storeId: string) => {
  const store = await prisma.store.findFirst({
    where: { id: storeId },
    select: {
      id: true,
      name: true,
      description: true,
      followers: { select: { id: true } },
      products: { select: { reviews: { select: { rating: true } } } },
    },
  });
  return store;
};

export const sellerService = {
  getSellerById,
  createStore,
  getStore,
  getSellerOverview,
  updateStoreById,
  getStoreById,
};
