var products // global variable to store the products and access it from any function

if (localStorage.getItem('ourProducts')!= null){
    products = JSON.parse(localStorage.getItem('ourProducts'));
    displayProducts();
}
else{
    products = [];
}

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    }

    products.push(product); // to add the product to the array
    localStorage.setItem('ourProducts', JSON.stringify(products))
    displayProducts();
}

function displayProducts(){
    var cartona = ``;
    for (var i = 0; i<products.length; i++){
        cartona += `<tr>
            <td>${i}</td> 
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>`
    clearForm(); // to clear the form after adding the product
    displayProducts(); // to display the products in the table
}
}
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";  
}
function deleteProduct(index){
    products.splice(index, 1);
    displayProducts();
    localStorage.setItem('ourProducts', JSON.stringify(products));
}
function searchProduct(term){
    var cartona = ``;
    for(var i = 0; i< products.length; i++){
        if(products[i].name.toLowerCase().includes(term.toLowerCase())){
            cartona += `<tr>
            <td>${i}</td> 
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
        }
    document.getElementById("tableBody").innerHTML = cartona;

    }
}
function updateProduct(index){
    productNameInput.value = products[index].name;
    productPriceInput.value = products[index].price;
    productCategoryInput.value = products[index].category;
    productDescInput.value = products[index].desc;
    document.getElementById("mainBtn").innerHTML = "Update";
    document.getElementById("mainBtn").setAttribute("onclick", `updateProductInArray(${index})`);
}
function updateProductInArray(index){
    products[index].name = productNameInput.value;
    products[index].price = productPriceInput.value;
    products[index].category = productCategoryInput.value;
    products[index].desc = productDescInput.value;
    localStorage.setItem('ourProducts', JSON.stringify(products));
    displayProducts();
    clearForm();
    document.getElementById("mainBtn").innerHTML = "Add Product";
    document.getElementById("mainBtn").setAttribute("onclick", "addProduct()");
}
function displayProducts(){
    var cartona = ``;
    for (var i = 0; i<products.length; i++){
        cartona += `<tr>
            <td>${i}</td> 
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>` // we use ${} to get the inside value of the variable, only when we use the ``
    }
    document.getElementById("tableBody").innerHTML = cartona;
}