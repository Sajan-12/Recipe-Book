// DOM Elements
const recipesContainer = document.getElementById("recipes-container")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const addRecipeBtn = document.getElementById("add-recipe-btn")
const addRecipeModal = document.getElementById("add-recipe-modal")
const recipeDetailsModal = document.getElementById("recipe-details-modal")
const recipeForm = document.getElementById("recipe-form")
const categoryFilters = document.querySelectorAll(".categories li")
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const categoriesNav = document.querySelector(".categories")
const closeButtons = document.querySelectorAll(".close-btn")
// State
let recipes = []
let currentCategory = "all"
let nextId = 7 // Start with a higher ID to avoid conflicts with sample data

// Sample Recipes
const sampleRecipes = [
  {
    id: 1,
    name: "Classic Pancakes",
    category: "breakfast",
    time: 20,
    servings: 4,
    price: 40,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80",
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "3 1/2 teaspoons baking powder",
      "1 teaspoon salt",
      "1 tablespoon white sugar",
      "1 1/4 cups milk",
      "1 egg",
      "3 tablespoons butter, melted",
    ],
    instructions:
      "In a large bowl, sift together the flour, baking powder, salt and sugar. Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.\n\nHeat a lightly oiled griddle or frying pan over medium-high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot with maple syrup and butter.",
  },
  {
    id: 2,
    name: "Spaghetti Carbonara",
    category: "dinner",
    time: 30,
    servings: 4,
    price: 80,
    image:
      "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    ingredients: [
      "1 pound spaghetti",
      "2 tablespoons olive oil",
      "8 slices bacon, diced",
      "4 garlic cloves, minced",
      "4 eggs",
      "1 cup grated Parmesan cheese",
      "Freshly ground black pepper",
      "Salt to taste",
      "Fresh parsley, chopped (for garnish)",
    ],
    instructions:
      "Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente, about 8-10 minutes.\n\nMeanwhile, heat olive oil in a large skillet over medium heat. Add the bacon and cook until crispy. Add minced garlic and cook for another minute.\n\nIn a bowl, whisk together eggs, Parmesan cheese, and plenty of black pepper.\n\nDrain the pasta, reserving 1/2 cup of the pasta water. Immediately add the hot pasta to the skillet with the bacon and garlic. Remove from heat.\n\nQuickly pour the egg mixture over the hot pasta and toss rapidly to coat the pasta without scrambling the eggs. If needed, thin the sauce with a bit of the reserved pasta water.\n\nSeason with salt to taste and garnish with additional Parmesan cheese and chopped parsley. Serve immediately.",
  },
  {
    id: 3,
    name: "Chocolate Chip Cookies",
    category: "dessert",
    time: 25,
    servings: 24,
    price: 50,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "1 cup (2 sticks) butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "1 teaspoon vanilla extract",
      "2 large eggs",
      "2 cups semi-sweet chocolate chips",
    ],
    instructions:
      "Preheat oven to 375°F (190°C).\n\nCombine flour, baking soda, and salt in a small bowl. Beat butter, granulated sugar, brown sugar, and vanilla extract in a large mixer bowl until creamy. Add eggs, one at a time, beating well after each addition. Gradually beat in flour mixture. Stir in chocolate chips.\n\nDrop by rounded tablespoon onto ungreased baking sheets. Bake for 9 to 11 minutes or until golden brown. Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.",
  },
  {
    id: 4,
    name: "Greek Salad",
    category: "lunch",
    time: 15,
    servings: 4,
    price: 60,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    ingredients: [
      "1 large cucumber, diced",
      "4 large tomatoes, diced",
      "1 red onion, thinly sliced",
      "1 green bell pepper, diced",
      "1 cup Kalamata olives",
      "8 oz feta cheese, cubed",
      "2 tablespoons extra virgin olive oil",
      "1 tablespoon red wine vinegar",
      "1 teaspoon dried oregano",
      "Salt and pepper to taste",
    ],
    instructions:
      "In a large bowl, combine the cucumber, tomatoes, red onion, bell pepper, and olives.\n\nIn a small bowl, whisk together the olive oil, red wine vinegar, oregano, salt, and pepper.\n\nPour the dressing over the vegetables and toss gently to combine.\n\nTop with cubed feta cheese and serve immediately, or refrigerate for up to 2 hours before serving for enhanced flavor.",
  },
  {
    id: 5,
    name: "Guacamole",
    category: "snack",
    time: 10,
    servings: 6,
    price: 40,
    image:
          "https://plumstreetcollective.com/wp-content/uploads/2020/07/Guacamole-Snack-Board-5-scaled.jpg",
    ingredients: [
      "3 ripe avocados",
      "1 lime, juiced",
      "1/2 teaspoon salt",
      "1/2 cup diced onion",
      "3 tablespoons chopped fresh cilantro",
      "2 roma tomatoes, diced",
      "1 teaspoon minced garlic",
      "1 pinch ground cayenne pepper (optional)",
    ],
    instructions:
      "Cut avocados in half, remove pit, and scoop into a bowl. Mash avocados with a fork, leaving some chunks.\n\nAdd lime juice and salt; mix well. Add onion, cilantro, tomatoes, and garlic; stir to combine.\n\nAdd cayenne pepper if desired. Refrigerate for 1 hour for best flavor, or serve immediately with tortilla chips.",
  },
  {
    id: 6,
    name: "Vegetable Stir Fry",
    category: "dinner",
    time: 20,
    servings: 4,
    price: 100,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ingredients: [
      "2 tablespoons vegetable oil",
      "2 cloves garlic, minced",
      "1 tablespoon ginger, minced",
      "1 carrot, julienned",
      "1 bell pepper, sliced",
      "1 cup broccoli florets",
      "1 cup snap peas",
      "1 cup mushrooms, sliced",
      "2 tablespoons soy sauce",
      "1 tablespoon oyster sauce",
      "1 teaspoon sesame oil",
      "2 green onions, sliced",
    ],
    instructions:
      "Heat vegetable oil in a large wok or skillet over high heat. Add garlic and ginger; stir-fry for 30 seconds until fragrant.\n\nAdd carrots and stir-fry for 2 minutes. Add bell pepper, broccoli, snap peas, and mushrooms; stir-fry for 5-7 minutes until vegetables are crisp-tender.\n\nAdd soy sauce, oyster sauce, and sesame oil; toss to coat. Cook for another minute.\n\nGarnish with sliced green onions and serve hot with rice or noodles.",
  },
]

