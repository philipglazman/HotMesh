import { request } from "./http";

export const getPrice = () => request("/api/price");
// export const getPrice = () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         data: {
//           address: "some-wallet-address",
//           btcPrice: 0.0001,
//         },
//       });
//     }, 1000);
//   });
// };
