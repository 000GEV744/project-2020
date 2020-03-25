const storeForm = document.getElementById("store-form");
const storeId = document.getElementById("store-id");
const storeAddress = document.getElementById("store-address");

//using POST to add store
async function addStore(e) {
  e.preventDefault(); //prevent the default behaviour which will stop the actual form from submitting
  if (storeId.value === "" || storeAddress.value === "") {
    alert("please fill in fields");
  }
  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value
  };

  try {
    const res = await fetch("/api/stores", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(sendBody)
    });
    if (res.status === 400) {
      throw Error("store already exist");
    }
    alert("store added!");
    window.location.href = "/index.html";
  } catch (error) {
    alert(error);
    return;
  }
}
storeForm.addEventListener("submit", addStore); //adding even listener to form