// Initialize the app
function startApp() {
     const savedRecipes=localStorage.getItem("recipes");
     if(savedRecipes){
      recipes=JSON.parse(savedRecipes);
     }
     else{
      recipes=sampleRecipes;
      saveRecipes();
     }

  // Set the next ID
  
  nextId = Math.max(...recipes.map((recipe) => recipe.id), 0) + 1
  console.log("Next ID:", nextId)

  // Render recipes
  renderRecipes()

}

//save Recipe
function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes))
  console.log("Saved recipes to localStorage")
}

// Render recipes based on current filters
function renderRecipes() {
  // Clear the container
  recipesContainer.innerHTML="";

  // Filter recipes
  let filteredRecipes=recipes;

  // Apply category filter
  if (currentCategory !== "all") {
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.category === currentCategory)
    console.log("Filtered by category:", filteredRecipes.length)
  }

  // Apply search filter
  const searchTerm = searchInput.value.toLowerCase().trim()
  if (searchTerm) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm)),
    )
    console.log("Filtered by search:", filteredRecipes.length)
  }

  // Display message if no recipes found
  if (filteredRecipes.length === 0) {
    recipesContainer.innerHTML = `
            <div class="no-recipes">
                <h3>No recipes found</h3>
                <p>Try adjusting your search or filters, or add a new recipe.</p>
                <button id="clear-filters-btn" class="btn secondary-btn">Clear Filters</button>
            </div>
        `

    return
  }

  // Render each recipe
  filteredRecipes.forEach((recipe) => {
    const recipeCard = document.createElement("div")
    recipeCard.className = "recipe-card"
    recipeCard.dataset.id = recipe.id

    recipeCard.innerHTML = ` 
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.name}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time} mins</span>
                    <span><i class="fas fa-utensils"></i> ${recipe.servings} servings</span>
                </div>
                <div class="recipe-meta">
                 <span class="recipe-category">${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</span>
                 <span><i class="fas fa-indian-rupee-sign"></i> ${recipe.price===undefined?0:recipe.price}</span>
                 </div>
                </div>
        `

    recipeCard.addEventListener("click", () => showRecipeDetails(recipe))

    recipesContainer.appendChild(recipeCard);
  })

  console.log("Rendered recipes:", filteredRecipes.length)
}

