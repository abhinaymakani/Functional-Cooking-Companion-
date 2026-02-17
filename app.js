// ============================================
// RECIPE DATA
// ============================================
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        emoji: "🍝",
        difficulty: "easy",
        time: 20,
        description: "A creamy Italian pasta dish with eggs, cheese, and pancetta",
        ingredients: ["Spaghetti", "Eggs", "Pecorino Romano", "Pancetta", "Black Pepper"]
    },
    {
        id: 2,
        title: "Chocolate Chip Cookies",
        emoji: "🍪",
        difficulty: "easy",
        time: 25,
        description: "Soft and chewy cookies loaded with chocolate chips",
        ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Chocolate Chips", "Vanilla"]
    },
    {
        id: 3,
        title: "Beef Stir-Fry",
        emoji: "🥘",
        difficulty: "medium",
        time: 30,
        description: "Quick and delicious Asian-inspired beef with vegetables",
        ingredients: ["Beef", "Soy Sauce", "Bell Peppers", "Broccoli", "Garlic", "Ginger"]
    },
    {
        id: 4,
        title: "Homemade Pizza",
        emoji: "🍕",
        difficulty: "medium",
        time: 45,
        description: "Fresh pizza with homemade dough and your favorite toppings",
        ingredients: ["Flour", "Yeast", "Tomato Sauce", "Mozzarella", "Basil"]
    },
    {
        id: 5,
        title: "Coq au Vin",
        emoji: "🍗",
        difficulty: "hard",
        time: 120,
        description: "Classic French dish with chicken braised in red wine",
        ingredients: ["Chicken", "Red Wine", "Mushrooms", "Pearl Onions", "Bacon", "Thyme"]
    },
    {
        id: 6,
        title: "Quick Avocado Toast",
        emoji: "🍞",
        difficulty: "easy",
        time: 5,
        description: "Simple yet delicious breakfast with crushed avocado on toast",
        ingredients: ["Bread", "Avocado", "Lemon", "Salt", "Pepper"]
    },
    {
        id: 7,
        title: "Thai Green Curry",
        emoji: "🍲",
        difficulty: "hard",
        time: 40,
        description: "Aromatic and spicy Thai coconut curry with vegetables and chicken",
        ingredients: ["Coconut Milk", "Thai Curry Paste", "Chicken", "Basil", "Lime", "Green Chilies"]
    },
    {
        id: 8,
        title: "Quinoa Buddha Bowl",
        emoji: "🥗",
        difficulty: "medium",
        time: 25,
        description: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
        ingredients: ["Quinoa", "Sweet Potato", "Chickpeas", "Kale", "Tahini", "Lemon"]
    }
];


// ============================================
// STATE MANAGEMENT
// ============================================
// Track current filter and sort settings
let currentFilter = 'all';
let currentSort = 'none';


// ============================================
// DOM REFERENCES
// ============================================
const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortButtons = document.querySelectorAll('.sort-btn');


// ============================================
// PURE FILTER FUNCTIONS
// ============================================
// These functions don't modify the original array
// They return a NEW filtered array

// Filter recipes by difficulty level
const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

// Filter recipes by maximum cooking time
const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time <= maxTime);
};

// Apply the current filter
const applyFilter = (recipes, filterType) => {
    switch(filterType) {
        case 'easy':
            return filterByDifficulty(recipes, 'easy');
        case 'medium':
            return filterByDifficulty(recipes, 'medium');
        case 'hard':
            return filterByDifficulty(recipes, 'hard');
        case 'quick':
            return filterByTime(recipes, 30);
        case 'all':
        default:
            return recipes;  // Return all recipes (no filter)
    }
};


// ============================================
// PURE SORT FUNCTIONS
// ============================================
// sort() mutates the original array, so we create a copy first

// Sort recipes by name (A-Z)
const sortByName = (recipes) => {
    // Create a copy with spread operator, then sort
    return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
};

// Sort recipes by cooking time (fastest first)
const sortByTime = (recipes) => {
    // Create a copy with spread operator, then sort
    return [...recipes].sort((a, b) => a.time - b.time);
};

// Apply the current sort
const applySort = (recipes, sortType) => {
    switch(sortType) {
        case 'name':
            return sortByName(recipes);
        case 'time':
            return sortByTime(recipes);
        case 'none':
        default:
            return recipes;  // Return as-is (no sorting)
    }
};


// ============================================
// RENDER FUNCTIONS
// ============================================

// Create HTML for a single recipe card
const createRecipeCard = (recipe) => {
    const difficultyClass = `difficulty-${recipe.difficulty}`;
    
    return `
        <div class="recipe-card">
            <div class="recipe-image">${recipe.emoji}</div>
            <div class="recipe-content">
                <h2 class="recipe-title">${recipe.title}</h2>
                <span class="difficulty-badge ${difficultyClass}">
                    ${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                </span>
                <div class="recipe-meta">
                    <div class="recipe-meta-item">
                        <span>⏱️ ${recipe.time} min</span>
                    </div>
                </div>
                <p class="recipe-description">${recipe.description}</p>
                <div class="recipe-ingredients">
                    <h4>Ingredients:</h4>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
};

// Render recipes to the DOM
const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender.map(recipe => createRecipeCard(recipe)).join('');
};


// ============================================
// MAIN UPDATE FUNCTION
// ============================================
// This function combines filter + sort + render

const updateDisplay = () => {
    // Step 1: Start with all recipes
    let recipesToDisplay = recipes;
    
    // Step 2: Apply current filter
    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    
    // Step 3: Apply current sort
    recipesToDisplay = applySort(recipesToDisplay, currentSort);
    
    // Step 4: Render the filtered and sorted recipes
    renderRecipes(recipesToDisplay);
    
    // Step 5: Log for debugging
    console.log(`Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);
};


// ============================================
// UI HELPER FUNCTIONS
// ============================================

// Update which button looks "active"
const updateActiveButtons = () => {
    // Update filter buttons
    filterButtons.forEach(btn => {
        const filterType = btn.dataset.filter;
        if (filterType === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update sort buttons
    sortButtons.forEach(btn => {
        const sortType = btn.dataset.sort;
        if (sortType === currentSort) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};


// ============================================
// EVENT HANDLERS
// ============================================

// Handle filter button clicks
const handleFilterClick = (event) => {
    const filterType = event.target.dataset.filter;
    
    // Update state
    currentFilter = filterType;
    
    // Update UI
    updateActiveButtons();
    updateDisplay();
};

// Handle sort button clicks
const handleSortClick = (event) => {
    const sortType = event.target.dataset.sort;
    
    // Update state
    currentSort = sortType;
    
    // Update UI
    updateActiveButtons();
    updateDisplay();
};


// ============================================
// EVENT LISTENER SETUP
// ============================================

const setupEventListeners = () => {
    // Attach click handlers to all filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Attach click handlers to all sort buttons
    sortButtons.forEach(btn => {
        btn.addEventListener('click', handleSortClick);
    });
    
    console.log('✅ Event listeners attached!');
};


// ============================================
// INITIALIZATION
// ============================================

// Set up event listeners on page load
setupEventListeners();

// Initial render with default filter/sort
updateDisplay();

console.log('🍳 Functional Cooking Companion loaded successfully!');
console.log('Total recipes available:', recipes.length);
