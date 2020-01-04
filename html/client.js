/*
Kevin Vuong
December 31, 2019
Secret-Santa-Drawer
*/

let foods = ["Pizza", "Burgers", "Chinese", "Thai", "Mexican", "Pho", "Shawarma", "Breakfast", "Korean", "Italian", "Greek", "Indian", "Poutine", "Fried Chicken", "Sandwiches", "Sushi"];

function randomizeFood() {
    let randomInt =  Math.floor(Math.random() * foods.length);
    console.log(randomInt);
    document.getElementById("food").innerHTML = foods[randomInt];
}