// Show recipe details in modal
function showRecipeDetails(recipe) {
  console.log("Showing recipe details:", recipe.name)

  const recipeDetailsContent = document.getElementById("recipe-details-content")

  // Format ingredients as list items
  const ingredientsList = recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")

  // Format instructions with line breaks
  const formattedInstructions = recipe.instructions
    .split("\n\n")
    .map((paragraph) => `<li>${paragraph}</li>`)
    .join("")

  recipeDetailsContent.innerHTML = `
        <div class="recipe-details-header">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-details-img">
            <h2>${recipe.name}</h2>
            <div class="recipe-details-info">
                <div class="recipe-details-meta">
                    <i class="fas fa-clock"></i>
                    <span>${recipe.time} minutes</span>
                </div>
                <div class="recipe-details-meta">
                    <i class="fas fa-utensils"></i>
                    <span>${recipe.servings} servings</span>
                </div>
                <div class="recipe-details-meta">
                <i class="fas fa-indian-rupee-sign"></i>
                <span>${recipe.price}</span>
                </div>
                <div class="recipe-details-meta">
                    <i class="fas fa-tag"></i>
                    <span>${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</span>
                </div>
            </div>
        </div>
        <div class="recipe-content">
            <div class="ingredients-list">
                <h3>Ingredients</h3>
                <ul>${ingredientsList}</ul>
            </div>
            <div class="instructions">
                <h3>Instructions</h3>
                <ol>${formattedInstructions}</ol>
            </div>
        </div>
        <div class="recipe-actions" style="margin-top: 20px; text-align: right;">
            <button class="btn secondary-btn delete-recipe-btn" data-id="${recipe.id}">
                <i class="fas fa-trash"></i> Delete Recipe
            </button>
        </div>
    `

  // Show the modal
  recipeDetailsModal.style.display = "block"

  // Add event listener to delete button
  const deleteBtn = recipeDetailsContent.querySelector(".delete-recipe-btn")
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    deleteRecipe(recipe.id)
  })
}

// Delete a recipe
function deleteRecipe(id) {
  console.log("Deleting recipe:", id)

  if (confirm("Are you sure you want to delete this recipe?")) {
    recipes = recipes.filter((recipe) => recipe.id !== id)
    saveRecipes();
    renderRecipes()
    recipeDetailsModal.style.display = "none"
  }
}

// Add a new recipe
function addRecipe(e) {
  e.preventDefault()
  console.log("Adding new recipe...")

  const name = document.getElementById("recipe-name").value
  const category = document.getElementById("recipe-category").value
  const time = Number.parseInt(document.getElementById("recipe-time").value)
  const servings = Number.parseInt(document.getElementById("recipe-servings").value)
  const price=Number.parseInt(document.getElementById("recipe-price").value);
  const image =
    document.getElementById("recipe-image").value ||
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  const ingredients = document
    .getElementById("recipe-ingredients")
    .value.split("\n")
    .filter((ingredient) => ingredient.trim() !== "")
  const instructions = document.getElementById("recipe-instructions").value

  const newRecipe = {
    id: nextId++,
    name,
    category,
    time,
    servings,
    price,
    image,
    ingredients,
    instructions,
  }

  console.log("New recipe:", newRecipe)

  recipes.push(newRecipe);
  saveRecipes();
  renderRecipes();

  // Reset form and close modal
  recipeForm.reset()
  addRecipeModal.style.display = "none"
}

// Set active category
function setActiveCategory(category) {
  console.log("Setting active category:", category)

  currentCategory = category

  // Update active class
  categoryFilters.forEach((filter) => {
    if (filter.dataset.category === category) {
      filter.classList.add("active")
    } else {
      filter.classList.remove("active")
    }
  })

  renderRecipes()
}

// Toggle mobile menu
function toggleMobileMenu() {
  console.log("Toggling mobile menu")
  categoriesNav.classList.toggle("show")
}


  // Search
  searchBtn.addEventListener("click", () => {
    console.log("Search button clicked")
    renderRecipes()
  })

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      console.log("Search input enter pressed")
      renderRecipes()
    }
  })

  // Category filters
  categoryFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      console.log("Category filter clicked:", filter.dataset.category)
      setActiveCategory(filter.dataset.category)
    })
  })

  // Add recipe button - Open modal
  addRecipeBtn.addEventListener("click", () => {
    console.log("Add recipe button clicked")
    addRecipeModal.style.display = "block"

  })

   //Form submission
  recipeForm.addEventListener("submit", addRecipe)

  
  // Close buttons
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Close button clicked")
      addRecipeModal.style.display = "none"
      recipeDetailsModal.style.display = "none"
    })
  })

  // Mobile menu
mobileMenuBtn.addEventListener("click", toggleMobileMenu)

startApp();

