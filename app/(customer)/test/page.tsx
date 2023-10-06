import React from "react";

const Test = async () => {
  const fetchDotnet = await fetch("http://localhost:5081/api/Customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 5,
      userName: "hi",
      lastName: "ho",
      address: "heiy",
    }),
  });

  if (fetchDotnet.ok) {
    const res = await fetchDotnet.json();
    console.log(res);
  } else {
    const res = await fetchDotnet.json();
    console.log(res);
  }

  return <div>Test</div>;
};

export default Test;
