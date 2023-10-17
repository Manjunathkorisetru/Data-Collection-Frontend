export const getUserData = async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// export const postImage = async (image: string) => {
//   console.log(image);

//   try {
//     const response = await fetch("http://localhost:3000/users/upload", {
//       method: "POST",
//       body: JSON.stringify({ image }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
