SELECT
  min(i.id) AS id,
  p.id AS productid,
  p.name AS productname,
  p.image AS productimage,
  p.price AS productprice,
  count(i.id) AS totalquantity,
  sum(p.price) AS totalamount,
  i."transactionId" AS transactionid
FROM
  (
    "Product" p
    JOIN "Items" i ON ((p.id = i."productId"))
  )
GROUP BY
  p.id,
  p.name,
  p.image,
  i."transactionId";