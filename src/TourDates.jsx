// import { useEffect, useState } from "react";

// const AIRTABLE_API_KEY = "patfFL3mVzlMGO9wG.5f7775975295f66677bc1ce7cdc8a12eba6994cacdf224e0815efb22d92b30bc";
// const BASE_ID = "patfFL3mVzlMGO9wG";
// const TABLE_NAME = "Tour Dates"; // or your actual table name

// export default function TourDates() {
//   const [dates, setDates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDates = async () => {
//       const res = await fetch(
//         `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}?sort%5B0%5D%5Bfield%5D=Tour%20Date&sort%5B0%5D%5Bdirection%5D=asc`,
//         {
//           headers: {
//             Authorization: `Bearer ${AIRTABLE_API_KEY}`,
//           },
//         }
//       );

//       const data = await res.json();
//       setDates(data.records || []);
//       setLoading(false);
//     };

//     fetchDates();
//   }, []);

//   if (loading) return <p>Loading tour dates...</p>;

//   return (
//     <div>
//       <h2>Upcoming Tour Dates</h2>
//       {dates.length === 0 && <p>No upcoming shows yet.</p>}
//       <ul>
//         {dates.map(({ id, fields }) => (
//           <li key={id}>
//             <strong>{fields["Artist Name"]}</strong> — {new Date(fields["Tour Date"]).toLocaleDateString()} @ {fields.Venue}, {fields.City}{" "}
//             {fields["Ticket Link"] && (
//               <a href={fields["Ticket Link"]} target="_blank" rel="noopener noreferrer">
//                 Tickets
//               </a>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";

// const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
// const AIRTABLE_TABLE_NAME = process.env.REACT_APP_AIRTABLE_TOKEN;
// const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN;

// export default function TourDates() {
//   const [dates, setDates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchDates() {
//       try {
//         const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`, {
//             headers: {
//               Authorization: `Bearer ${AIRTABLE_TOKEN}`,
//             },
//           });

//         if (!response.ok) {
//           throw new Error(`Error fetching Airtable data: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setDates(data.records || []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDates();
//   }, []);

//   if (loading) return <p>Loading tour dates...</p>;

//   if (dates.length === 0) return <p>No upcoming tour dates.</p>;

//   return (
//     <div>
//       <h2>Upcoming Tour Dates</h2>
//       <ul>
//         {dates.map(({ id, fields }) => (
//           <li key={id}>
//             <strong>{fields["Artist Name"]}</strong> —{" "}
//             {new Date(fields["Tour Date"]).toLocaleDateString()} @ {fields.Venue}, {fields.City}{" "}
//             {fields["Ticket Link"] && (
//               <a href={fields["Ticket Link"]} target="_blank" rel="noopener noreferrer">
//                 Tickets
//               </a>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
